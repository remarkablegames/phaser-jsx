import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, Text } from '..';
import { createGameObject, setProps } from '.';

jest.mock('phaser', () => {
  const GameObject = jest.fn();
  return {
    GameObjects: {
      Container: GameObject,
      GameObject,
      Particles: {},
      Text: GameObject,
    },
    Scene: jest.fn(),
  };
});

jest.mock('./container', () => ({
  createContainer: jest.fn(() => ({
    add: jest.fn(),
  })),
}));

jest.mock('./props', () => ({
  setProps: jest.fn(),
}));

const scene = new Phaser.Scene();

function Component() {
  return <Container />;
}

function Children(props: { children: JSX.Element[] }) {
  return <Container {...props} />;
}

let container: Phaser.GameObjects.Container;

beforeEach(() => {
  jest.clearAllMocks();
  container = new Phaser.GameObjects.Container(scene);
  container.add = jest.fn();
});

describe('invalid element', () => {
  it('logs warning', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const element = {} as JSX.Element;
    expect(createGameObject(element, scene, container)).toBe(undefined);
    expect(spy).toBeCalledWith(
      'Invalid JSX type. Expected a class or function but got: undefined',
    );
    spy.mockRestore();
  });
});

it('creates game object from element', () => {
  const element = <Container />;
  expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
  expect(container.add).toBeCalledTimes(1);
});

it('creates game object from component', () => {
  const element = <Component />;
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
  expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
  expect(container.add).toBeCalledTimes(1);
});

describe('Text', () => {
  it('creates text with no props', () => {
    const element = <Text />;
    expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
    expect(container.add).toBeCalledTimes(1);
    expect(Phaser.GameObjects.Text).toBeCalledWith(
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  });

  it('creates text with props', () => {
    const props = {
      x: 1,
      y: 2,
      text: 'a',
      style: {
        fontSize: '42px',
      },
    };
    const element = <Text {...props} />;
    expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
    expect(container.add).toBeCalledTimes(1);
    expect(Phaser.GameObjects.Text).toBeCalledWith(
      scene,
      props.x,
      props.y,
      props.text,
      props.style,
    );
  });

  it('does not pass certain Text props to setProps', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const props = {
      children: [],
      key: null,
      ref: () => {},
      text: 'a',
      style: {},
    };
    const element = <Text {...props} />;
    expect(createGameObject(element, scene, container)).toBeInstanceOf(Object);
    expect(container.add).toBeCalledTimes(1);
    expect(setProps).toBeCalledWith(expect.any(Object), {}, scene);
    spy.mockRestore();
  });
});
