import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

// https://www.rollupjs.com/guide/big-list-of-options
export default defineConfig([
  {
    // 入口文件
    input: 'packages/vue/src/index.ts',
    // 打包出口
    output: [
      // 导出 iife 模式的包
      {
        // 开启 sourceMap
        sourcemap: true,
        // 导出文件地址
        file: './packages/vue/dist/vue.js',
        // 生成包的格式
        format: 'iife',
        // 变量名
        name: 'Vue'
      }
    ],
    // 插件
    plugins: [
      // ts
      typescript({
        sourceMap: true
      }),
      // 模块导入路径补全
      resolve(),
      // 转 commonjs 为 ESM
      commonjs()
    ]
  }
])