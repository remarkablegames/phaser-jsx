import Phaser from 'phaser';

import type { Props } from '../types';
import * as GameObjects from './GameObjects';

const names = Object.keys(GameObjects).filter(
  (name) => name !== 'ParticleEmitter',
);

it.each(names)('exports %s', (name) => {
  expect((GameObjects as Props)[name]).toBe(
    (Phaser.GameObjects as Props)[name],
  );
});

it('exports GameObjects', () => {
  expect(GameObjects).toMatchSnapshot();
});
