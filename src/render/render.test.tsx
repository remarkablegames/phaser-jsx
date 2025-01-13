import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, createElement, createRef, useRef } from '..';
import { setScene } from '../helpers';
import { render } from './render';

jest.mock('phaser', () => {
  const GameObject = jest.fn();
  return {
    GameObjects: {
      Container: GameObject,
      GameObject,
      Particles: {},
    },
    Scene: jest.fn(() => ({
      add: {
        existing: jest.fn(),
      },
    })),
  };
});

jest.mock('../helpers/scene', () => ({
  setScene: jest.fn(),
}));

it('does not render invalid element to the scene', () => {
  const spy = jest.spyOn(console, 'warn').mockImplementation();
  const element = {} as JSX.Element;
  const scene = new Phaser.Scene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).not.toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});

it('renders element to the scene', () => {
  const element = createElement(Container);
  const scene = new Phaser.Scene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).toHaveBeenCalledTimes(1);
  expect(setScene).toHaveBeenCalledWith(scene);
});

describe.each([createRef, useRef])('%p', (refFunction) => {
  it('renders element with ref to the scene', () => {
    const scene = new Phaser.Scene();
    const ref = refFunction<Phaser.GameObjects.Container>();
    expect(render(<Container ref={ref} />, scene)).toBe(undefined);
    expect(scene.add.existing).toHaveBeenCalledTimes(1);
    expect(setScene).toHaveBeenCalledWith(scene);
    expect(ref).toEqual({ current: expect.any(Container) });
  });
});
