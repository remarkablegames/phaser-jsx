import { getRenderContext } from '../helpers';

/**
 * A hook that lets you run a side effect after render.
 *
 * The callback runs after each render where the dependencies have changed.
 * If the callback returns a function, that function is called as cleanup
 * before the next effect run or when the context is destroyed.
 *
 * @param callback - The effect to run. May return a cleanup function.
 * @param deps - Optional dependency array. If omitted, runs after every render.
 *   Pass an empty array to run only once on mount.
 */
export function useEffect(
  callback: () => (() => void) | void,
  deps?: unknown[],
): void {
  const context = getRenderContext();
  const key = context.getNextEffectIndex();
  context.pendingEffects.push({ key, callback, deps });
}
