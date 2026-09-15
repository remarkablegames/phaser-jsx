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

  /* eslint-disable @typescript-eslint/non-nullable-type-assertion-style, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
  switch (true) {
    case element.type === Phaser.GameObjects.BitmapText:
    case element.type === Phaser.GameObjects.DynamicBitmapText: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        props?.font as string,
      ] satisfies ConstructorParameters<
        | typeof Phaser.GameObjects.BitmapText
        | typeof Phaser.GameObjects.DynamicBitmapText
      >;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Bob: {
      const blitter = new Phaser.GameObjects.Blitter(scene);
      scene.add.existing(blitter);
      const args = [
        blitter,
        props?.x as number,
        props?.y as number,
        frame as string | number,
        props?.visible as boolean,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Bob>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Container:
    case element.type === Phaser.GameObjects.Layer: {
      const args = [scene] satisfies ConstructorParameters<
        typeof Phaser.GameObjects.Container | typeof Phaser.GameObjects.Layer
      >;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.GameObject: {
      const args = [
        scene,
        props?.type as string,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.GameObject>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Image:
    case element.type === Phaser.GameObjects.Sprite:
    case element.type === Phaser.GameObjects.NineSlice: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        texture as string | Phaser.Textures.Texture,
        frame,
      ] satisfies ConstructorParameters<
        | typeof Phaser.GameObjects.Image
        | typeof Phaser.GameObjects.Sprite
        | typeof Phaser.GameObjects.NineSlice
      >;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Light: {
      const args = [
        props?.x as number,
        props?.y as number,
        props?.radius as number,
        color?.r as number,
        color?.g as number,
        color?.b as number,
        props?.intensity as number,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Light>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.PathFollower: {
      const args = [
        scene,
        props?.path as Phaser.Curves.Path,
        props?.x as number,
        props?.y as number,
        texture as string | Phaser.Textures.Texture,
        frame,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.PathFollower>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Mesh2D: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        texture as string | Phaser.Textures.Texture,
        props?.vertices as number[],
        props?.indices as number[],
        props?.flipV,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Mesh2D>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.PointLight: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        // v8 ignore start
        color
          ? Phaser.Display.Color.GetColor(color.r, color.g, color.b)
          : // v8 ignore end
            undefined,
        props?.radius,
        props?.intensity,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.PointLight>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Rectangle: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        props?.width,
        props?.height,
        props?.fillColor,
        props?.fillAlpha,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Rectangle>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Zone: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Zone>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Rope: {
      const args = [
        scene,
        props?.x,
        props?.y,
        texture as string,
        frame,
        points,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Rope>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Shader: {
      const args = [scene, shader as string] satisfies ConstructorParameters<
        typeof Phaser.GameObjects.Shader
      >;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Text: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        props?.text as string,
        style as Phaser.Types.GameObjects.Text.TextStyle,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Text>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.TileSprite: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        props?.width as number,
        props?.height as number,
        texture as string,
        frame,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.TileSprite>;
      return new element.type(...args);
    }

    case element.type === Phaser.GameObjects.Video: {
      const args = [
        scene,
        props?.x as number,
        props?.y as number,
        props?.cacheKey,
      ] satisfies ConstructorParameters<typeof Phaser.GameObjects.Video>;
      return new element.type(...args);
    }

    default:
      return new element.type(scene);
  }
  /* eslint-enable @typescript-eslint/non-nullable-type-assertion-style, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
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
