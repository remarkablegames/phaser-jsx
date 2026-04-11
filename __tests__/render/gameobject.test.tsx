import Phaser from 'phaser';
import type { JSX } from 'react';
import type { Mock, MockInstance } from 'vitest';

import { Fragment } from '../../src';
import * as GameObjects from '../../src/components/GameObjects';
import { addGameObject, setProps } from '../../src/render';

vi.mock('phaser', () => {
  const mockAdd = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Scene = vi.fn(function Scene(this: any) {
    this.add = { existing: vi.fn() };
    this.sys = {
      queueDepthSort: vi.fn(),
      queueDestroy: vi.fn(),
    };
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Container = vi.fn(function Container(this: any) {
    this.add = mockAdd;
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layer = vi.fn(function Layer(this: any) {
    this.add = mockAdd;
  });
  const GameObjects = {
    Arc: vi.fn(),
    BitmapText: vi.fn(),
    Blitter: vi.fn(),
    Bob: vi.fn(),
    Container,
    Curve: vi.fn(),
    DOMElement: vi.fn(),
    DisplayList: vi.fn(),
    DynamicBitmapText: vi.fn(),
    Ellipse: vi.fn(),
    Extern: vi.fn(),
    GameObject: vi.fn(),
    GameObjectCreator: vi.fn(),
    GameObjectFactory: vi.fn(),
    Graphics: vi.fn(),
    Grid: vi.fn(),
    Group: vi.fn(),
    Image: vi.fn(),
    IsoBox: vi.fn(),
    IsoTriangle: vi.fn(),
    Layer,
    Light: vi.fn(),
    LightsManager: vi.fn(),
    LightsPlugin: vi.fn(),
    Line: vi.fn(),
    Mesh: vi.fn(),
    NineSlice: vi.fn(),
    ParticleEmitter: vi.fn(),
    Particles: {},
    PathFollower: vi.fn(),
    Plane: vi.fn(),
    PointLight: vi.fn(),
    Polygon: vi.fn(),
    Rectangle: vi.fn(),
    RenderTexture: vi.fn(),
    Rope: vi.fn(),
    Shader: vi.fn(),
    Shape: vi.fn(),
    Sprite: vi.fn(),
    Star: vi.fn(),
    Text: vi.fn(),
    TextStyle: vi.fn(),
    TileSprite: vi.fn(),
    Triangle: vi.fn(),
    UpdateList: vi.fn(),
    Video: vi.fn(),
    Zone: vi.fn(),
  };

  return {
    __esModule: true,
    default: {
      Curves: {
        Path: vi.fn(),
      },
      GameObjects,
      Scene,
    },
    Curves: {
      Path: vi.fn(),
    },
    GameObjects,
    Scene,
  };
});

vi.mock('../../src/render/props', () => ({
  setProps: vi.fn(),
}));

const scene = new Phaser.Scene();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('invalid element', () => {
  it('logs warning', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});
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
  expect((C as Mock).mock.calls[0][0]).toBe(scene);
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
  });
});

describe('Bob', () => {
  it('adds game object', () => {
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
  let consoleErrorSpy: MockInstance;

  beforeEach(() => {
    // Each child in a list should have a unique "key" prop.
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('adds game object with no props', () => {
    addGameObject(<Component />, scene);
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
  });

  it('adds game object with single child', () => {
    const Component = GameObjects[component];
    addGameObject(
      <Component>
        <GameObjects.Sprite texture="texture" />
      </Component>,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledWith(scene);
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(1);
  });

  it('adds game object with children', () => {
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
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(2);
  });

  it('nests game objects', () => {
    addGameObject(
      <Component>
        <Component />
        <GameObjects.Sprite texture="texture" />
      </Component>,
      scene,
    );
    expect(Phaser.GameObjects[component]).toHaveBeenCalledTimes(2);
    expect(Phaser.GameObjects.Sprite).toHaveBeenCalledTimes(1);
  });
});

describe('GameObject', () => {
  it('adds game object', () => {
    const type = 'sprite';
    addGameObject(<GameObjects.GameObject type={type} />, scene);
    expect(Phaser.GameObjects.GameObject).toHaveBeenCalledWith(scene, type);
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
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
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

describe('Light', () => {
  it('adds game object', () => {
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
  it('adds game object', () => {
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
  it('adds game object', () => {
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
  it('adds game object', () => {
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
  it('adds game object', () => {
    const x = 1;
    const y = 2;
    addGameObject(<GameObjects.Rectangle x={x} y={y} />, scene);
    expect(Phaser.GameObjects.Rectangle).toHaveBeenCalledWith(scene, x, y);
  });
});

describe('Rope', () => {
  it('adds game object', () => {
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

describe('Shader', () => {
  it('adds game object', () => {
    const shader = 'key';
    addGameObject(<GameObjects.Shader shader={shader} />, scene);
    expect(Phaser.GameObjects.Shader).toHaveBeenCalledWith(scene, shader);
    expect(setProps).toHaveBeenCalledWith(expect.anything(), {}, scene);
  });
});

describe('Text', () => {
  it('adds game object with no props', () => {
    addGameObject(<GameObjects.Text />, scene);
    expect(Phaser.GameObjects.Text).toHaveBeenCalledWith(
      scene,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  });

  it('adds game object with props', () => {
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

  it('does not pass certain props to setProps', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
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

describe('TileSprite', () => {
  it('adds game object', () => {
    const props = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    };
    const texture = 'texture';
    const frame = 'frame';
    addGameObject(
      <GameObjects.TileSprite {...props} texture={texture} frame={frame} />,
      scene,
    );
    expect(Phaser.GameObjects.TileSprite).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      props.width,
      props.height,
      texture,
      frame,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('Video', () => {
  it('adds game object', () => {
    const props = {
      x: 1,
      y: 2,
      cacheKey: 'cacheKey',
    };
    addGameObject(<GameObjects.Video {...props} />, scene);
    expect(Phaser.GameObjects.Video).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
      props.cacheKey,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});

describe('Zone', () => {
  it('adds game object', () => {
    const props = {
      x: 1,
      y: 2,
    };
    addGameObject(<GameObjects.Zone {...props} />, scene);
    expect(Phaser.GameObjects.Zone).toHaveBeenCalledWith(
      scene,
      props.x,
      props.y,
    );
    expect(setProps).toHaveBeenCalledWith(expect.anything(), props, scene);
  });
});
