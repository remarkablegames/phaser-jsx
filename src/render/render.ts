import Phaser from 'phaser';
import type { JSX } from 'react';

import { createRenderContext, setRenderContext, setScene } from '../helpers';

/**
 * Renders a piece of JSX into a Phaser scene.
 *
 * @param element - Element that you want to display.
 * @param scene - Phaser scene.
 */
export function render(element: JSX.Element, scene: Phaser.Scene) {
  setScene(scene);

  // Detect if element is a function component for re-rendering
  let componentFn: ((...args: unknown[]) => JSX.Element) | null = null;
  let componentProps: Record<string, unknown> | null = null;

  if (
    typeof element?.type === 'function' &&
    element.type.prototype?.constructor !== element.type
  ) {
    // Function component
    componentFn = element.type as (...args: unknown[]) => JSX.Element;
    componentProps = element.props as Record<string, unknown>;
  }

  const context = createRenderContext(
    element,
    scene,
    componentFn,
    componentProps,
  );
  setRenderContext(context);

  // Use rerender for initial render (gameObjectTree starts as null)
  context.rerender();
}
