import Phaser from 'phaser';
import type { JSX } from 'react';

import { createGameObject } from './gameobject';

/**
 * Renders a piece of JSX into a Phaser scene.
 *
 * @param element - Element that you want to display.
 * @param scene - Phaser scene.
 */
export function render(element: JSX.Element, scene: Phaser.Scene) {
  const gameObject = createGameObject(element, scene);

  if (gameObject) {
    scene.add.existing(gameObject);
  }
}
