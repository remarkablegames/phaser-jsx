import { Fragment } from '../../src/components/Fragment';

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
  const props = (element as unknown as { props: { children?: unknown[] } })
    .props;
  const children = props.children;
  expect(element.type).toBe(Fragment);
  expect(children).toHaveLength(2);
  expect(children?.[0]).toMatchObject({ type: 'li' });
});
