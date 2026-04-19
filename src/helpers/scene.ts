import type { Scene } from 'phaser';
import type { JSX } from 'react';

import { reconcileTree } from '../render/reconcile';

let _scene: Scene;

export function getScene<Type = Scene>(): Type {
  return _scene as Type;
}

export function setScene(scene: Scene): void {
  _scene = scene;
}

/**
 * Info about a tracked game object in the tree.
 */
export interface GameObjectNode {
  gameObject: Phaser.GameObjects.GameObject;
  props: Record<string, unknown>;
  children: (GameObjectNode | null)[];
}

/**
 * Render context for tracking state and reconciliation.
 */
export interface RenderContext {
  state: Map<number, unknown>;
  scene: Scene | null;
  componentFn: ((...args: unknown[]) => JSX.Element) | null;
  componentProps: Record<string, unknown> | null;
  gameObjectTree: GameObjectNode | null;
  getNextStateIndex: () => number;
  resetStateIndex: () => void;
  rerender: () => void;
}

let _context: RenderContext | null = null;

export function getRenderContext(): RenderContext {
  _context ??= createRenderContext();
  return _context;
}

export function setRenderContext(context: RenderContext): void {
  _context = context;
}

export function createRenderContext(
  element: JSX.Element | null = null,
  scene: Scene | null = null,
  componentFn: ((...args: unknown[]) => JSX.Element) | null = null,
  componentProps: Record<string, unknown> | null = null,
): RenderContext {
  const state = new Map<number, unknown>();
  let stateIndex = 0;
  let gameObjectTree: GameObjectNode | null = null;

  return {
    state,
    scene,
    componentFn,
    componentProps,
    gameObjectTree,
    getNextStateIndex: () => stateIndex++,
    resetStateIndex: () => {
      stateIndex = 0;
    },
    rerender: () => {
      stateIndex = 0;

      if (componentFn && componentProps && scene) {
        const newElement = componentFn(componentProps);
        gameObjectTree = reconcileTree(newElement, gameObjectTree, scene);
      } else if (element && scene) {
        gameObjectTree = reconcileTree(element, gameObjectTree, scene);
      }
    },
  };
}

export function resetRenderContext(): void {
  _context = null;
}
