import Phaser from 'phaser';

/**
 * Creates Phaser container.
 *
 * @param scene - Phaser scene.
 * @returns - Phaser container.
 */
export function createContainer(scene: Phaser.Scene) {
  return new Phaser.GameObjects.Container(scene);
}
