import { Scene } from 'phaser';

import { getScene } from '../helpers';
import { useScene } from './useScene';

jest.mock('../helpers/scene', () => ({
  getScene: jest.fn(),
}));

const mockedGetScene = jest.mocked(getScene);

it('returns scene', () => {
  const scene = new Scene();
  mockedGetScene.mockReturnValueOnce(scene);
  expect(useScene()).toEqual(scene);
  expect(mockedGetScene).toHaveBeenCalledTimes(1);
});
