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
export default defineConfig(({ mode }) => {
  // const envOptions = loadEnv(mode, process.cwd())
  console.log(mode)
  return {
    base: './',
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
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            lodash: ['lodash'],
            'naive-ui': ['naive-ui'],
            vue: ['vue'],
            pinia: ['pinia'],
            vuedraggable: ['vuedraggable']
          }
        }
      }
    }
  }
})
