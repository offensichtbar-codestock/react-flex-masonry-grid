import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import { terser } from "rollup-plugin-terser";
import babel from '@rollup/plugin-babel';

// the entry point for the library
const input = './src/index.js'

// 
var MODE = [
  {
    fomart: 'cjs'
  },
  {
    fomart: 'esm'
  },
  {
    fomart: 'umd'
  }
]

var config = []


MODE.map((m) => {
    var conf = {
        input: input,
        output: {
            // then name of your package
            name: "@offensichtbar-codestock/react-flex-masonry-grid",
            file: `dist/index.${m.fomart}.js`,
            format: m.fomart,
            exports: "auto",
            globals: {
              "react": 'React',
              "@babel/runtime/helpers/slicedToArray": "_slicedToArray",
              "@babel/runtime/helpers/toConsumableArray": "_toConsumableArray"
            }
        },
        // this externalizes react to prevent rollup from compiling it
        external: ["react", /@babel\/runtime/],
        plugins: [
            // these are babel comfigurations
            babel({
                exclude: 'node_modules/**',
                plugins: ['@babel/transform-runtime'],
                babelHelpers: 'runtime'
            }),
            // this adds support for styles
            styles({
                postcss: {
                    plugins: [
                        autoprefixer(),
                        terser()
                    ]
                }
            })
        ]
    }
    config.push(conf)
})

export default [
  ...config,
]