/**
 * Checks whether a value is an element.
 *
 * @param value - The `value` you want to check. It can be any a value of any type.
 * @returns - Returns `true` if the `value` is an element. Otherwise, it returns `false`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidElement(value: any) {
  if (
    value === null ||
    ['undefined', 'boolean', 'number', 'string'].includes(typeof value)
  ) {
    return false;
  }

  if (typeof value !== 'object') {
    // eslint-disable-next-line no-console
    console.warn(
      `Invalid JSX element. Expected an object but got: ${String(value)}`,
    );
    return false;
  }

  if (typeof value.type !== 'function') {
    // eslint-disable-next-line no-console
    console.warn(
      `Invalid JSX type. Expected a class or function but got: ${value.type}`,
    );
    return false;
  }

  return true;
}
