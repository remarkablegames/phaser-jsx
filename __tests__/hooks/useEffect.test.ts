import {
  createRenderContext,
  resetRenderContext,
  setRenderContext,
} from '../../src/helpers';
import { useEffect } from '../../src/hooks/useEffect';

afterEach(() => {
  resetRenderContext();
});

it('runs callback on mount', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('runs callback on every render when deps is undefined', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback);
  context.flushEffects();

  useEffect(callback);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(2);
});

it('runs callback only once when deps is empty array', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback, []);
  context.flushEffects();

  useEffect(callback, []);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('runs callback again when deps change', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback, [1]);
  context.flushEffects();

  useEffect(callback, [2]);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(2);
});

it('does not run callback when deps are unchanged', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback, [42, 'hello']);
  context.flushEffects();

  useEffect(callback, [42, 'hello']);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('runs cleanup before next effect when deps change', () => {
  const cleanup = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(() => cleanup, [1]);
  context.flushEffects();

  expect(cleanup).not.toHaveBeenCalled();

  useEffect(() => cleanup, [2]);
  context.flushEffects();

  expect(cleanup).toHaveBeenCalledTimes(1);
});

it('does not run cleanup when deps are unchanged', () => {
  const cleanup = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(() => cleanup, [1]);
  context.flushEffects();

  useEffect(() => cleanup, [1]);
  context.flushEffects();

  expect(cleanup).not.toHaveBeenCalled();
});

it('runs cleanup on resetRenderContext', () => {
  const cleanup = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(() => cleanup, []);
  context.flushEffects();

  resetRenderContext();

  expect(cleanup).toHaveBeenCalledTimes(1);
});

it('resetEffectIndex resets the effect index counter', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback, [1]);
  context.resetEffectIndex();
  context.pendingEffects.length = 0;

  useEffect(callback, [1]);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('re-runs effect when deps arrays have different lengths', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback, [1]);
  context.flushEffects();

  useEffect(callback, [1, 2]);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(2);
});

it('re-runs effect when previous deps were undefined', () => {
  const callback = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callback);
  context.flushEffects();

  useEffect(callback, [1]);
  context.flushEffects();

  expect(callback).toHaveBeenCalledTimes(2);
});

it('supports multiple independent effects by index', () => {
  const callbackA = vi.fn();
  const callbackB = vi.fn();
  const context = createRenderContext();
  setRenderContext(context);

  useEffect(callbackA, [1]);
  useEffect(callbackB, ['x']);
  context.flushEffects();

  useEffect(callbackA, [1]);
  useEffect(callbackB, ['y']);
  context.flushEffects();

  expect(callbackA).toHaveBeenCalledTimes(1);
  expect(callbackB).toHaveBeenCalledTimes(2);
});
