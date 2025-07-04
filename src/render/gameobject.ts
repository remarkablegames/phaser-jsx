import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '../components';
import * as GameObjects from '../components/GameObjects';
import { isValidElement } from '../element';
import { setProps } from './props';
import { attachRef } from './ref';

/**
 * Instantiates Phaser Game Object in the Scene.
 *
 * @param element - Element that you want to add.
 * @param scene - Phaser Scene.
 * @param parent - Phaser Container or Layer.
 */
export function addGameObject(
  element: JSX.Element,
  scene: Phaser.Scene,
  parent?: Phaser.GameObjects.Container | Phaser.GameObjects.Layer,
) {
  if (Array.isArray(element)) {
    element.forEach((current) => addGameObject(current, scene, parent));
    return;
  }

  if (!isValidElement(element)) {
    return;
  }

  const {
    children,
    color,
    frame,
    key, // eslint-disable-line @typescript-eslint/no-unused-vars
    points,
    ref,
    shader,
    style,
    texture,
    ...props
  } = element.props;

  let gameObject: Phaser.GameObjects.GameObject;

  switch (true) {
    case element.type === Fragment:
      /* istanbul ignore else */
      if (children) {
        toArray(children).forEach((child: JSX.Element) => {
          addGameObject(child, scene, parent);
        });
      }
      return;

    case element.type === Phaser.GameObjects.BitmapText:
    case element.type === Phaser.GameObjects.DynamicBitmapText:
      gameObject = new element.type(scene, props.x, props.y, props.font);
      break;

    case element.type === Phaser.GameObjects.Bob:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        frame,
        props.visible,
      );
      break;

    case element.type === Phaser.GameObjects.Container:
    case element.type === Phaser.GameObjects.Layer:
      gameObject = new element.type(scene);
      if (children) {
        toArray(children).forEach((child: JSX.Element) => {
          addGameObject(
            child,
            scene,
            gameObject as
              | Phaser.GameObjects.Container
              | Phaser.GameObjects.Layer,
          );
        });
      }
      break;

    case element.type === Phaser.GameObjects.GameObject:
      gameObject = new element.type(scene, props.type);
      break;

    case element.type === Phaser.GameObjects.Image:
    case element.type === Phaser.GameObjects.Sprite:
    case element.type === Phaser.GameObjects.NineSlice:
      gameObject = new element.type(scene, props.x, props.y, texture, frame);
      break;

    case element.type === Phaser.GameObjects.Light:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        props.radius,
        color?.r,
        color?.g,
        color?.b,
        props.intensity,
      );
      break;

    case element.type === Phaser.GameObjects.PathFollower:
      gameObject = new element.type(
        scene,
        props.path,
        props.x,
        props.y,
        texture,
        frame,
      );
      break;

    case element.type === Phaser.GameObjects.Plane:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        texture,
        frame,
        props.width,
        props.height,
        props.isTiled,
      );
      break;

    case element.type === Phaser.GameObjects.PointLight:
      gameObject = new element.type(scene, props.x, props.y, color);
      break;

    case element.type === Phaser.GameObjects.Rectangle:
    case element.type === Phaser.GameObjects.Zone:
      gameObject = new element.type(scene, props.x, props.y);
      break;

    case element.type === Phaser.GameObjects.Rope:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        texture,
        frame,
        points,
      );
      break;

    case element.type === Phaser.GameObjects.Shader:
      gameObject = new element.type(scene, shader);
      break;

    case element.type === Phaser.GameObjects.Text:
      gameObject = new element.type(scene, props.x, props.y, props.text, style);
      break;

    case element.type === Phaser.GameObjects.TileSprite:
      gameObject = new element.type(
        scene,
        props.x,
        props.y,
        props.width,
        props.height,
        texture,
        frame,
      );
      break;

    case element.type === Phaser.GameObjects.Video:
      gameObject = new element.type(scene, props.x, props.y, props.cacheKey);
      break;

    // Phaser component
    case gameObjects.indexOf(element.type) !== -1:
      gameObject = new element.type(scene);
      break;

    // composite component (class/function)
    default:
      addGameObject(new element.type(element.props), scene, parent);
      return;
  }

  setProps(gameObject, props, scene);
  attachRef(gameObject, ref);

  if (typeof parent?.add === 'function') {
    parent.add(gameObject);
  } else {
    scene.add.existing(gameObject);
  }
}

const gameObjects = Object.keys(GameObjects).map(
  (key) => GameObjects[key as keyof typeof GameObjects],
);

function toArray<Type>(item: Type | Type[]) {
  return Array.isArray(item) ? item : [item];
}
