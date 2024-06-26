import Phaser from 'phaser';
import type { JSX } from 'react';

import * as GameObjects from '../components/GameObjects';
import { isValidElement } from '../element';
import { setProps } from './props';
import { attachRef } from './ref';

const gameObjects = Object.keys(GameObjects).map(
  (key) => GameObjects[key as keyof typeof GameObjects],
);

/**
 * Creates Phaser game object and adds it to the container.
 *
 * @param element - Element that you want to create.
 * @param scene - Phaser scene.
 * @returns - Phaser game object.
 */
export function createGameObject(element: JSX.Element, scene: Phaser.Scene) {
  if (!isValidElement(element)) {
    return;
  }

  const {
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    ref,
    style,
    text,
    ...props
  } = element.props;

  let gameObject: Phaser.GameObjects.GameObject;

  switch (true) {
    case element.type === Phaser.GameObjects.Text:
      gameObject = new element.type(scene, props.x, props.y, text, style);
      break;

    case element.type === Phaser.GameObjects.Rectangle:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        props.width,
        props.height,
        props.fillColor,
        props.fillAlpha,
      );
      break;

    case gameObjects.indexOf(element.type) > -1:
      gameObject = new element.type(scene);
      break;

    default:
      return createGameObject(new element.type(element.props), scene);
  }

  setProps(gameObject, props, scene);
  attachRef(gameObject, ref);

  if (Array.isArray(children)) {
    children.forEach((element: JSX.Element) => {
      const childGameObject = createGameObject(element, scene);

      /* istanbul ignore if */
      if (!childGameObject) {
        return;
      }

      if (gameObject instanceof Phaser.GameObjects.Container) {
        gameObject.add(childGameObject);
      } else {
        scene.add.existing(childGameObject);
      }
    });
  }

  return gameObject;
}
