import { Game } from 'phaser';

import { Fragment, render, Text, useEffect, useState } from '../../src';

function Clicker() {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log('count:', count);
  }, [count]);

  return (
    <Fragment>
      {undefined}
      {null}
      {false}
      {0}
      {count > 0 ? (
        <Text text={`Clicks: ${count}`} x={16} y={16} />
      ) : (
        <Text text="You clicked 0 times" x={16} y={16} />
      )}
      <Text
        text="Click"
        x={16}
        y={40}
        style={{
          backgroundColor: hovered ? '#87ceeb' : '#fff',
          color: '#000',
          padding: { x: 12 + count, y: 8 + count },
        }}
        input={{ cursor: 'pointer' }}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
        onPointerDown={() => {
          setCount(count + 1);
        }}
      />
    </Fragment>
  );
}

new Game({
  scene: {
    create() {
      render(<Clicker />, this);
    },
  },
});
