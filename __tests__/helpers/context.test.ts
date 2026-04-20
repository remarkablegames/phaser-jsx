import { Scene } from 'phaser';

import {
  createRenderContext,
  setRenderContext,
} from '../../src/helpers/context';
import { reconcileTree } from '../../src/render/reconcile';

vi.mock('../../src/render/reconcile', () => ({
  reconcileTree: vi.fn(() => null),
}));

const scene = new Scene();

describe('createRenderContext', () => {
  describe('flushEffects', () => {
    it('returns early when called while already rendering (re-entrancy guard)', () => {
      const context = createRenderContext();
      setRenderContext(context);

      let reentrantCallCount = 0;
      context.pendingEffects.push({
        key: 0,
        callback: () => {
          reentrantCallCount++;
          context.flushEffects();
        },
        deps: undefined,
      });

      context.flushEffects();

      expect(reentrantCallCount).toBe(1);
    });

    it('schedules a deferred flushEffects via setTimeout when effects are queued during rendering and try block throws', () => {
      vi.useFakeTimers();
      const context = createRenderContext();
      setRenderContext(context);

      const deferred = vi.fn();
      context.pendingEffects.push({
        key: 0,
        callback: () => {
          context.pendingEffects.push({
            key: 1,
            callback: deferred,
            deps: undefined,
          });
          context.flushEffects();
          throw new Error('effect error');
        },
        deps: undefined,
      });

      let caughtError: unknown;
      try {
        context.flushEffects();
      } catch (error) {
        caughtError = error;
      }

      expect(caughtError).toBeInstanceOf(Error);
      context.pendingEffects.splice(0, 1);
      vi.runAllTimers();
      expect(deferred).toHaveBeenCalledTimes(1);
      vi.useRealTimers();
    });
  });

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
