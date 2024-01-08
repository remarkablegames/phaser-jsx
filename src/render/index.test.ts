import { render } from './render';

it('exports render', () => {
  expect(render).toBeInstanceOf(Function);
});
