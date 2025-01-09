import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '../components';
import * as GameObjects from '../components/GameObjects';
import { isValidElement } from '../element';
import { setProps } from './props';
import { attachRef } from './ref';

/**
 * Instantiates Phaser game object in the scene.
 *
 * @param element - Element that you want to create.
 * @param scene - Phaser scene.
 * @param container - Phaser container.
 * @returns - Phaser game object.
 */
export function addGameObject(
  element: JSX.Element,
  scene: Phaser.Scene,
  container?: Phaser.GameObjects.Container,
) {
  if (Array.isArray(element)) {
    element.forEach((current) => addGameObject(current, scene, container));
    return;
  }

  if (!isValidElement(element)) {
    return;
  }

  const {
    children,
    frame,
    key, // eslint-disable-line @typescript-eslint/no-unused-vars
    ref,
    style,
    texture,
    ...props
  } = element.props;

  let gameObject: Phaser.GameObjects.GameObject;

  switch (true) {
    case element.type === Fragment:
      if (children) {
        toArray(children).forEach((child: JSX.Element) => {
          addGameObject(child, scene);
        });
      }
      return;

    case element.type === Phaser.GameObjects.BitmapText:
    case element.type === Phaser.GameObjects.DynamicBitmapText:
      gameObject = new element.type(scene, props.x, props.y, props.font);
      break;

    case element.type === Phaser.GameObjects.Container:
      gameObject = new element.type(scene);
      if (children) {
        toArray(children).forEach((child: JSX.Element) => {
          addGameObject(
            child,
            scene,
            gameObject as Phaser.GameObjects.Container,
          );
        });
      }
      break;

    case element.type === Phaser.GameObjects.Rectangle:
      gameObject = new element.type(scene, props.x, props.y);
      break;

    case element.type === Phaser.GameObjects.Sprite:
      gameObject = new element.type(scene, props.x, props.y, texture, frame);
      break;

    case element.type === Phaser.GameObjects.Text:
      gameObject = new element.type(scene, props.x, props.y, props.text, style);
      break;

    // Phaser component
    case gameObjects.indexOf(element.type) !== -1:
      gameObject = new element.type(scene);
      break;

    // composite component (class/function)
    default:
      addGameObject(new element.type(element.props), scene);
      return;
  }

  setProps(gameObject, props, scene);
  attachRef(gameObject, ref);

  if (container) {
    container.add(gameObject);
  } else {
    scene.add.existing(gameObject);
  }
}

const gameObjects = Object.keys(GameObjects).map(
  (key) => GameObjects[key as keyof typeof GameObjects],
);

function toArray<T>(item: T | T[]) {
  return Array.isArray(item) ? item : [item];
}
