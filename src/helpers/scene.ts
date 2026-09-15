import type { Scene } from 'phaser';

let _scene: Scene;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function getScene<Type = Scene>(): Type {
  return _scene as Type;
}

export function setScene(scene: Scene): void {
  _scene = scene;
}
