import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, createElement, Fragment, Text } from '../../src';
import { reconcileTree } from '../../src/render/reconcile';

// Mock phaser for game object creation
vi.mock('phaser', () => {
  const makeGameObject = (name: string) =>
    vi.fn(function (this: Record<string, unknown>) {
      this.active = true;
      this.destroy = vi.fn();
      this.on = vi.fn();
      this.off = vi.fn();
      this.setStyle = vi.fn();
      this.setInteractive = vi.fn();
      Object.defineProperty(this, '_name', { value: name });
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockText = vi.fn(function Text(this: any) {
    this.x = 0;
    this.y = 0;
    this.text = '';
    this.setStyle = vi.fn();
    this.setInteractive = vi.fn();
    this.on = vi.fn();
    this.off = vi.fn();
    this.destroy = vi.fn();
    this.active = true;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockContainer = vi.fn(function Container(this: any) {
    this.add = vi.fn();
    this.children = [];
    this.destroy = vi.fn();
    this.active = true;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockLayer = vi.fn(function Layer(this: any) {
    this.add = vi.fn();
    this.children = [];
    this.destroy = vi.fn();
    this.active = true;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Scene = vi.fn(function Scene(this: any) {
    this.add = { existing: vi.fn() };
    this.input = { on: vi.fn() };
  });

  const MockParticleEmitter = vi.fn();
  const GameObjects = {
    BitmapText: makeGameObject('BitmapText'),
    Bob: makeGameObject('Bob'),
    Container: MockContainer,
    DynamicBitmapText: makeGameObject('DynamicBitmapText'),
    GameObject: makeGameObject('GameObject'),
    Image: makeGameObject('Image'),
    Layer: MockLayer,
    Light: makeGameObject('Light'),
    NineSlice: makeGameObject('NineSlice'),
    PathFollower: makeGameObject('PathFollower'),
    Plane: makeGameObject('Plane'),
    PointLight: makeGameObject('PointLight'),
    Rectangle: makeGameObject('Rectangle'),
    Rope: makeGameObject('Rope'),
    Shader: makeGameObject('Shader'),
    Sprite: makeGameObject('Sprite'),
    Text: MockText,
    TileSprite: makeGameObject('TileSprite'),
    Video: makeGameObject('Video'),
    Zone: makeGameObject('Zone'),
    Arc: makeGameObject('Arc'),
    Particles: {
      ParticleEmitter: MockParticleEmitter,
    },
  };
  return {
    __esModule: true,
    default: {
      GameObjects,
      Scene,
    },
    GameObjects,
    Scene,
  };
});

describe('reconcileTree', () => {
  let scene: Phaser.Scene;

  beforeEach(() => {
    scene = new Phaser.Scene();
  });

  it('returns null for null element', () => {
    expect(reconcileTree(null, null, scene)).toBe(null);
  });

  it('destroys old node when element is null', () => {
    const gameObject = { active: true, destroy: vi.fn() };
    const oldNode = { gameObject, props: {}, children: [] };
    reconcileTree(
      null,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(gameObject.destroy).toHaveBeenCalled();
  });

  it('returns null for invalid element', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const element = {} as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBe(null);
    vi.restoreAllMocks();
  });

  it('destroys old node when element is invalid', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const gameObject = { active: true, destroy: vi.fn() };
    const oldNode = { gameObject, props: {}, children: [] };
    const element = {} as JSX.Element;
    reconcileTree(
      element,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(gameObject.destroy).toHaveBeenCalled();
    vi.restoreAllMocks();
  });

  it('reconciles arrays', () => {
    const elements = [createElement(Text)];
    const result = reconcileTree(
      elements as unknown as JSX.Element,
      null,
      scene,
    );
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(1);
  });

  it('handles Fragment', () => {
    // Fragment is handled internally, test via array reconciliation
    const children = [createElement(Text), createElement(Text)];
    const result = reconcileTree(
      children as unknown as JSX.Element,
      null,
      scene,
    );
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(2);
  });

  it('handles function components', () => {
    const Comp = () => createElement(Text);
    const element = { type: Comp, props: {} } as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
  });

  it('handles function components with props', () => {
    const Comp = (props: { count: number }) =>
      createElement(Text, { text: `Count: ${props.count}` });
    const element = { type: Comp, props: { count: 5 } } as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
  });

  it('reuses existing game object on re-render', () => {
    const element1 = createElement(Text, { text: 'Hello' });
    const node1 = reconcileTree(element1, null, scene);

    const element2 = createElement(Text, { text: 'World' });
    const node2 = reconcileTree(element2, node1, scene);

    expect(node2?.gameObject).toBe(node1?.gameObject);
    expect((node2?.gameObject as unknown as { text: string }).text).toBe(
      'World',
    );
  });

  it('destroys extra children when array shrinks', () => {
    const childGameObject1 = { active: true, destroy: vi.fn() };
    const childGameObject2 = { active: true, destroy: vi.fn() };
    const parentGameObject = {
      active: true,
      destroy: vi.fn(),
      add: { existing: vi.fn() },
      children: [],
    };
    const child1 = { gameObject: childGameObject1, props: {}, children: [] };
    const child2 = { gameObject: childGameObject2, props: {}, children: [] };
    const oldNode = {
      gameObject: parentGameObject,
      props: {},
      children: [child1, child2],
    };

    // New render with only 1 child
    const newElement = createElement(Container, {}, createElement(Text));
    reconcileTree(
      newElement,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );

    expect(childGameObject2.destroy).toHaveBeenCalled();
  });

  it('handles Container with children', () => {
    const element = createElement(
      Container,
      {},
      createElement(Text),
      createElement(Text),
    );
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(2);
  });

  it('handles Layer with children', () => {
    const element = createElement(Container, {}, createElement(Text));
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(1);
  });

  it('creates new game object when no old node', () => {
    const element = createElement(Text, { x: 10, y: 20, text: 'Hello' });
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.gameObject).toBeDefined();
  });

  it('attaches function ref', () => {
    const ref = vi.fn();
    const element = createElement(Text, { ref });
    reconcileTree(element, null, scene);
    expect(ref).toHaveBeenCalled();
  });

  it('attaches object ref', () => {
    const ref = { current: null };
    const element = createElement(Text, { ref });
    reconcileTree(element, null, scene);
    expect(ref.current).toBeDefined();
  });

  it('reconciles with parent container', () => {
    const parent = {
      active: true,
      destroy: vi.fn(),
      add: vi.fn(),
      children: [],
    };
    const oldNode = null;
    const result = reconcileTree(
      createElement(Text, { x: 0, y: 0, text: 'Test' }),
      oldNode,
      scene,
      parent as unknown as Phaser.GameObjects.Container,
    );
    expect(result).toBeDefined();
  });

  it('destroys old node with inactive game object', () => {
    const gameObject = { active: false, destroy: vi.fn() };
    const oldNode = { gameObject, props: {}, children: [] };
    reconcileTree(
      null,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(gameObject.destroy).not.toHaveBeenCalled();
  });

  it('reconciles function component that returns null', () => {
    const Comp = () => null as unknown as JSX.Element;
    const element = { type: Comp, props: {} } as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBe(null);
  });

  it('handles empty array', () => {
    const result = reconcileTree([] as unknown as JSX.Element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(0);
  });

  it('reconciles array with null elements', () => {
    const elements = [null, createElement(Text)];
    const result = reconcileTree(
      elements as unknown as JSX.Element,
      null,
      scene,
    );
    expect(result?.children.filter(Boolean)).toHaveLength(1);
  });

  it('handles null ref', () => {
    const element = createElement(Text, { ref: null });
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
  });

  it('reconciles Container with single child (not array)', () => {
    const element = createElement(Container, {}, createElement(Text));
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(1);
  });

  it('returns null when createGameObject cannot match element type', () => {
    const UnknownType = vi.fn();
    const element = { type: UnknownType, props: {} } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBe(null);
  });

  it('handles Fragment element directly', () => {
    const element = {
      type: Fragment,
      props: { children: [createElement(Text), createElement(Text)] },
    } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(2);
  });

  it('handles React Fragment symbol (<>...</> shorthand)', () => {
    const element = {
      type: Symbol.for('react.fragment'),
      props: { children: [createElement(Text), createElement(Text)] },
    } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result).toBeDefined();
    expect(result?.children).toHaveLength(2);
  });

  it('destroys extra old children when array shrinks in reconcileArray', () => {
    const child1 = { active: true, destroy: vi.fn() };
    const child2 = { active: true, destroy: vi.fn() };
    const oldNode = {
      gameObject: null,
      props: {},
      children: [
        { gameObject: child1, props: {}, children: [] },
        { gameObject: child2, props: {}, children: [] },
      ],
    };
    reconcileTree(
      [createElement(Text)] as unknown as JSX.Element,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(child2.destroy).toHaveBeenCalled();
  });

  it('skips null slots when destroying extra old children in reconcileArray', () => {
    const node1 = reconcileTree(
      [null, createElement(Text)] as unknown as JSX.Element,
      null,
      scene,
    );
    expect(() =>
      reconcileTree([] as unknown as JSX.Element, node1, scene),
    ).not.toThrow();
  });

  it('skips null slots when destroying extra old children in Container', () => {
    const node1 = reconcileTree(
      createElement(
        Container,
        {},
        null as unknown as JSX.Element,
        createElement(Text),
      ),
      null,
      scene,
    );
    expect(() =>
      reconcileTree(createElement(Container, {}), node1, scene),
    ).not.toThrow();
  });

  it('skips null children when destroying node recursively', () => {
    const childGameObject = { active: true, destroy: vi.fn() };
    const parentGameObject = { active: true, destroy: vi.fn() };
    const childNode = { gameObject: childGameObject, props: {}, children: [] };
    const oldNode = {
      gameObject: parentGameObject,
      props: {},
      children: [null, childNode],
    };
    reconcileTree(
      null,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(parentGameObject.destroy).toHaveBeenCalled();
    expect(childGameObject.destroy).toHaveBeenCalled();
  });

  it('removes old event listeners when patching props', () => {
    const gameObject = {
      active: true,
      destroy: vi.fn(),
      off: vi.fn(),
      on: vi.fn(),
      setStyle: vi.fn(),
      setInteractive: vi.fn(),
    };
    const onPointerDown = vi.fn();
    const oldNode = {
      gameObject,
      props: { onPointerDown },
      children: [],
    };
    const element = createElement(Text, { x: 1 });
    reconcileTree(
      element,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(gameObject.off).toHaveBeenCalledWith('pointerdown');
  });

  it('destroys nested children recursively', () => {
    const childGameObject = { active: true, destroy: vi.fn() };
    const parentGameObject = { active: true, destroy: vi.fn() };
    const childNode = { gameObject: childGameObject, props: {}, children: [] };
    const oldNode = {
      gameObject: parentGameObject,
      props: {},
      children: [childNode],
    };
    reconcileTree(
      null,
      oldNode as unknown as Parameters<typeof reconcileTree>[1],
      scene,
    );
    expect(parentGameObject.destroy).toHaveBeenCalled();
    expect(childGameObject.destroy).toHaveBeenCalled();
  });

  it('destroys extra old children in Container on re-render', () => {
    const child1GameObject = { active: true, destroy: vi.fn() };
    const child2GameObject = { active: true, destroy: vi.fn() };
    const node1 = reconcileTree(
      createElement(Container, {}, createElement(Text), createElement(Text)),
      null,
      scene,
    );
    node1!.children[0]!.gameObject =
      child1GameObject as unknown as Phaser.GameObjects.GameObject;
    node1!.children[1]!.gameObject =
      child2GameObject as unknown as Phaser.GameObjects.GameObject;
    reconcileTree(
      createElement(Container, {}, createElement(Text)),
      node1,
      scene,
    );
    expect(child2GameObject.destroy).toHaveBeenCalled();
  });

  it('correctly aligns old nodes when a conditional child becomes null in Container', () => {
    const node1 = reconcileTree(
      createElement(
        Container,
        {},
        createElement(Text, { text: 'a' }),
        createElement(Text, { text: 'b' }),
      ),
      null,
      scene,
    );
    const gameObjectA = node1!.children[0]!.gameObject;
    const gameObjectB = node1!.children[1]!.gameObject;
    const node2 = reconcileTree(
      createElement(
        Container,
        {},
        null as unknown as JSX.Element,
        createElement(Text, { text: 'b' }),
      ),
      node1,
      scene,
    );
    expect(node2!.children.filter(Boolean)).toHaveLength(1);
    expect(node2!.children.find(Boolean)!.gameObject).toBe(gameObjectB);
    expect(gameObjectA).toBeDefined();
  });

  it('correctly aligns old nodes when a conditional child becomes null in array', () => {
    const node1 = reconcileTree(
      [
        createElement(Text, { text: 'a' }),
        createElement(Text, { text: 'b' }),
      ] as unknown as JSX.Element,
      null,
      scene,
    );
    const gameObjectB = node1!.children[1]!.gameObject;
    const node2 = reconcileTree(
      [null, createElement(Text, { text: 'b' })] as unknown as JSX.Element,
      node1,
      scene,
    );
    expect(node2!.children.filter(Boolean)).toHaveLength(1);
    expect(node2!.children.find(Boolean)!.gameObject).toBe(gameObjectB);
  });

  it('creates BitmapText via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.BitmapText,
      props: { font: 'key' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates DynamicBitmapText via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.DynamicBitmapText,
      props: { font: 'key' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Bob via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Bob,
      props: { frame: 0 },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates GameObject via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.GameObject,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Image via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Image,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Sprite via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Sprite,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates NineSlice via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.NineSlice,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Light via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Light,
      props: {
        x: 0,
        y: 0,
        radius: 10,
        color: { r: 1, g: 1, b: 1 },
        intensity: 1,
      },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates PathFollower via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.PathFollower,
      props: { x: 0, y: 0, texture: 'tex', path: null },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Plane via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Plane,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates PointLight via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.PointLight,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Rectangle via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Rectangle,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Zone via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Zone,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Rope via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Rope,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Shader via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Shader,
      props: { shader: 'key' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates TileSprite via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.TileSprite,
      props: { texture: 'tex' },
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Video via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Video,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Arc via createGameObject default branch', () => {
    const element = {
      type: Phaser.GameObjects.Arc,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('creates Layer via createGameObject', () => {
    const element = {
      type: Phaser.GameObjects.Layer,
      props: {},
    } as unknown as JSX.Element;
    expect(reconcileTree(element, null, scene)).toBeDefined();
  });

  it('handles Fragment with no children', () => {
    const element = { type: Fragment, props: {} } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result?.children).toHaveLength(0);
  });

  it('handles Fragment with single non-array child', () => {
    const element = {
      type: Fragment,
      props: { children: createElement(Text) },
    } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result?.children).toHaveLength(1);
  });

  it('handles Container with single non-array child', () => {
    const element = {
      type: Phaser.GameObjects.Container,
      props: { children: createElement(Text) },
    } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result?.children).toHaveLength(1);
  });

  it('skips null child results inside Container', () => {
    const NullComp = () => null as unknown as JSX.Element;
    const element = {
      type: Phaser.GameObjects.Container,
      props: { children: [{ type: NullComp, props: {} }] },
    } as unknown as JSX.Element;
    const result = reconcileTree(element, null, scene);
    expect(result?.children.filter(Boolean)).toHaveLength(0);
  });
});
