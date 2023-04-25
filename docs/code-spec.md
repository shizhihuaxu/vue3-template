[TOC]

## 代码规范

### 1 文件命名

1. 文件、文件夹，均使用 小写字母 + 连接线的命名规则，例如: `my-web`，`my-web.js`；

2. 引入 `vue`，` css` 文件时不要省略扩展名，js、ts 省略扩展名；

3. 命名应该简洁，避免过长的命名，单词比较长或复杂的应该使用简写，例如：`statistics`可简写为 `stats`；

4. `views` 页面相关的文件中，文件夹层级结构应与功能模块结构保持一致；

5. 特殊的，vue3 的 hooks 文件推荐使用小驼峰命名，这个暂时先保留小驼峰命名；

   

### 2 CSS

1. 类名、变量名使用小写字母 + 连接线命名，例如 `my-class`，`$primary-color`；

2. 嵌套尽量不要超过三层；

3. 字体大小不小于 12px，不可设置为奇数值，保证兼容性；

4. 所有颜色变量应优先使用 `element-plus` 提供的变量，点击页面中 html 标签即可看到所有全局可用变量，避免自己定义变量与其他组件不协调的问题，当 `element-plus` 提供的变量在全局范围内与预期值不符时，需在 `styles/global/_index.scss`  中重置，参照[此链接](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss)的重置方法；

   

### 3 TS

1. `enum` 枚举，大驼峰命名，后缀 `Enum` ，例如 `MyNameEnum`；

2. `interface` 接口，大驼峰，前缀 `I`，例如 `IMyName`；

3. `type` 类型，大驼峰，前缀 `T`，例如 `TMyName`；

4. 变量使用小驼峰命名法；

5. 仅导入类型使用 `import type` 语法；

6. 全局的类型放在  `root/typings` 文件夹下，按功能隔离，可实现全局使用，避免每个文件单独导入麻烦；

7. 其余规则参见仓库中 `Eslint` 配置，vscode 中安装  `Eslint` 插件配合项目中 `.vscode` 配置文件即可实现自动修复；

   

### 4 Vue3

1. 使用组合式 API 的写法而不是选项式， 使用 `script setup` 的写法；
2. 使用 ts 注释 props 、emits 等，而不是运行时的类型检查，[写法参考链接](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)；
3. 组件名称使用kebab-case，模版中使用组件名称时也是kebab-case；
4. prop 命名，小驼峰，类型信息提供完整；在模板和 JSX 中应该始终使用 kebab-case；
5. 处理事件的名称全部使用 handle 或 on 开头，例如 handleRunTask；
6. 组件或元素 Ref 引用，变量命名需要带有 Ref 后缀，例如 `tableRef`；
7. 监听事件时，方法如果不接收参数写为方法调用，而不是方法名(例如：`@click = 'onSearch()'` 而不是 `@click='onSearch' `)



### 5 接口命名规范

1. 接口文件及文件夹应与对应功能模块命名一致，层级结构保持一致，功能模块命名是功能的简写命名，某些情况下后端接口名称与功能模块不一致时，前端接口名称应保持和功能模块名称一致而不是后端接口；

2. 接口命名参考（其中 `ModuleName` 替换为具体的模块名，`FiledName`替换为具体的字段名）

   - 获取列表（getModuleNameList）

   - 获取详情（getModuleNameDetail）

   - 删除（removeModuleName）

   - 添加（addModuleName）

   - 编辑（updateModuleName）

   - 更新其他字段（updateModuleNameFiledName），例如更新主域名组织部门 `updateDomainOrg`

     


### 6 注意事项

1. 表单中只有单个输入框，回车会导致页面刷新，为 `el-form` 组件增加 `@submit.prevent`事件防止刷新；
2. 为表单项增加 `@keyup.enter='onOk'` 可以使表单项回车提交，注意一般只有 input 需要回车提交，textarea 换行不应提交；
3. switch 组件绑定 `checkedValue` 如果不是 `boolean` 值时，第一次赋值渲染也会触发 `change` 事件，注意相关的处理逻辑；
