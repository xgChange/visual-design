import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
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
    eslintPlugin(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' // 驼峰和横线，文件名引入
    }
    // 增加css 预处理的配置
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@import "@/assets/css/variable.scss";',
    //   },
    // },
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
