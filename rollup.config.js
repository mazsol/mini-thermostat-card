import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5001,
  open: false,
  verbose: true,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({
    browser: true,
  }),
  commonjs(),
  typescript(),
  json(),
  dev && serve(serveopts),
  !dev && terser(),
];

export default [
  {
    input: dev ? 'src/mini-thermostat-card-test.ts' : 'src/mini-thermostat-card.ts',
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: dev ? 'mini-thermostat-card-test.js' : 'mini-thermostat-card.js',
    },
    external: [],
    plugins: [...plugins],
  },
];
