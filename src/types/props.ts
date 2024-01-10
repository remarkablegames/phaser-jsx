import type { JSX } from 'react';

import type { Events, GameObject, RecursivePartial, Ref } from '.';

type RefCallback<Type> = (gameObject: Type) => void;

interface ObjectProps<Type> extends Partial<Events> {
  children?: JSX.Element | JSX.Element[] | null;
  ref?: RefCallback<Type> | Ref<Type>;
}

export type GameObjectProps<Type = GameObject> = ObjectProps<Type> &
  RecursivePartial<Type>;

export type Props = Record<string, unknown>;
