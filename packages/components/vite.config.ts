import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

const pathResolve = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()] as PluginOption[],
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
    lib: {
      entry: pathResolve('src/index.ts'),
      name: 'visual-components',
      // the proper extensions will be added
      fileName: 'visual-components'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vant'],
      output: {
        exports: 'named',
        globals: {
          VComs: 'VComs',
          vue: 'Vue'
        }
      }
    }
  }
})
