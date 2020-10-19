import scss from 'rollup-plugin-scss'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json'
import ts from '@wessberg/rollup-plugin-ts'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

// const env = process.env.NODE_ENV

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg']

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    json(),
    scss({
      output: 'dist/styles.css',
    }),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    resolve({ extendsion: EXTENSIONS }),
    ts(),
    commonjs(),
    terser(),
  ],
}
