import { createElement } from './create';

function Component() {}

it.each([
  [],
  [Component],
  [Component, null],
  [Component, null, null],
  [Component, { style: { width: 100, height: 200 } }],
  [Component, { style: { width: 100, height: 200 } }, null],
  [Component, { style: { width: 100, height: 200 } }, Component],
  [Component, {}, Component, Component],
  [Component, { children: Component }],
  [Component, { children: [Component] }],
])('creates element %p', (...args) => {
  expect(
    // eslint-disable-next-line prefer-spread
    createElement.apply(null, args as Parameters<typeof createElement>),
  ).toMatchSnapshot();
});
