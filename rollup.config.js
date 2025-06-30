import packageJson from './package.json' with { type: 'json' };
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', sourceMap: true }),
      terser(),
    ],
    external: [
      'chalk',
      'commander',
      'inquirer',
      'ora',
      'prompts',
      'path',
      'fs',
    ],
  },
  {
    input: 'bin/cli.ts',
    output: {
      file: './dist/bin/cli.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        declaration: false,
      }),
      terser(),
    ],
    external: [
      'chalk',
      'commander',
      'inquirer',
      'ora',
      'prompts',
      'path',
      'fs',
    ],
  },
];
