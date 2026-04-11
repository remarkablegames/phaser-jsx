import { render } from '../../src/render';

it('exports render', () => {
  expect(render).toBeInstanceOf(Function);
});
