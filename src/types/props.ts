import type { JSX } from 'react';

import type { Events } from './events';
import type { GameObject } from './phaser';

export interface Props extends Partial<Events> {
  children?: JSX.Element | JSX.Element[] | null;
  ref?: (gameObject: GameObject) => void;
}
