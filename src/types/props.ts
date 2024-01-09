import type { JSX } from 'react';

import type { Events } from './events';
import type { GameObject } from './phaser';

export interface GameObjectProps<Type = GameObject> extends Partial<Events> {
  children?: JSX.Element | JSX.Element[] | null;
  ref?: (gameObject: Type) => void;
}

export type Props = Record<string, unknown>;
