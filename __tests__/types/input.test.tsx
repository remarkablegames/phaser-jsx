import { Text } from '../../src';

it('creates Text with prop input without errors', () => {
  const element = <Text input={{ cursor: 'pointer' }} />;
  expect(element).toMatchObject({
    props: { input: { cursor: 'pointer' } },
    type: Text,
  });
});
