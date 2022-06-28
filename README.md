# visual-design

使用 monorepo 管理、vue3 等技术栈，简单实现一个 lowcode 平台

## 设计思路

### monorepo 管理形式

- @lowcode/components 组件、模板
- @lowcode/visualPreview 预览、编辑、拖拽区域 (支持 pc、mobile)，目前这些 mobile
- @lowcode/shared 公共方法
- @lowcode/main 主页面(左边导航栏、中间布局、右边编辑栏)

### 项目工具

- husky
- commitlint、cz
