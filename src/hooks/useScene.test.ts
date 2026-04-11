import { Scene } from 'phaser';

import { getScene } from '../helpers';
import { useScene } from './useScene';

vi.mock('../helpers/scene', () => ({
  getScene: vi.fn(),
}));

const mockedGetScene = vi.mocked(getScene);

it('returns scene', () => {
  const scene = new Scene();
  mockedGetScene.mockReturnValueOnce(scene);
  expect(useScene()).toEqual(scene);
  expect(mockedGetScene).toHaveBeenCalledTimes(1);
});

it('returns undefined', () => {
  expect(useScene<undefined>()).toEqual(undefined);
});
