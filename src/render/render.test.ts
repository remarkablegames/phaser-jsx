import Phaser from 'phaser';

import { Container, createElement } from '..';
import { render } from './render';

jest.mock('phaser', () => {
  const GameObject = jest.fn();
  return {
    GameObjects: {
      Container: GameObject,
      GameObject,
      Particles: {},
    },
    Scene: jest.fn(() => ({
      add: {
        existing: jest.fn(),
      },
    })),
  };
});

it('does not render element into the scene', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();
  const element = {} as JSX.Element;
  const scene = new Phaser.Scene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).not.toBeCalled();
  expect(spy).toBeCalledTimes(1);
  spy.mockRestore();
});

it('renders element into the scene', () => {
  const element = createElement(Container);
  const scene = new Phaser.Scene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).toBeCalledTimes(1);
});
