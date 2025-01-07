import Phaser from 'phaser';
import type { JSX } from 'react';

import { setScene } from '../helpers';
import { addGameObject } from './gameobject';

/**
 * Renders a piece of JSX into a Phaser scene.
 *
 * @param element - Element that you want to display.
 * @param scene - Phaser scene.
 */
export function render(element: JSX.Element, scene: Phaser.Scene) {
  setScene(scene);
  addGameObject(element, scene);
}
