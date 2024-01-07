import { createElement } from './create';
import { jsx } from './jsx';

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
