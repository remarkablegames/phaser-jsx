import { events } from './events';

it('exports events', () => {
  expect(events).toMatchSnapshot();
});
