import type { Props } from '../types';

/**
 * Attaches game object ref.
 *
 * @param gameObject - Phaser game object.
 * @param ref - Ref callback.
 */
export function attachRef(
  gameObject: Phaser.GameObjects.GameObject,
  ref: Props['ref'],
) {
  if (typeof ref === 'function') {
    ref(gameObject);
  }
}
