import type { ReactNode, RefObject } from 'react';

import type { Events, GameObject, RecursivePartial } from '.';

type RefCallback<Type> = (gameObject: Type) => void;

interface ObjectProps<Type> extends Partial<Events> {
  children?: ReactNode;
  ref?: RefCallback<Type> | RefObject<Type | null>;
}

export type GameObjectProps<Type = GameObject> = ObjectProps<Type> &
  RecursivePartial<Type>;

export type Props = Record<string, unknown>;
