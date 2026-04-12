import Phaser from 'phaser';

import { setProps, skipPropKeys } from '../../src/render/props';

vi.mock('phaser', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Sprite = vi.fn(function Sprite(this: any) {
    this.originX = undefined as number | undefined;
    this.originY = undefined as number | undefined;
  });

  Sprite.prototype.setOrigin = function setOrigin(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: any,
    originX?: number,
    originY?: number,
  ) {
    this.originX = originX;
    this.originY = originY;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Text = vi.fn(function Text(this: any) {
    this.text = '';
  });

  Text.prototype.setStyle = vi.fn();

  return {
    __esModule: true,
    default: {
      GameObjects: {
        Container: vi.fn(),
        GameObject: vi.fn(),
        Sprite,
        Text,
      },
      Scene: vi.fn(),
    },
    GameObjects: {
      Container: vi.fn(),
      GameObject: vi.fn(),
      Sprite,
      Text,
    },
    Scene: vi.fn(),
  };
});

const scene = new Phaser.Scene();

it('does not set empty props', () => {
  const gameObject = new Phaser.GameObjects.Container(scene);
  const props = {};
  expect(setProps(gameObject, props, scene)).toBe(undefined);
});

it('does not set invalid props', () => {
  const gameObject = new Phaser.GameObjects.Container(scene);
  const props = { invalid: 'invalid' };
  expect(setProps(gameObject, props, scene)).toBe(undefined);
  expect(JSON.stringify(gameObject)).toBe('{}');
});

describe('skip prop keys', () => {
  it.each(skipPropKeys)('does not set prop %s', (key) => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = { [key]: 'skip' };
    expect(setProps(gameObject, props, scene)).toBe(undefined);
    expect(JSON.stringify(gameObject)).toBe('{}');
  });
});

describe('data', () => {
  it('sets prop data', () => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = {
      data: {
        foo: 'bar',
        baz: false,
      },
    };

    gameObject.setData = vi.fn();
    expect(setProps(gameObject, props, scene)).toBe(undefined);

    expect(gameObject.setData).toHaveBeenCalledTimes(1);
    expect(gameObject.setData).toHaveBeenCalledWith(props.data);
  });
});

describe('input', () => {
  it('sets prop onPointerDown', () => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = {
      onPointerDown: vi.fn(),
    };

    gameObject.setInteractive = vi.fn();
    gameObject.on = vi.fn();
    expect(setProps(gameObject, props, scene)).toBe(undefined);

    expect(gameObject.setInteractive).toHaveBeenCalledTimes(1);
    expect(gameObject.setInteractive).toHaveBeenCalledWith(undefined);
    expect(gameObject.on).toHaveBeenCalledTimes(1);
    expect(gameObject.on).toHaveBeenCalledWith(
      'pointerdown',
      props.onPointerDown,
      scene,
    );
  });

  it('sets props onPointerOver and input', () => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = {
      onPointerOver: vi.fn(),
      input: { cursor: 'pointer' },
    };

    gameObject.setInteractive = vi.fn();
    gameObject.on = vi.fn();
    expect(setProps(gameObject, props, scene)).toBe(undefined);

    expect(gameObject.setInteractive).toHaveBeenCalledTimes(1);
    expect(gameObject.setInteractive).toHaveBeenCalledWith(props.input);
    expect(gameObject.on).toHaveBeenCalledTimes(1);
    expect(gameObject.on).toHaveBeenCalledWith(
      'pointerover',
      props.onPointerOver,
      scene,
    );
  });
});

it('sets prop width and height', () => {
  const gameObject = new Phaser.GameObjects.Container(scene);
  const props = {
    width: 100,
    height: 200,
  };

  gameObject.width = 0;
  gameObject.height = 0;
  expect(setProps(gameObject, props, scene)).toBe(undefined);

  expect(gameObject).toMatchObject(props);
});

it.each([
  { originX: 0, originY: 0 },
  { originX: 1, originY: 1 },
  { originX: 0, originY: 1 },
  { originX: 1, originY: 0 },
  { originX: undefined, originY: 0 },
  { originX: 0, originY: undefined },
  { originX: undefined, originY: undefined },
])('sets prop %s', (props) => {
  const gameObject = new Phaser.GameObjects.Sprite(scene, 0, 0, 'texture');
  expect(setProps(gameObject, props, scene)).toBe(undefined);
  expect(gameObject).toMatchObject(props);
});

describe('style', () => {
  it('calls setStyle on Text game object', () => {
    const gameObject = new Phaser.GameObjects.Text(scene, 0, 0, 'Hello', {});
    const props = {
      style: { fontSize: '16px', color: '#fff' },
    };
    setProps(gameObject, props, scene);
    expect(gameObject.setStyle).toHaveBeenCalledWith(props.style);
  });

  it('does not call setStyle on non-Text game object', () => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = {
      style: { fontSize: '16px' },
    };
    // Should not throw, just skip
    expect(() => setProps(gameObject, props, scene)).not.toThrow();
  });
});
