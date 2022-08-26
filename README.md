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

### iphone6 为标准 375 \* 667

## vue 相关

### 为啥 watchEffect、watch 不能监听数组的变化，(watch deep 可以监测)

下面是例子

```typescript
const arr = ref([])

setTimeOut(() => {
  arr.value.push(1)
})

// 此时是监测不到 arr 的变化
watchEffect(() => {
  console.log(arr.value)
})

// 同理 watch 也检测不到
watch(arr, (v, oldv) => {
  console.log('变化')
})
```

分析：

1.  为什么监测不到 arr 的变化?

    - 首先 arr 是一个 ref 包裹的数组，所以我们打开源码查看到 RefImpl 这个类，里面有 get，set(简单来说的话就是在 ref 实例下收集 deps，触发 track 和 trigger)。value 是 **this.\_value = \_\_v_isShallow ? value : toReactive(value)** 会判断是否是对象，然后转为 reactive.

    - 例如 传入的 [] 是数组，**this.\_value** 就把他转换为 reactive 对象。

    - 为什么在 watchEffect 中 arr.value 获取不到 arr.value 的变化？ 因为：监测的只是一个 proxy 的代理对象，没有对里面的属性进行监测。

      ```typescript
      // reactive 对象里面的 track 是在 proxy的getter 上触发的。而现在只是在watch里面监测一个proxy对象。

      watchEffect(() => {
        arr.value[0]
      })
      // 如果是上面那样，是可以监测到数组0项的变化的。因为在watchEffect中访问了 proxy的getter.
      ```

2.  为什么 watch deep 可以监测到?

    - 打开源码 **doWatch** 函数。

      ```typescript
      if (cb && deep) {
        const baseGetter = getter
        getter = () => {
          return traverse(baseGetter())
        }
      }
      ```

    - track: 重点是 traverse 函数，我们假设 baseGetter()返回值是 proxy 的数组。**(value as any)[ReactiveFlags.SKIP]** 这一句是去访问 proxy 的 getter，key 值是 ReactiveFlags.SKIP. 然后去跑 proxy getter 代码，然后会初始化 SKIP 属性的依赖。然后往下走到

      ```typescript
      // value.length 也会进入 getter 去设置 length的依赖
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], seen)
      }
      ```

    - trigger: 在 setTimeOut 里面进行 push 操作时候，实际上操作的是 proxy 的 arr，经过测试发现:

      ```typescript
      const arr = []
      const pa = new Proxy(arr, {
        get(t, k, r) {
          console.log('get', t, k, r)
          return Reflect.get(t, k, r)
        },
        set(t, k, r) {
          console.log('set', t, k, r)
          return Reflect.set(t, k, r)
        }
      })

      pa.push(1)

      //
      /**实际会输出
        get [] push Proxy {}
        get [] length Proxy {}
        set [] 0 4
        set [4] length 1
      
        也就是会访问 push、length 的key值，然后再 set 当前索引、length。
      */
      ```

      最后触发 trigger 流程，effect 里面触发自定义的 scheduler -> 因为 deep 为 true 所以会触发 watch 的 callback()

    - 而为什么 deep = false 时不能触发 callback 呢？因为 没有收集到 length 的依赖，而 length 的依赖在 traverse 函数中访问到了。

3.  在组件模板、render 中用时也能监听的变化是为什么？

```typescript
const MyCom = {
  template: `<div>{{arr}}</div>`,
  setup() {
    const arr = reactive([0])

    setTimeout(() => {
      arr.push(1)
    }, 2000)

    effect(() => {
      console.log('不变', arr)
    })

    effect(() => {
      console.log('变化', arr.toString())
    })

    return {
      arr
    }
  }
}

// 例如直接在模板中使用 arr，其实是调用了arr.toString()，而toString方法会调用 length，这样就会收集length的dep依赖，然后在push时候，会改变length，从而触发setter，触发trigger，会收集数组中每一项的dep，然后循环 effect.run

// render中使用同上述在effect中使用
```
