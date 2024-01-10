import Phaser from 'phaser';
import type { JSX } from 'react';

import { createContainer } from './container';
import { createGameObject } from './gameobject';

/**
 * Renders a piece of JSX into a Phaser scene.
 *
 * @param element - Element that you want to display.
 * @param scene - Phaser scene.
 */
export function render(element: JSX.Element, scene: Phaser.Scene) {
  const container = createContainer(scene);
  const gameObject = createGameObject(element, scene, container);

  if (gameObject) {
    container.add(gameObject);
    scene.add.existing(container);
  }
}
