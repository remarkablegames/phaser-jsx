import type { Scene } from 'phaser';

let _scene: Scene;

export function getScene() {
  return _scene;
}

export function setScene(scene: Scene) {
  _scene = scene;
}
