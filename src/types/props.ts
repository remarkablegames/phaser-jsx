import type { JSX } from 'react';

import type { Events, GameObject, RecursivePartial } from '.';

interface ObjectProps<Type> extends Partial<Events> {
  children?: JSX.Element | JSX.Element[] | null;
  ref?: (gameObject: Type) => void;
}

export type GameObjectProps<Type = GameObject> = ObjectProps<Type> &
  RecursivePartial<Type>;

export type Props = Record<string, unknown>;
