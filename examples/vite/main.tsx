import { Game } from 'phaser';

import {
  Fragment,
  render,
  Text,
  useEffect,
  useScene,
  useState,
} from '../../src';

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

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const scene = useScene();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      text={time}
      x={scene.scale.width - 16}
      y={16}
      style={{ color: '#fff' }}
      originX={1}
      originY={0}
    />
  );
}

new Game({
  width: 800,
  height: 600,
  scene: {
    create() {
      render(<Clicker />, this);
      render(<Time />, this);
    },
  },
});
