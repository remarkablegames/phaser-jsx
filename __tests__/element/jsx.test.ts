import { createElement } from '../../src/element/create';
import { jsx } from '../../src/element/jsx';

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
