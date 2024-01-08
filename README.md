> [!NOTE]
> This package is under development so expect breaking changes in future releases.

# phaser-jsx

[![NPM](https://nodei.co/npm/phaser-jsx.png)](https://nodei.co/npm/phaser-jsx/)

[![NPM version](https://img.shields.io/npm/v/phaser-jsx.svg)](https://www.npmjs.com/package/phaser-jsx)
[![build](https://github.com/remarkablegames/phaser-jsx/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablegames/phaser-jsx/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablegames/phaser-jsx/graph/badge.svg?token=EZEOFDL9ME)](https://codecov.io/gh/remarkablegames/phaser-jsx)

Use [JSX](https://facebook.github.io/jsx/) in [Phaser](https://phaser.io/).

## Quick Start

With JSX:

```jsx
import Phaser from 'phaser';
import { Text, render } from 'phaser-jsx';

new Phaser.Game({
  scene: {
    create() {
      render(<Text text="Hello, world!" />, this);
    },
  },
});
```

Without JSX:

```js
import Phaser from 'phaser';
import { jsx, render } from 'phaser-jsx';

new Phaser.Game({
  scene: {
    create() {
      render(jsx(Phaser.GameObjects.Text, { text: 'Hello, world!' }), this);
    },
  },
});
```

## Installation

[NPM](https://www.npmjs.com/package/phaser-jsx):

```sh
npm install phaser-jsx
```

[Yarn](https://yarnpkg.com/package/phaser-jsx):

```sh
yarn add phaser-jsx
```

[CDN](https://unpkg.com/browse/phaser-jsx/):

```html
<script src="https://unpkg.com/phaser@latest/dist/phaser.min.js"></script>
<script src="https://unpkg.com/phaser-jsx@latest/umd/phaser-jsx.min.js"></script>
```

## Usage

ES Modules:

```js
import { createElement, render } from 'phaser-jsx';
```

CommonJS:

```js
const { createElement, render } = require('phaser-jsx');
```

UMD:

```html
<script src="https://unpkg.com/phaser@latest/dist/phaser.min.js"></script>
<script src="https://unpkg.com/phaser-jsx@latest/umd/phaser-jsx.min.js"></script>
<script>
  const { render, jsx } = window.PhaserJSX;
</script>
```

## TypeScript

To get better type support, import the GameObject from `phaser-jsx` instead of `phaser`:

```ts
import { Text } from 'phaser-jsx';
```

## Release

Release is automated with [Release Please](https://github.com/googleapis/release-please).

## License

[MIT](https://github.com/remarkablegames/phaser-jsx/blob/master/LICENSE)
