export type RecursivePartial<Type> = {
  [Property in keyof Type]?: RecursivePartial<Type[Property]>;
};
