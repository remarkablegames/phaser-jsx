import { events } from '../../src/constants/events';

it('exports events', () => {
  expect(events).toMatchSnapshot();
});
