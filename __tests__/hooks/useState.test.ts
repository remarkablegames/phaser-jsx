import {
  createRenderContext,
  resetRenderContext,
  setRenderContext,
} from '../../src/helpers';
import { useState } from '../../src/hooks/useState';

afterEach(() => {
  resetRenderContext();
});

it('returns initial value and setter', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [value, setValue] = useState(0);
  expect(value).toBe(0);
  expect(typeof setValue).toBe('function');
});

it('returns same value on subsequent calls with same index', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [value1] = useState(42);
  // Second useState call gets index 1
  const [value2] = useState('hello');
  expect(value1).toBe(42);
  expect(value2).toBe('hello');
});

it('supports multiple state variables', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [count] = useState(0);
  const [name] = useState('test');

  expect(count).toBe(0);
  expect(name).toBe('test');
});

it('setter updates value in context state map', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [value, setValue] = useState(0);
  expect(value).toBe(0);

  setValue(42);
  // Check the state map was updated (index 0 should now be 42)
  expect(context.state.get(0)).toBe(42);
});

it('setter accepts function updater', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [count, setCount] = useState(0);
  expect(count).toBe(0);

  setCount((prev) => prev + 1);
  // Check the state map was updated (index 0 should now be 1)
  expect(context.state.get(0)).toBe(1);
});

it('does not overwrite existing state value on re-render', () => {
  const context = createRenderContext();
  setRenderContext(context);
  const [, setValue] = useState(0);
  setValue(99);
  context.resetStateIndex();
  const [value] = useState(0);
  expect(value).toBe(99);
});

it('triggers rerender on state change', () => {
  const rerender = vi.fn();
  const context = createRenderContext();
  context.rerender = rerender;
  setRenderContext(context);

  const [, setValue] = useState(0);
  setValue(1);

  expect(rerender).toHaveBeenCalledTimes(1);
});
