import type { Scene } from 'phaser';

let _scene: Scene;

export function getScene<Type = Scene>(): Type {
  return _scene as Type;
}

export function setScene(scene: Scene): void {
  _scene = scene;
}
