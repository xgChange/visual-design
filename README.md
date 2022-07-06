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
