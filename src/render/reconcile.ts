import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '../components';
import * as GameObjects from '../components/GameObjects';
import { isEventKey } from '../constants';
import { isValidElement } from '../element';
import type { GameObjectNode, GameObjectProps, Props } from '../types';
import { setProps } from './props';
import { attachRef } from './ref';

type ChildElement = JSX.Element | JSX.Element[];

/**
 * Props read by {@link createGameObject} to construct each game object.
 */
interface CreateElementProps {
  color?: { r: number; g: number; b: number };
  frame?: string | number;
  points?: number | Phaser.GameObjects.Rope['points'];
  props?: {
    cacheKey?: string;
    fillAlpha?: number;
    fillColor?: number;
    flipV?: boolean;
    font?: string;
    height?: number;
    indices?: number[];
    intensity?: number;
    path?: Phaser.Curves.Path;
    radius?: number;
    text?: string;
    type?: string;
    vertices?: number[];
    visible?: boolean;
    width?: number;
    x?: number;
    y?: number;
  };
  shader?: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
  texture?: string | Phaser.Textures.Texture;
}

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
  if (element == null) {
    return destroyIfOld(oldNode);
  }

  if (Array.isArray(element)) {
    return reconcileArray(
      element as JSX.Element[],
      oldNode?.children ?? null,
      scene,
      parent,
    );
  }

  if (element.type === Fragment) {
    const children = (element.props as { children?: ChildElement }).children;
    return reconcileArray(
      children ? toArray(children) : [],
      oldNode?.children ?? null,
      scene,
      parent,
    );
  }

  if (!isValidElement(element)) {
    return destroyIfOld(oldNode);
  }

  // function component
  if (typeof element.type === 'function' && !isGameObject(element.type)) {
    const Component = element.type as (
      props: Record<string, unknown>,
    ) => JSX.Element | null;
    return reconcileTree(
      Component(element.props as Record<string, unknown>),
      oldNode,
      scene,
      parent,
    );
  }

  return reconcileGameObject(element, oldNode, scene, parent);
}

function destroyIfOld(oldNode: GameObjectNode | null): null {
  if (oldNode) {
    destroyNode(oldNode);
  }
  return null;
}

function reconcileArray(
  elements: JSX.Element[],
  oldChildren: (GameObjectNode | null)[] | null,
  scene: Phaser.Scene,
  parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
): GameObjectNode {
  const node: GameObjectNode = {
    gameObject: null,
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
    const oldChild = oldChildren?.[i];
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
  const elementProps = element.props as {
    children?: ChildElement;
    ref?: GameObjectProps['ref'];
  } & Props;
  const { children, ref, ...props } = elementProps;

  let gameObject: Phaser.GameObjects.GameObject | null;

  if (oldNode) {
    // Reuse existing game object - just patch changed props
    gameObject = oldNode.gameObject;

    // v8 ignore next
    if (gameObject) {
      patchProps(gameObject, oldNode.props, props, scene);
      attachRef(gameObject, ref);
    }
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
    const childArray = children ? toArray(children) : [];
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
      const oldChild = oldChildren?.[i];
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
  const { props, color, frame, points, shader, style, texture } =
    element.props as CreateElementProps;

  /* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
  switch (true) {
    case element.type === Phaser.GameObjects.BitmapText:
    case element.type === Phaser.GameObjects.DynamicBitmapText: {
      return new element.type(scene, props?.x, props?.y, props?.font);
    }

    case element.type === Phaser.GameObjects.Bob: {
      return new element.type(scene, props?.x, props?.y, frame, props?.visible);
    }

    case element.type === Phaser.GameObjects.Container:
    case element.type === Phaser.GameObjects.Layer: {
      return new element.type(scene);
    }

    case element.type === Phaser.GameObjects.GameObject: {
      return new element.type(scene, props?.type);
    }

    case element.type === Phaser.GameObjects.Image:
    case element.type === Phaser.GameObjects.Sprite:
    case element.type === Phaser.GameObjects.NineSlice: {
      return new element.type(scene, props?.x, props?.y, texture, frame);
    }

    case element.type === Phaser.GameObjects.Light: {
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
    }

    case element.type === Phaser.GameObjects.PathFollower: {
      return new element.type(
        scene,
        props?.path,
        props?.x,
        props?.y,
        texture,
        frame,
      );
    }

    case element.type === Phaser.GameObjects.Mesh2D: {
      return new element.type(
        scene,
        props?.x,
        props?.y,
        texture,
        props?.vertices,
        props?.indices,
        props?.flipV,
      );
    }

    case element.type === Phaser.GameObjects.PointLight: {
      return new element.type(scene, props?.x, props?.y, color);
    }

    case element.type === Phaser.GameObjects.Rectangle: {
      return new element.type(
        scene,
        props?.x,
        props?.y,
        props?.width,
        props?.height,
        props?.fillColor,
        props?.fillAlpha,
      );
    }

    case element.type === Phaser.GameObjects.Zone: {
      return new element.type(scene, props?.x, props?.y);
    }

    case element.type === Phaser.GameObjects.Rope: {
      return new element.type(
        scene,
        props?.x,
        props?.y,
        texture,
        frame,
        points,
      );
    }

    case element.type === Phaser.GameObjects.Shader: {
      return new element.type(scene, shader);
    }

    case element.type === Phaser.GameObjects.Text: {
      return new element.type(scene, props?.x, props?.y, props?.text, style);
    }

    case element.type === Phaser.GameObjects.TileSprite: {
      return new element.type(
        scene,
        props?.x,
        props?.y,
        props?.width,
        props?.height,
        texture,
        frame,
      );
    }

    case element.type === Phaser.GameObjects.Video: {
      return new element.type(scene, props?.x, props?.y, props?.cacheKey);
    }

    default:
      return new element.type(scene);
  }
  /* eslint-enable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
}

function patchProps(
  gameObject: Phaser.GameObjects.GameObject,
  oldProps: Record<string, unknown>,
  newProps: Record<string, unknown>,
  scene: Phaser.Scene,
): void {
  // Remove old event listeners
  for (const key in oldProps) {
    if (isEventKey(key) && typeof oldProps[key] === 'function') {
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

function toArray<Type>(item: Type | Type[]) {
  return Array.isArray(item) ? item : [item];
}
