import Phaser from 'phaser';
import type { JSX } from 'react';

import { isValidElement } from '../element';
import { attachRef, createContainer, setProps } from '.';

/**
 * Creates Phaser game object and adds it to the container.
 *
 * @param element - Element that you want to create.
 * @param scene - Phaser scene.
 * @param container - Parent Phaser container.
 * @returns - Child Phaser container.
 */
export function createGameObject(
  element: JSX.Element,
  scene: Phaser.Scene,
  container: Phaser.GameObjects.Container,
) {
  if (!isValidElement(element)) {
    return;
  }

  const gameObject: Phaser.GameObjects.GameObject = new element.type(scene);

  if (!(gameObject instanceof Phaser.GameObjects.GameObject)) {
    return createGameObject(new element.type(element.props), scene, container);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, key, ref, ...props } = element.props;

  setProps(gameObject, props, scene);
  attachRef(gameObject, ref);

  const childContainer = createContainer(scene);
  container.add(childContainer);
  childContainer.add(gameObject);

  children?.forEach((element: JSX.Element) => {
    createGameObject(element, scene, childContainer);
  });

  return childContainer;
}
