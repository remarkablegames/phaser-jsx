import Phaser from 'phaser';
import type { JSX } from 'react';

import { Container, createElement, createRef, useRef } from '../../src';
import { setScene } from '../../src/helpers';
import { render } from '../../src/render/render';

vi.mock('phaser', () => {
  const GameObject = vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Scene = vi.fn(function Scene(this: any) {
    this.add = { existing: vi.fn() };
  });
  return {
    __esModule: true,
    default: {
      GameObjects: {
        Container: GameObject,
        GameObject,
        Particles: {},
      },
      Scene,
    },
    GameObjects: {
      Container: GameObject,
      GameObject,
      Particles: {},
    },
    Scene,
  };
});

vi.mock('../../src/helpers/scene', async () => {
  const { addGameObject } = (await vi.importActual(
    '../../src/render/gameobject',
  )) as { addGameObject: (...args: unknown[]) => void };

  const setScene = vi.fn();
  const setRenderContext = vi.fn();
  return {
    getScene: vi.fn(),
    setScene,
    createRenderContext: vi.fn(
      (element, scene, componentFn, componentProps) => ({
        state: new Map(),
        scene,
        rootElement: element,
        componentFn,
        componentProps,
        gameObjectTree: null,
        getStateIndex: vi.fn(),
        getNextStateIndex: vi.fn(),
        resetStateIndex: vi.fn(),
        rerender: () => {
          if (componentFn && componentProps) {
            const newElement = componentFn(componentProps);
            addGameObject(newElement, scene);
          } else {
            addGameObject(element, scene);
          }
        },
      }),
    ),
    setRenderContext,
    getRenderContext: vi.fn(() => ({
      state: new Map(),
      scene: null,
      rootElement: null,
      componentFn: null,
      componentProps: null,
      gameObjectTree: null,
      getStateIndex: vi.fn(),
      getNextStateIndex: vi.fn(),
      resetStateIndex: vi.fn(),
      rerender: vi.fn(),
    })),
    resetRenderContext: vi.fn(),
  };
});

function createMockScene() {
  return new Phaser.Scene() as Phaser.Scene & {
    add: { existing: ReturnType<typeof vi.fn> };
  };
}

it('does not render invalid element to the scene', () => {
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const element = {} as JSX.Element;
  const scene = createMockScene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).not.toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});

it('renders element to the scene', () => {
  const element = createElement(Container);
  const scene = createMockScene();
  expect(render(element, scene)).toBe(undefined);
  expect(scene.add.existing).toHaveBeenCalledTimes(1);
  expect(setScene).toHaveBeenCalledWith(scene);
});

describe.each([createRef, useRef])('%s', (refFunction) => {
  it('renders element with ref to the scene', () => {
    const scene = createMockScene();
    const ref = refFunction<Phaser.GameObjects.Container>();
    expect(render(<Container ref={ref} />, scene)).toBe(undefined);
    expect(scene.add.existing).toHaveBeenCalledTimes(1);
    expect(setScene).toHaveBeenCalledWith(scene);
    expect(ref).toEqual({ current: expect.any(Container) });
  });
});

it('renders function component to the scene', () => {
  const Comp = () => createElement(Container);
  const scene = createMockScene();
  expect(render(<Comp />, scene)).toBe(undefined);
  expect(scene.add.existing).toHaveBeenCalledTimes(1);
});

it('rerenders function component with updated props', () => {
  const Comp = (props: { count: number }) =>
    createElement(Container, { count: props.count });
  const scene = createMockScene();
  expect(render(<Comp count={0} />, scene)).toBe(undefined);
  expect(scene.add.existing).toHaveBeenCalledTimes(1);
});
