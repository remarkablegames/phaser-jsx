import Phaser from 'phaser';
import type { JSX } from 'react';

import { Fragment } from '..';
import * as GameObjects from '../components/GameObjects';
import { addGameObject, setProps } from '.';

const mockAdd = jest.fn();

jest.mock('phaser', () => {
  return {
    Curves: {
      Path: jest.fn(),
    },
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
      Layer: jest.fn(() => ({ add: mockAdd })),
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
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const invalidElement = {} as JSX.Element;
    addGameObject(invalidElement, scene);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid JSX type. Expected a class or function but got: undefined',
    );
    consoleWarnSpy.mockRestore();
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

  it('adds container', () => {
    function Composite() {
      return <GameObjects.Container />;
    }
    addGameObject(
      <GameObjects.Container>
        <Fragment>
          <Composite />
        </Fragment>
      </GameObjects.Container>,
      scene,
    );
    expect(Phaser.GameObjects.Container).toHaveBeenCalledTimes(2);
  });

  it('adds array of children', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
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
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
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

describe.each(['Container', 'Layer'] as const)('%s', (component) => {
  const Component = GameObjects[component];
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Each child in a list should have a unique "key" prop.
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('instantiates with no props', () => {
    addGameObject(<Component />, scene);
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
    expect(mockAdd).not.toHaveBeenCalled();
  });

  it('instantiates with single child', () => {
    const Component = GameObjects[component];
    addGameObject(
      <Component>
        <GameObjects.Sprite texture="texture" />
      </Component>,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
    expect(mockAdd).toHaveBeenCalledTimes(1);
  });

  it('instantiates with children', () => {
    const Component = GameObjects[component];
    addGameObject(
      <Component>
        {Array(2)
          .fill(null)
          .map(() => (
            <GameObjects.Sprite texture="texture" />
          ))}
      </Component>,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
    expect(mockAdd).toHaveBeenCalledTimes(2);
  });

  it('nests game objects', () => {
    addGameObject(
      <Component>
        <Component />
        <GameObjects.Sprite texture="texture" />
      </Component>,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
    expect(mockAdd).toHaveBeenCalledTimes(2);
  });
});

describe('GameObject', () => {
  it('instantiates game object', () => {
    const type = 'sprite';
    addGameObject(<GameObjects.GameObject type={type} />, scene);
    expect(Phaser.GameObjects.GameObject).toHaveBeenCalledWith(scene, type);
  });
});

describe('Light', () => {
  it('instantiates game object', () => {
    const props = {
      x: 1,
      y: 2,
      radius: 3,
      intensity: 4,
    };
    const color = {
      r: 0,
      g: 0.5,
      b: 1,
    };
    addGameObject(<GameObjects.Light {...props} color={color} />, scene);
    expect(Phaser.GameObjects.Light).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      props.radius,
      color.r,
      color.g,
      color.b,
      props.intensity,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('PathFollower', () => {
  it('instantiates game object', () => {
    const props = {
      path: new Phaser.Curves.Path(1, 2),
      x: 3,
      y: 4,
    };
    const texture = 'texture';
    const frame = 'frame';
    addGameObject(
      <GameObjects.PathFollower {...props} texture={texture} frame={frame} />,
      scene,
    );
    expect(Phaser.GameObjects.PathFollower).toHaveBeenCalledWith(
      scene,
      props.path,
      props.x,
      props.y,
      texture,
      frame,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('Plane', () => {
  it('instantiates game object', () => {
    const props = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
      isTiled: true,
    };
    const texture = 'texture';
    const frame = 'frame';
    addGameObject(
      <GameObjects.Plane {...props} texture={texture} frame={frame} />,
      scene,
    );
    expect(Phaser.GameObjects.Plane).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      texture,
      frame,
      props.width,
      props.height,
      props.isTiled,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('PointLight', () => {
  it('instantiates game object', () => {
    const props = {
      x: 1,
      y: 2,
    };
    const color = 0xffffff;
    addGameObject(<GameObjects.PointLight {...props} color={color} />, scene);
    expect(Phaser.GameObjects.PointLight).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      color,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('Rectangle', () => {
  it('instantiates game object', () => {
    const x = 1;
    const y = 2;
    addGameObject(<GameObjects.Rectangle x={x} y={y} />, scene);
    expect(Phaser.GameObjects.Rectangle).toHaveBeenCalledWith(scene, x, y);
  });
});

describe('Rope', () => {
  it('instantiates game object', () => {
    const props = {
      x: 1,
      y: 2,
    };
    const texture = 'texture';
    const frame = 'frame';
    const points = 2;
    addGameObject(
      <GameObjects.Rope
        {...props}
        texture={texture}
        frame={frame}
        points={points}
      />,
      scene,
    );
    expect(Phaser.GameObjects.Rope).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      texture,
      frame,
      points,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
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
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
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
    consoleErrorSpy.mockRestore();
  });
});

describe.each(['Image', 'Sprite', 'NineSlice'] as const)('%s', (component) => {
  const Component = GameObjects[component];

  it('adds game object', () => {
    const props = {
      x: 1,
      y: 2,
    };
    const texture = 'texture';
    const frame = 'frame';
    addGameObject(
      <Component {...props} texture={texture} frame={frame} />,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      texture,
      frame,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });

  it('does not pass certain props to setProps', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const props = {
      children: [],
      key: null,
      ref: () => {},
      x: 1,
      y: 2,
      texture: 'texture',
      frame: 'frame',
    };
    addGameObject(<Component {...props} />, scene);
    expect(setProps).toHaveBeenCalledWith(
      expect.anything(),
      {
        x: props.x,
        y: props.y,
      },
      scene,
    );
    consoleErrorSpy.mockRestore();
  });
});

describe('composite', () => {
  function Composite() {
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
          <Composite />
          <GameObjects.Text />
        </Fragment>
      );
    }
    addGameObject(<MyComponent />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledTimes(2);
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(1);
  });
});
