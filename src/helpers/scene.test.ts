import { Scene } from 'phaser';

import { getScene, setScene } from './scene';

const scene = new Scene();

afterEach(() => {
  setScene(undefined as unknown as Scene);
});

it('sets and gets scene', () => {
  expect(getScene()).toEqual(undefined);
  expect(setScene(scene)).toEqual(undefined);
  expect(getScene()).toEqual(scene);
});
