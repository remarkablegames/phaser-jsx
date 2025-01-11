import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '..';
import * as GameObjects from '../components/GameObjects';
import { addGameObject, setProps } from '.';

const mockAdd = jest.fn();

jest.mock('phaser', () => {
  return {
    GameObjects: {
      Arc: jest.fn(),
      BitmapText: jest.fn(),
      Blitter: jest.fn(),
      Bob: jest.fn(),
      Container: jest.fn(() => ({ add: mockAdd })),
      Curve: jest.fn(),
      DOMElement: jest.fn(),
      DisplayList: jest.fn(),
      DynamicBitmapText: jest.fn(),
      Ellipse: jest.fn(),
      Extern: jest.fn(),
      GameObject: jest.fn(),
      GameObjectCreator: jest.fn(),
      GameObjectFactory: jest.fn(),
      Graphics: jest.fn(),
      Grid: jest.fn(),
      Group: jest.fn(),
      Image: jest.fn(),
      IsoBox: jest.fn(),
      IsoTriangle: jest.fn(),
      Layer: jest.fn(),
      Light: jest.fn(),
      LightsManager: jest.fn(),
      LightsPlugin: jest.fn(),
      Line: jest.fn(),
      Mesh: jest.fn(),
      NineSlice: jest.fn(),
      ParticleEmitter: jest.fn(),
      Particles: {},
      PathFollower: jest.fn(),
      Plane: jest.fn(),
      PointLight: jest.fn(),
      Polygon: jest.fn(),
      Rectangle: jest.fn(),
      RenderTexture: jest.fn(),
      Rope: jest.fn(),
      Shader: jest.fn(),
      Shape: jest.fn(),
      Sprite: jest.fn(),
      Star: jest.fn(),
      Text: jest.fn(),
      TextStyle: jest.fn(),
      TileSprite: jest.fn(),
      Triangle: jest.fn(),
      UpdateList: jest.fn(),
      Video: jest.fn(),
      Zone: jest.fn(),
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

it.each(Object.entries(GameObjects))('adds %s', (name, Component) => {
  if (['ParticleEmitter'].includes(name)) {
    return;
  }
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
        <GameObjects.Text />
      </Fragment>,
      scene,
    );
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(1);
  });

  it('adds children', () => {
    addGameObject(
      <Fragment>
        <GameObjects.Text />
        <GameObjects.Container />
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
        <GameObjects.Container />
        {Array(1)
          .fill(null)
          .map((_, index) => (
            <GameObjects.Text text={String(index)} />
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

describe('Bob', () => {
  it('instantiates game object', () => {
    const props = {
      x: 1,
      y: 2,
      frame: 'frame',
      visible: true,
    };
    addGameObject(<GameObjects.Bob {...props} />, scene);
    expect(Phaser.GameObjects.Bob).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      props.frame,
      props.visible,
    );
  });
});

describe('Container', () => {
  it('nests game objects', () => {
    function Children() {
      return (
        <GameObjects.Container>
          <GameObjects.Container />
          <GameObjects.Text />
        </GameObjects.Container>
      );
    }
    addGameObject(<Children />, scene);
    expect(mockAdd).toHaveBeenCalledTimes(2);
  });
});

describe('GameObject', () => {
  it('instantiates game object', () => {
    const props = {
      type: 'sprite',
    };
    addGameObject(<GameObjects.GameObject {...props} />, scene);
    expect(Phaser.GameObjects.GameObject).toHaveBeenCalledWith(
      scene,
      props.type,
    );
  });
});

describe('Text', () => {
  it('adds Text with no props', () => {
    addGameObject(<GameObjects.Text />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledWith(
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  });

  it('adds Text with props', () => {
    const props = {
      x: 1,
      y: 2,
      text: 'a',
      style: {
        fontSize: '42px',
      },
    };
    const element = <GameObjects.Text {...props} />;
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
      style: {},
      text: 'text',
    };
    const element = <GameObjects.Text {...props} />;
    addGameObject(element, scene);
    expect(setProps).toHaveBeenCalledWith(
      expect.anything(),
      { text: props.text },
      scene,
    );
    spy.mockRestore();
  });
});

describe.each(['Image', 'Sprite'] as const)('%s', (component) => {
  it('adds game object', () => {
    const props = {
      x: 1,
      y: 2,
      texture: 'texture',
      frame: 'frame',
    };
    const Component = GameObjects[component];
    const element = <Component {...props} />;
    addGameObject(element, scene);
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      props.texture,
      props.frame,
    );
  });

  it('does not pass certain props to setProps', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const props = {
      children: [],
      key: null,
      ref: () => {},
      x: 1,
      y: 2,
      texture: 'texture',
      frame: 'frame',
    };
    const Component = GameObjects[component];
    const element = <Component {...props} />;
    addGameObject(element, scene);
    expect(setProps).toHaveBeenCalledWith(
      expect.anything(),
      {
        x: props.x,
        y: props.y,
      },
      scene,
    );
    spy.mockRestore();
  });
});

describe('composite', () => {
  function CompositeComponent() {
    return (
      <Fragment>
        <GameObjects.Text
          text="text"
          style={{
            color: '#fff',
            font: '42px Arial',
          }}
        />
        <GameObjects.Sprite texture="texture" frame="frame" />
      </Fragment>
    );
  }

  it('renders composite component', () => {
    function MyComponent() {
      return (
        <Fragment>
          <CompositeComponent />
          <GameObjects.Text />
        </Fragment>
      );
    }
    addGameObject(<MyComponent />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(2);
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(1);
  });
});
