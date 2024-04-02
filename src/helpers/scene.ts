import type { Scene } from 'phaser';

let _scene: Scene;

export function getScene<Type = Scene>() {
  return _scene as Type;
}

export function setScene(scene: Scene) {
  _scene = scene;
}
