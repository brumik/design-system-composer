import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";

import pkg from './package.json' assert { type: "json" };

export default [
  {
    input: 'src/library/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      }
    ],
    plugins: [
      typescript({ tsconfig: "tsconfig-build.json" }),
      resolve(),
      peerDepsExternal(),
    ],
  }
];
