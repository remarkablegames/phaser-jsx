import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '../components';
import * as GameObjects from '../components/GameObjects';
import { events } from '../constants';
import { isValidElement } from '../element';
import type { GameObjectNode } from '../helpers';
import { setProps } from './props';
import { attachRef } from './ref';

/**
 * Reconciles a new JSX element tree against the existing game object tree.
 *
 * @param element - The new JSX element to reconcile.
 * @param oldNode - The existing game object node (or null if none).
 * @param scene - The Phaser scene.
 * @param parent - Optional parent container/layer.
 * @returns The new game object node tree.
 */
export function reconcileTree(
  element: JSX.Element | null,
  oldNode: GameObjectNode | null,
  scene: Phaser.Scene,
  parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
): GameObjectNode | null {
  switch (true) {
    case [undefined, null].includes(element as unknown as undefined | null):
      if (oldNode) {
        destroyNode(oldNode);
      }
      return null;

    case Array.isArray(element):
      return reconcileArray(element, oldNode?.children ?? null, scene, parent);

    case !isValidElement(element):
      if (oldNode) {
        destroyNode(oldNode);
      }
      return null;

    case element?.type === Fragment: {
      const children = element.props?.children;
      const childArray = children
        ? Array.isArray(children)
          ? children
          : [children]
        : [];
      return reconcileArray(
        childArray,
        oldNode?.children ?? null,
        scene,
        parent,
      );
    }

    // function component
    case typeof element?.type === 'function' && !isGameObject(element.type):
      return reconcileTree(element.type(element.props), oldNode, scene, parent);

    case isGameObject(element?.type):
    default:
      return reconcileGameObject(element!, oldNode, scene, parent);
  }
}

function reconcileArray(
  elements: JSX.Element[],
  oldChildren: (GameObjectNode | null)[] | null,
  scene: Phaser.Scene,
  parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
): GameObjectNode {
  const node: GameObjectNode = {
    gameObject: null as unknown as Phaser.GameObjects.GameObject,
    props: {},
    children: [],
  };

  const oldLength = oldChildren?.length ?? 0;

  for (let i = 0; i < elements.length; i++) {
    const oldChild = oldChildren?.[i] ?? null;
    const newChild = reconcileTree(elements[i], oldChild, scene, parent);
    node.children.push(newChild);
    if (oldChild && !newChild) {
      destroyNode(oldChild);
    }
  }

  // Destroy any extra old children beyond new length
  for (let i = elements.length; i < oldLength; i++) {
    const oldChild = oldChildren![i];
    if (oldChild) {
      destroyNode(oldChild);
    }
  }

  return node;
}

function reconcileGameObject(
  element: JSX.Element,
  oldNode: GameObjectNode | null,
  scene: Phaser.Scene,
  parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
): GameObjectNode | null {
  const { children, ref, ...props } = element.props;

  let gameObject: Phaser.GameObjects.GameObject | null;

  if (oldNode) {
    // Reuse existing game object - just patch changed props
    gameObject = oldNode.gameObject;
    patchProps(gameObject, oldNode.props, props, scene);
    attachRef(gameObject, ref);
  } else {
    // Create new game object
    const newGameObject = createGameObject(element, scene);

    // Add to scene
    if (typeof parent?.add === 'function') {
      parent.add(newGameObject);
    } else {
      scene.add.existing(newGameObject);
    }

    setProps(newGameObject, props, scene);
    attachRef(newGameObject, ref);
    gameObject = newGameObject;
  }

  // Reconcile children for Container/Layer
  const node: GameObjectNode = {
    gameObject,
    props,
    children: [],
  };

  if (
    element.type === Phaser.GameObjects.Container ||
    element.type === Phaser.GameObjects.Layer
  ) {
    const childArray = children
      ? Array.isArray(children)
        ? children
        : [children]
      : [];
    const oldChildren = oldNode?.children ?? null;

    const oldLength = oldChildren?.length ?? 0;

    for (let i = 0; i < childArray.length; i++) {
      const oldChild = oldChildren?.[i] ?? null;
      const newChild = reconcileTree(
        childArray[i],
        oldChild,
        scene,
        gameObject as Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
      );
      node.children.push(newChild);
      if (oldChild && !newChild) {
        destroyNode(oldChild);
      }
    }

    // Destroy extra old children beyond new length
    for (let i = childArray.length; i < oldLength; i++) {
      const oldChild = oldChildren![i];
      if (oldChild) {
        destroyNode(oldChild);
      }
    }
  }

  return node;
}

