import { Fragment } from './Fragment';

it('returns children', () => {
  const props = { children: 'children' };
  expect(Fragment(props)).toBe(props.children);
});

it('renders Fragment without children', () => {
  const element = <Fragment />;
  expect(element).toMatchObject({
    props: {},
    type: Fragment,
  });
});

it('renders Fragment with children', () => {
  const element = (
    <Fragment>
      <li>1</li>
      <li>2</li>
    </Fragment>
  );
  expect(element.type).toBe(Fragment);
  expect(element.props.children).toHaveLength(2);
  expect(element.props.children[0].type).toBe('li');
});
