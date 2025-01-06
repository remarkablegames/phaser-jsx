import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, GameObject, Rectangle, Sprite, Text } from '..';
import { createGameObject, setProps } from '.';

jest.mock('phaser', () => {
  const GameObject = jest.fn();
  class Container extends GameObject {
    add = jest.fn();
  }
  class Rectangle extends GameObject {}
  class Sprite extends GameObject {}
  class Text extends GameObject {}

  return {
    GameObjects: {
      Container,
      GameObject,
      Particles: {},
      Rectangle,
      Sprite,
      Text,
    },

    Scene: jest.fn(() => ({
      add: {
        existing: jest.fn(),
      },
    })),
  };
});

jest.mock('./props', () => ({
  setProps: jest.fn(),
}));

const scene = new Phaser.Scene();

function Component() {
  return <Text />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('invalid element', () => {
  it('logs warning', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const invalidElement = {} as JSX.Element;
    expect(createGameObject(invalidElement, scene)).toBe(undefined);
    expect(spy).toHaveBeenCalledWith(
      'Invalid JSX type. Expected a class or function but got: undefined',
    );
    spy.mockRestore();
  });
});

it.each([Rectangle, Text])('creates game object from %p', (Component) => {
  expect(createGameObject(<Component />, scene)).toBeInstanceOf(GameObject);
});

it('creates game object from Sprite', () => {
  expect(
    createGameObject(<Sprite texture="texture" frame="frame" />, scene),
  ).toBeInstanceOf(GameObject);
});

it('creates game object from component', () => {
  expect(createGameObject(<Component />, scene)).toBeInstanceOf(GameObject);
});

describe('children', () => {
  it('creates game objects', () => {
    expect(
      createGameObject(
        // this is technically invalid
        <Text>
          <Container />
          <Text />
        </Text>,
        scene,
      ),
    ).toBeInstanceOf(GameObject);
  });

  it('nests game objects under Container', () => {
    function Children() {
      return (
        <Container>
          <Component />
          <Container />
          <Text />
        </Container>
      );
    }
    expect(createGameObject(<Children />, scene)).toBeInstanceOf(GameObject);
  });
});

describe('Text', () => {
  it('creates text with no props', () => {
    expect(createGameObject(<Text />, scene)).toBeInstanceOf(GameObject);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledWith(
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
    expect(createGameObject(element, scene)).toBeInstanceOf(GameObject);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledWith(
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
    expect(createGameObject(element, scene)).toBeInstanceOf(GameObject);
    expect(setProps).toHaveBeenCalledWith(expect.any(Object), {}, scene);
    spy.mockRestore();
  });
});
