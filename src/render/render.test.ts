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
    Scene: jest.fn(),
  };
});

const mockContainerAdd = jest.fn();

jest.mock('./container', () => ({
  createContainer: jest.fn(() => ({
    add: mockContainerAdd,
  })),
}));

it('renders element into the scene', () => {
  const scene = new Phaser.Scene();
  scene.add = {} as Phaser.GameObjects.GameObjectFactory;
  scene.add.existing = jest.fn();
  const element = createElement(Container);
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).toBeCalledTimes(1);
  expect(mockContainerAdd).toBeCalled();
});
