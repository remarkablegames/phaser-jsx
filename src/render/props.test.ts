import Phaser from 'phaser';

import { setProps } from './props';

jest.mock('phaser', () => ({
  GameObjects: {
    Container: jest.fn(),
    GameObject: jest.fn(),
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

it('sets prop style', () => {
  const gameObject = new Phaser.GameObjects.Text(scene, 1, 2, 'text', {
    fontFamily: 'Arial',
  });
  const props = {
    style: {
      fontSize: '42px',
    },
  };

  gameObject.setStyle = jest.fn();
  expect(setProps(gameObject, props, scene)).toBe(undefined);

  expect(gameObject.setStyle).toBeCalledTimes(1);
  expect(gameObject.setStyle).toBeCalledWith(props.style);
});

it('sets prop onPointerDown', () => {
  const gameObject = new Phaser.GameObjects.Container(scene);
  const props = {
    onPointerDown: () => {},
  };

  gameObject.setInteractive = jest.fn();
  gameObject.on = jest.fn();
  expect(setProps(gameObject, props, scene)).toBe(undefined);

  expect(gameObject.setInteractive).toBeCalledTimes(1);
  expect(gameObject.setInteractive).toBeCalledWith();
  expect(gameObject.on).toBeCalledTimes(1);
  expect(gameObject.on).toBeCalledWith(
    'pointerdown',
    props.onPointerDown,
    scene,
  );
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
