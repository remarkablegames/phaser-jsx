import type Phaser from 'phaser';

/**
 * Info about a tracked game object in the tree.
 */
export interface GameObjectNode {
  gameObject: Phaser.GameObjects.GameObject;
  props: Record<string, unknown>;
  children: (GameObjectNode | null)[];
}
