import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

const pathResolve = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    DefineOptions(),
    eslintPlugin(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ] as PluginOption[],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' // 驼峰和横线，文件名引入
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src')
      }
    ]
  }
})
