import { Game } from 'phaser';

import { Container, render, Text, useState } from '../../src';

function Clicker() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      {undefined}
      {null}
      {false}
      {0}
      {count > 0 ? <Text text={`Clicks: ${count}`} x={16} y={16} /> : <Text text="You clicked 0 times" x={16} y={16} />}
      <Text
        text="Click"
        x={16}
        y={40}
        style={{
          fontSize: 16 + count,
          backgroundColor: '#fff',
          color: '#000',
          padding: { x: 12, y: 8 },
        }}
        input={{ cursor: 'pointer' }}
        onPointerDown={() => {
          setCount(count + 1);
        }}
      />
    </Container>
  );
}

new Game({
  scene: {
    create() {
      render(<Clicker />, this);
    },
  },
});
