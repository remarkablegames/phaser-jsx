export type RecursivePartial<Type> = {
  [Property in keyof Type]?: Type[Property] extends object
    ? RecursivePartial<Type[Property]>
    : Type[Property];
};
