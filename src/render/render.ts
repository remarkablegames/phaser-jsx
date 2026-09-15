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
  const componentType = element.type as JSX.ElementType;
  let componentFn: ((...args: unknown[]) => JSX.Element) | null = null;
  let componentProps: Record<string, unknown> | null = null;

  if (typeof componentType === 'function') {
    const { prototype } = componentType as {
      prototype?: { constructor?: unknown };
    };
    if (prototype?.constructor !== componentType) {
      // Function component
      componentFn = componentType as (...args: unknown[]) => JSX.Element;
      componentProps = element.props as Record<string, unknown>;
    }
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
