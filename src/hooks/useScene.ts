import { getScene } from '../helpers';

/**
 * `useScene` is a hook that retrieves the current Scene.
 *
 * Don't use this hook if you start multiple Scenes.
 *
 * @returns Phaser.Scene
 */
export function useScene() {
  return getScene();
}
