/**
 * Checks whether a value is an element.
 *
 * @param value - The `value` you want to check. It can be any a value of any type.
 * @returns - Returns `true` if the `value` is an element. Otherwise, it returns `false`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidElement(value: any) {
  const valueType = typeof value;

  switch (true) {
    case value === null:
    case value === undefined:
    case valueType === 'boolean':
    case valueType === 'number':
    case valueType === 'string':
      return false;

    case valueType !== 'object':
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid JSX element. Expected an object but got: ${String(value)}`,
      );
      return false;

    case typeof value.type !== 'function':
      // eslint-disable-next-line no-console
      console.warn(
        `Invalid JSX type. Expected a class or function but got: ${typeof value.type === 'symbol' ? 'Symbol' : value.type}`,
      );
      return false;

    default:
      return true;
  }
}
