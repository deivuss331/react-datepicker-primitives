import * as fs from 'fs';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import ts from 'typescript';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import json from '@rollup/plugin-json';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const { name, version, main, module, browser, author, license: libLicense } = pkg

const isProduction = process.env.NODE_ENV === 'production';

export default {
    input: './lib/index.ts',
    output: [
        {
            file: main,
            name: main,
            format: 'cjs',
            plugins: [isProduction && terser()],
        },
        {
            file: module,
            name: name,
            format: 'es',
        },
        {
            file: browser,
            name: name,
            format: 'umd',
        },
    ],
    external: ['ms'],

    plugins: [
        peerDepsExternal(),
        json(),
        resolve({
            jsnext: true,
            main: true,
        }),
        typescript({
            typescript: ts,
        }),
        commonjs({
            include: 'node_modules/**',
            extensions: ['.js'],
            ignoreGlobal: false,
            sourceMap: false,
        }),
        license({
            banner: `
        Copyright (c) ${author}.
        
        This source code is licensed under the ${libLicense} license.
        
        ${name} v${version}
      `,
        }),
    ],
};