function createGameObject(
  element: JSX.Element,
  scene: Phaser.Scene,
): Phaser.GameObjects.GameObject {
  const { props, color, frame, points, shader, style, texture } = element.props;

  switch (true) {
    case element.type === Phaser.GameObjects.BitmapText:
    case element.type === Phaser.GameObjects.DynamicBitmapText:
      return new element.type(scene, props?.x, props?.y, props?.font);

    case element.type === Phaser.GameObjects.Bob:
      return new element.type(scene, props?.x, props?.y, frame, props?.visible);

    case element.type === Phaser.GameObjects.Container:
    case element.type === Phaser.GameObjects.Layer:
      return new element.type(scene);

    case element.type === Phaser.GameObjects.GameObject:
      return new element.type(scene, props?.type);

    case element.type === Phaser.GameObjects.Image:
    case element.type === Phaser.GameObjects.Sprite:
    case element.type === Phaser.GameObjects.NineSlice:
      return new element.type(scene, props?.x, props?.y, texture, frame);

    case element.type === Phaser.GameObjects.Light:
      return new element.type(
        scene,
        props?.x,
        props?.y,
        props?.radius,
        color?.r,
        color?.g,
        color?.b,
        props?.intensity,
      );

    case element.type === Phaser.GameObjects.PathFollower:
      return new element.type(
        scene,
        props?.path,
        props?.x,
        props?.y,
        texture,
        frame,
      );

    case element.type === Phaser.GameObjects.Plane:
      return new element.type(
        scene,
        props?.x,
        props?.y,
        texture,
        frame,
        props?.width,
        props?.height,
        props?.isTiled,
      );

    case element.type === Phaser.GameObjects.PointLight:
      return new element.type(scene, props?.x, props?.y, color);

    case element.type === Phaser.GameObjects.Rectangle:
    case element.type === Phaser.GameObjects.Zone:
      return new element.type(scene, props?.x, props?.y);

    case element.type === Phaser.GameObjects.Rope:
      return new element.type(
        scene,
        props?.x,
        props?.y,
        texture,
        frame,
        points,
      );

    case element.type === Phaser.GameObjects.Shader:
      return new element.type(scene, shader);

    case element.type === Phaser.GameObjects.Text:
      return new element.type(scene, props?.x, props?.y, props?.text, style);

    case element.type === Phaser.GameObjects.TileSprite:
      return new element.type(
        scene,
        props?.x,
        props?.y,
        props?.width,
        props?.height,
        texture,
        frame,
      );

    case element.type === Phaser.GameObjects.Video:
      return new element.type(scene, props?.x, props?.y, props?.cacheKey);

    default:
      return new element.type(scene);
  }
}

function patchProps(
  gameObject: Phaser.GameObjects.GameObject,
  oldProps: Record<string, unknown>,
  newProps: Record<string, unknown>,
  scene: Phaser.Scene,
): void {
  // Remove old event listeners
  for (const key in oldProps) {
    if (events[key] && typeof oldProps[key] === 'function') {
      const eventName = key.slice(2).toLowerCase();
      gameObject.off(eventName);
    }
  }

  setProps(gameObject, newProps, scene);
}

function destroyNode(node: GameObjectNode): void {
  if (node.gameObject?.active) {
    node.gameObject.destroy();
  }
  for (const child of node.children) {
    if (child) {
      destroyNode(child);
    }
  }
}

const gameObjects = Object.keys(GameObjects).map(
  (key) => GameObjects[key as keyof typeof GameObjects],
);

function isGameObject(type: unknown): boolean {
  return gameObjects.some((gameObject) => gameObject === type);
}
