import { getRenderContext } from '../helpers';

/**
 * A hook that lets you manage state for your game object.
 *
 * When the state is updated via the setter, it triggers a re-render
 * of the associated game object.
 *
 * @param initialValue - The initial value for the state.
 * @returns - An array with the current state value and a setter function.
 */
export function useState<Type>(
  initialValue: Type,
): [Type, (value: Type | ((prev: Type) => Type)) => void] {
  const context = getRenderContext();
  const key = context.getNextStateIndex();

  // Initialize state if not already set
  if (!context.state.has(key)) {
    context.state.set(key, initialValue);
  }

  const value = context.state.get(key) as Type;

  function setValue(newValue: Type | ((prev: Type) => Type)): void {
    const resolvedValue =
      typeof newValue === 'function'
        ? (newValue as (prev: Type) => Type)(value)
        : newValue;
    context.state.set(key, resolvedValue);
    context.rerender();
  }

  return [value, setValue];
}
