import { Scene } from 'phaser';

import { getScene, setScene } from './scene';

const scene = new Scene();

afterEach(() => {
  setScene(undefined as unknown as Scene);
});

describe('getScene', () => {
  it('gets scene', () => {
    expect(getScene<typeof scene>()).toEqual(undefined);
  });
});

describe('setScene', () => {
  it('sets scene', () => {
    expect(setScene(scene)).toEqual(undefined);
    expect(getScene()).toEqual(scene);
  });
});
