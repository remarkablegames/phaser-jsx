import type { Scene } from 'phaser';
import type { JSX } from 'react';

import { reconcileTree } from '../render/reconcile';
import type { GameObjectNode } from '../types';

/**
 * Stored data for a single effect slot.
 */
interface EffectRecord {
  deps: unknown[] | undefined;
  cleanup: (() => void) | void;
}

/**
 * An effect queued during render, to be flushed after reconciliation.
 */
interface PendingEffect {
  key: number;
  callback: () => (() => void) | void;
  deps: unknown[] | undefined;
}

/**
 * Render context for tracking state and reconciliation.
 */
export interface RenderContext {
  state: Map<number, unknown>;
  effects: Map<number, EffectRecord>;
  pendingEffects: PendingEffect[];
  scene: Scene | null;
  componentFn: ((...args: unknown[]) => JSX.Element) | null;
  componentProps: Record<string, unknown> | null;
  gameObjectTree: GameObjectNode | null;
  getNextStateIndex: () => number;
  resetStateIndex: () => void;
  getNextEffectIndex: () => number;
  resetEffectIndex: () => void;
  flushEffects: () => void;
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
  const effects = new Map<number, EffectRecord>();
  const pendingEffects: PendingEffect[] = [];
  let stateIndex = 0;
  let effectIndex = 0;
  let gameObjectTree: GameObjectNode | null = null;

  function flushEffects(): void {
    for (const { key, callback, deps } of pendingEffects) {
      const prev = effects.get(key);
      const shouldRun =
        !prev || deps === undefined || !areDepsEqual(prev.deps, deps);

      if (shouldRun) {
        if (typeof prev?.cleanup === 'function') {
          prev.cleanup();
        }
        const cleanup = callback();
        effects.set(key, { deps, cleanup });
      }
    }
    pendingEffects.length = 0;
    effectIndex = 0;
  }

  return {
    state,
    effects,
    pendingEffects,
    scene,
    componentFn,
    componentProps,
    gameObjectTree,
    getNextStateIndex: () => stateIndex++,
    resetStateIndex: () => {
      stateIndex = 0;
    },
    getNextEffectIndex: () => effectIndex++,
    resetEffectIndex: () => {
      effectIndex = 0;
    },
    flushEffects,
    rerender: () => {
      stateIndex = 0;
      effectIndex = 0;

      if (componentFn && componentProps && scene) {
        const newElement = componentFn(componentProps);
        gameObjectTree = reconcileTree(newElement, gameObjectTree, scene);
      } else if (element && scene) {
        gameObjectTree = reconcileTree(element, gameObjectTree, scene);
      }

      flushEffects();
    },
  };
}

export function resetRenderContext(): void {
  if (_context) {
    _context.effects.forEach(({ cleanup }) => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    });
  }
  _context = null;
}

function areDepsEqual(
  prevDeps: unknown[] | undefined,
  nextDeps: unknown[] | undefined,
): boolean {
  if (prevDeps === undefined || nextDeps === undefined) {
    return false;
  }
  if (prevDeps.length !== nextDeps.length) {
    return false;
  }
  // TODO: refactor to `nextDeps.every((dep, i) => Object.is(dep, prevDeps[i]))`
  for (let i = 0; i < nextDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false;
    }
  }
  return true;
}
