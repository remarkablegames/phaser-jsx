import Phaser from 'phaser';

import * as GameObjects from './GameObjects';

const names = Object.keys(GameObjects).filter(
  (name) => name !== 'ParticleEmitter',
);

it.each(names)('exports %s', (name) => {
  expect((GameObjects as Record<string, unknown>)[name]).toBe(
    (Phaser.GameObjects as Record<string, unknown>)[name],
  );
});

it('exports GameObjects', () => {
  expect(GameObjects).toMatchSnapshot();
});
