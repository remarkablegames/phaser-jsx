/**
 * Checks whether a value is an element.
 *
 * @param value - The `value` you want to check. It can be a value of any type.
 * @returns - Returns `true` if the `value` is an element. Otherwise, it returns `false`.
 */
export function isValidElement(value: unknown) {
  if (value === null || value === undefined) {
    return false;
  }

  const valueType = typeof value;

  if (
    valueType === 'boolean' ||
    valueType === 'number' ||
    valueType === 'string'
  ) {
    return false;
  }

  if (valueType !== 'object') {
    // eslint-disable-next-line no-console
    console.warn(
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      `Invalid JSX element. Expected an object but got: ${String(value)}`,
    );
    return false;
  }

  const type = (value as { type?: unknown }).type;

  if (typeof type !== 'function') {
    // eslint-disable-next-line no-console
    console.warn(
      `Invalid JSX type. Expected a class or function but got: ${String(type)}`,
    );
    return false;
  }

  return true;
}
