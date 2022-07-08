# visual-design

使用 monorepo 管理、vue3 等技术栈，简单实现一个 lowcode 平台

## 设计思路

### monorepo 管理形式

- @visual/components 组件、模板
- @visual/visualPreview 预览、编辑、拖拽区域 (支持 pc、mobile)，目前 mobile
- @visual/shared 公共方法
- @visual/main 主页面(左边导航栏、中间布局、右边编辑栏)
- @visual/docs 用 vitepress 编写文档
- @visual/api 后面尝试加入 api

### 项目工具

- husky
- commitlint、cz
- changesets

### 一些说明

- 项目使用了 css module 写法，想让 vscode 做到智能提示，需要安装**css Modules** vscode 插件

```javascript
"cssModules.camelCase": true

// 并且vite的css modules配置 设置为
css: {
  modules: {
    localsConvention: 'camelCaseOnly' // 驼峰和横线，文件名引入
  }
}
```

- 解决 setup 组件无法设置 name 的问题

```bash
pnpm add unplugin-vue-define-options -D
```

### json 定义，暂时定义成这样

```typescript
interface PageConfig {
  style: {}
}

interface Component {
  name: string
  id: string
  style: Object
  slot: Component
}

interface CurPageInfo {
  components: Component[]
  path: string
  title: string
}

interface PageInfo {
  pageConfig: PageConfig
  page: Record<string, CurPageInfo>
}
```

### 准备用 css render (css in js)

### pnpm 子项目互相引用

```bash
pnpm add @monorepo/xx@* -F @monorepo/yy
```

### 一些 ts 注意事项

生成 ts 声明文件

```bash
tsc
```

```json
// 同时开启 "declaration": true、declarationDir、emitDeclarationOnly(是否只生产.d.ts)
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "lib",
    "declaration": true
  }
}
```

tsconfig 里面说明

- vue 文件中的类型

```javascript
// 因为在 <script setup lang="ts"> 中引入的.vue文件类型是 .vue.ts 文件，所以如果只在 tsconfig.json中 include是不行的
// 还要在 tsconfig.json 中设置
{
  "types": ["vite/client"]
}
```

- 本地开发获取类似 **@vue/shared** 的类型

  > 因为本地还未打包，不能生成 types 文件，所以导致编辑器找不到类型。

  可以在当前 ts 所指向的 tsconfig.json 中配置 **paths**，例如：在 app/main 中 tsconfig 是当前目录下定义的，所以无法共享根目录的 tsconfig(我试过 extends，但是还是有类型错误，暂时没找到解决办法)

  ```json
  // 当前目录下的tsconfig.json，暂未找到更好的办法，其实应该这个paths在根目录下定义的
  {
    "paths": { "@visual/*": "../../packages/*/src" }
  }
  ```
