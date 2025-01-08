import Phaser from 'phaser';
import type { JSX } from 'react';

import {
  BitmapText,
  Bob,
  Container,
  DynamicBitmapText,
  Fragment,
  Rectangle,
  Sprite,
  Text,
} from '..';
import { addGameObject, setProps } from '.';

const mockAdd = jest.fn();

jest.mock('phaser', () => {
  return {
    GameObjects: {
      BitmapText: jest.fn(),
      Bob: jest.fn(),
      Container: jest.fn(() => ({ add: mockAdd })),
      DynamicBitmapText: jest.fn(),
      Particles: {},
      Rectangle: jest.fn(),
      Sprite: jest.fn(),
      Text: jest.fn(),
    },
    Scene: jest.fn(() => ({
      add: { existing: jest.fn() },
    })),
  };
});

jest.mock('./props', () => ({
  setProps: jest.fn(),
}));

const scene = new Phaser.Scene();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('invalid element', () => {
  it('logs warning', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const invalidElement = {} as JSX.Element;
    addGameObject(invalidElement, scene);
    expect(spy).toHaveBeenCalledWith(
      'Invalid JSX type. Expected a class or function but got: undefined',
    );
    spy.mockRestore();
  });
});

it.each([
  ['BitmapText', BitmapText],
  ['Bob', Bob],
  ['Container', Container],
  ['DynamicBitmapText', DynamicBitmapText],
  ['Rectangle', Rectangle],
  ['Sprite', Sprite],
  ['Text', Text],
])('adds %s', (name, Component) => {
  // @ts-expect-error missing props
  addGameObject(<Component />, scene);
  const C = Phaser.GameObjects[name as keyof typeof Phaser.GameObjects];
  expect(C).toHaveBeenCalledTimes(1);
  expect((C as jest.Mock).mock.calls[0][0]).toBe(scene);
});

describe('Fragment', () => {
  it('adds single child', () => {
    addGameObject(
      <Fragment>
        <Text />
      </Fragment>,
      scene,
    );
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(1);
  });

  it('adds children', () => {
    addGameObject(
      <Fragment>
        <Text />
        <Container />
      </Fragment>,
      scene,
    );
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(1);
    expect(Phaser.GameObjects.Container).toHaveBeenCalledTimes(1);
  });

  it('adds array of children', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    addGameObject(
      <Fragment>
        <Container />
        {Array(1)
          .fill(null)
          .map((_, index) => (
            <Text text={String(index)} />
          ))}
      </Fragment>,
      scene,
    );
    expect(Phaser.GameObjects.Container).toHaveBeenCalledTimes(1);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(1);
    // Each child in a list should have a unique "key" prop.
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe('Container', () => {
  it('nests game objects', () => {
    function Children() {
      return (
        <Container>
          <Container />
          <Text />
        </Container>
      );
    }
    addGameObject(<Children />, scene);
    expect(mockAdd).toHaveBeenCalledTimes(2);
  });
});

describe('Text', () => {
  it('adds text with no props', () => {
    addGameObject(<Text />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledWith(
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  });

  it('adds text with props', () => {
    const props = {
      x: 1,
      y: 2,
      text: 'a',
      style: {
        fontSize: '42px',
      },
    };
    const element = <Text {...props} />;
    addGameObject(element, scene);
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
    addGameObject(element, scene);
    expect(setProps).toHaveBeenCalledWith(expect.any(Object), {}, scene);
    spy.mockRestore();
  });
});

describe('Function', () => {
  function FunctionComponent() {
    return (
      <Fragment>
        <Text
          text="text"
          style={{
            color: '#fff',
            font: '42px Arial',
          }}
        />
        <Sprite texture="texture" frame="frame" />
      </Fragment>
    );
  }

  it('renders function component', () => {
    function MyComponent() {
      return (
        <Fragment>
          <FunctionComponent />
          <Text />
        </Fragment>
      );
    }
    addGameObject(<MyComponent />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(2);
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(1);
  });
});
