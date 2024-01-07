import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = (minify = false) => ({
  input: 'src/index.ts',
  output: {
    file: `umd/npm-package-typescript-template${minify ? '.min' : ''}.js`,
    format: 'umd',
    name: 'npm-package-typescript-template',
    sourcemap: true,
  },
  plugins: [
    typescript({
      declaration: false,
      declarationMap: false,
      module: 'esnext',
    }),
    commonjs(),
    minify && terser(),
  ],
});

export default [config(), config(true)];
