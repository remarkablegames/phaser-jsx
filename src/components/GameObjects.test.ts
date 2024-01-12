import Phaser from 'phaser';

import type { Props } from '../types';
import * as GameObjects from './GameObjects';

const keys = Object.keys(Phaser.GameObjects).filter(
  (key) =>
    typeof (Phaser.GameObjects as Record<string, unknown>)[key] ===
      'function' &&
    ![
      'GetCalcMatrix',
      'BuildGameObject',
      'BuildGameObjectAnimation',
      'GetTextSize',
      'MeasureText',
      'Sprite3D',
    ].includes(key),
);

it.each(keys)('exports %p', (key) => {
  expect((GameObjects as Props)[key]).toBe((Phaser.GameObjects as Props)[key]);
});

it('exports GameObjects', () => {
  expect(GameObjects).toMatchSnapshot();
});
