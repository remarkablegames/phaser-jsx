import type { Scene } from 'phaser';

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
