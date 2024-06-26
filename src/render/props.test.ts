import Phaser from 'phaser';

import { setProps, skipPropKeys } from './props';

jest.mock('phaser', () => ({
  GameObjects: {
    Container: jest.fn(),
    GameObject: jest.fn(),
    Sprite: jest.fn(() => ({
      originX: undefined as number | undefined,
      originY: undefined as number | undefined,
      setOrigin(originX?: number, originY?: number) {
        this.originX = originX;
        this.originY = originY;
      },
    })),
    Text: jest.fn(),
  },
  Scene: jest.fn(),
}));

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
  it.each(skipPropKeys)('does not set prop %p', (key) => {
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

    gameObject.setData = jest.fn();
    expect(setProps(gameObject, props, scene)).toBe(undefined);

    expect(gameObject.setData).toHaveBeenCalledTimes(1);
    expect(gameObject.setData).toHaveBeenCalledWith(props.data);
  });
});

describe('input', () => {
  it('sets prop onPointerDown', () => {
    const gameObject = new Phaser.GameObjects.Container(scene);
    const props = {
      onPointerDown: jest.fn(),
    };

    gameObject.setInteractive = jest.fn();
    gameObject.on = jest.fn();
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
      onPointerOver: jest.fn(),
      input: { cursor: 'pointer' },
    };

    gameObject.setInteractive = jest.fn();
    gameObject.on = jest.fn();
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
])('sets prop %p', (props) => {
  const gameObject = new Phaser.GameObjects.Sprite(scene, 0, 0, 'texture');
  expect(setProps(gameObject, props, scene)).toBe(undefined);
  expect(gameObject).toMatchObject(props);
});
