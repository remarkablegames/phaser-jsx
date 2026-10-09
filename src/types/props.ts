import type { ReactNode, RefObject } from 'react';

import type {
  Events,
  GameObject,
  InputConfiguration,
  RecursivePartial,
} from '.';

type RefCallback<Type> = (gameObject: Type) => void;

interface ObjectProps<Type> extends Partial<Events> {
  children?: ReactNode;
  ref?: RefCallback<Type> | RefObject<Type | null>;
  /**
   * Input configuration for the GameObject.
   * This is passed to `setInteractive()` at runtime.
   */
  input?: InputConfiguration | null;
}

export type GameObjectProps<Type = GameObject> = Omit<
  RecursivePartial<Type>,
  'input'
> &
  ObjectProps<Type>;

export type Props = Record<string, unknown>;
