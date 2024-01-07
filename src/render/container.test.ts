import Phaser from 'phaser';

import { createContainer } from './container';

jest.mock('phaser', () => ({
  GameObjects: {
    Container: jest.fn(),
  },
  Scene: jest.fn(),
}));

it('creates container', () => {
  const scene = new Phaser.Scene();
  expect(createContainer(scene)).toBeTruthy();
  expect(Phaser.GameObjects.Container).toBeCalledTimes(1);
  expect(Phaser.GameObjects.Container).toBeCalledWith(scene);
});
