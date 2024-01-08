import type { JSX } from 'react';

import type { Events } from './events';
import type { GameObject } from './phaser';

export interface GameObjectProps extends Partial<Events> {
  children?: JSX.Element | JSX.Element[] | null;
  ref?: (gameObject: GameObject) => void;
}

export type Props = Record<string, unknown>;
