import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, createRef } from '..';
import { createGameObject } from './gameobject';

jest.mock('phaser', () => {
  const GameObject = jest.fn();
  return {
    GameObjects: {
      Container: GameObject,
      GameObject,
      Particles: {},
    },
    Scene: jest.fn(),
  };
});

jest.mock('./container', () => ({
  createContainer: jest.fn(() => ({
    add: jest.fn(),
  })),
}));

const scene = new Phaser.Scene();

function Component() {
  return <Container />;
}

function Children(props: { children: JSX.Element[] }) {
  return <Container {...props} />;
}

it('logs warning for invalid element', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();
  const element = {} as JSX.Element;
  const container = new Phaser.GameObjects.Container(scene);
  expect(createGameObject(element, scene, container)).toBe(undefined);
  expect(spy).toBeCalledWith(
    'Invalid JSX type. Expected a class or function but got: undefined',
  );
  spy.mockRestore();
});

it('creates game object from element', () => {
  const element = <Container />;
  const container = new Phaser.GameObjects.Container(scene);
  container.add = jest.fn();
  expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
  expect(container.add).toBeCalledTimes(1);
});

it('creates game object from component', () => {
  const element = <Component />;
  const container = new Phaser.GameObjects.Container(scene);
  container.add = jest.fn();
  expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
  expect(container.add).toBeCalledTimes(1);
});

it('creates game object with children', () => {
  const element = (
    <Children>
      <Component />
      <Container />
    </Children>
  );
  const container = new Phaser.GameObjects.Container(scene);
  container.add = jest.fn();
  expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
  expect(container.add).toBeCalledTimes(1);
});
