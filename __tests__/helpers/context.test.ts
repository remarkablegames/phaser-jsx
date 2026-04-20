import { Scene } from 'phaser';

import { createRenderContext } from '../../src/helpers/context';
import { reconcileTree } from '../../src/render/reconcile';

vi.mock('../../src/render/reconcile', () => ({
  reconcileTree: vi.fn(() => null),
}));

const scene = new Scene();

describe('createRenderContext', () => {
  it('resetStateIndex resets state index to 0', () => {
    const context = createRenderContext();
    context.getNextStateIndex();
    context.getNextStateIndex();
    context.resetStateIndex();
    expect(context.getNextStateIndex()).toBe(0);
  });

  it('rerender calls componentFn when componentFn, componentProps, and scene are set', () => {
    const componentFn = vi.fn((): null => null) as unknown as Parameters<
      typeof createRenderContext
    >[2];
    const componentProps = { x: 1 };
    const context = createRenderContext(
      null,
      scene,
      componentFn,
      componentProps,
    );
    context.rerender();
    expect(componentFn).toHaveBeenCalledWith(componentProps);
  });

  it('rerender calls reconcileTree with element when only element and scene are set', () => {
    const element = { type: () => null, props: {} } as unknown as Parameters<
      typeof createRenderContext
    >[0];
    const context = createRenderContext(element, scene);
    context.rerender();
    expect(reconcileTree).toHaveBeenCalledWith(element, null, scene);
  });
});
