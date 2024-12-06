import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = (minify = false) => ({
  external: ['phaser'],
  input: 'src/index.ts',
  output: {
    file: `umd/phaser-jsx${minify ? '.min' : ''}.js`,
    format: 'umd',
    globals: {
      phaser: 'Phaser',
    },
    name: 'PhaserJSX',
    sourcemap: true,
  },
  plugins: [
    typescript({
      declaration: false,
      declarationMap: false,
      module: 'esnext',
      compilerOptions: {
        outDir: 'umd',
      },
    }),
    commonjs(),
    minify && terser(),
  ],
});

export default [config(), config(true)];
