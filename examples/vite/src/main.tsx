import Phaser from 'phaser';

import { render, Text } from '../../../src';

new Phaser.Game({
  scene: {
    create() {
      render(<Text text="Hello, world!" />, this);
    },
  },
});
