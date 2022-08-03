版本记录

```bash
nvm 0.39.1
node 16.16.0
yarn 1.22.19
* vue cli 5.0.8
* vite 3.0.0
vue3 
Vue Router 4 
Pinia 2.0.17
axios 0.27.2
TS 4。6.4 + Eslint 8.20.0
SCSS（用于书写样式） + Less（用于配置主题） + StyleLint
Ant Design Vue 3.2.0
Echarts 5.3.3
I18n 
Mock(TODO)
Jest + Cypress（TODO） 
Husky + Lint Staged + Commitlint
```



## 更新或下载 nvm

```bash
# 安装
https://github.com/nvm-sh/nvm#git-install

#下载链接
https://github.com/nvm-sh/nvm/tags

# 更新 git v1.7.10+
cd nvm 安装的文件夹地址
git fetch --tags origin
git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
./nvm.sh
```



## 使用 yarn 

1. 安装 node，附带安装了 npm

2. npm install -g yarn 使用此方式安装 yarn，兼容性好

3. 执行yarn --version 查看是否安装成功，如果提示命令不存在则需要将yarn的可执行目录（也就是bin目录）添加到系统变量，然后重启中断再执行，macos示例：

   ```bash
   # 用户目录/.bash_profile 中增加
   export PATH="/Users/xinhong/.yarn/bin:$PATH"
   ```

4. 基本使用命令

   ```bash
   yarn init
   yarn install
   
   yarn global add 
   yarn global remove
   
   yarn add -S(--save)
   yarn add -D(--dev)
   yarn remove
   
   # 镜像
   yarn config set registry registry.npm.taobao.org
   yarn config get registry
   
   # 列举全局依赖
   yarn global list --depth=0
   ```

5. 使用 commitizen

   ```bash
   # 全局安装
   yarn global add commitizen
   # 项目中使用
   commitizen init cz-conventional-changelog --yarn --dev --exact
   ```

6. 从 npm 迁移

   https://yarn.bootcss.com/docs/migrating-from-npm



Trouble Shotting

1. js 文件 Must use import to load ES Module，package.json 文件里多了 type: module 配置项，删除重新启动即可

2. 引入文件时省略扩展名，或者默认导入文件夹下的 index 文件， eslint 报错，解决方案参见 8 

3. 在 vite.config.js 中判断环境

   

   

## Vue CLI 

```bash
# 安装
yarn global add @vue/cli
# 升级
yarn global upgrade --latest @vue/cli
```



## 创建项目

```
vue create vue3-template
```

![vue-cli-vue3-1](/Users/xinhong/docs/code/vue3-template/docs/how-to-init/imgs/vue-cli-vue3-1.png)

## 使用 Vite 

```bash
yarn create vite my-vue-app --template vue-ts
```



## 安装与配置项目依赖

1. Eslint 初始化

   ```bash
   yarn add -D eslint 
   npx eslint --init
   ```

   ![eslint-init](/Users/xinhong/docs/code/vue3-template/docs/how-to-init/imgs/eslint-init.png)

- 选择了 airbnb 的代码风格；

- 在 main.ts 写一些错误风格代码，此时可以看到有错误提示了；

- 如果未选择流行的代码风格而是选择了自定义，此时在 vue 单文件组件中写了一些错误风格代码，并没有任何提示，需要在 eslint 配置文件中指定 parser  去校验 vue 文件。

  ```js
  // https://eslint.vuejs.org/user-guide/#usage
  module.exports = {
  	parser': 'vue-eslint-parser',
  }
  ```

- 代码中的错误在 vite 运行 dev 环境时并没有提示，需要安装 `vite-plugin-eslint` 插件，然后在 vite.config.js 中配置

  ```bash
  yarn add -D vite-plugin-eslint
  ```

  ```js
  // vite.config.js
  import eslint from 'vite-plugin-eslint'
  
  export default defineConfig({
      plugins: [
          vue(),
          eslint({ cache: false }),
      ],
  })
  ```

2.  配置 stylelint

   ```bash
   yarn add -D 
   stylelint
   # 用于支持校验scss语法的插件
   stylelint-scss
   # 属性书写顺序
   stylelint-config-rational-order
   # stylelint官方共享的标准规则集成
   stylelint-config-standard
   # 在 vite 中提示错误
   vite-plugin-stylelint
   # lint 非纯 css 使用
   postcss
   postcss-scss
   postcss-html
   ```

3.  使用 scss

   在 vite 中使用预处理器非常简单，仅需引入预处理器的依赖即可，不需要再安装其他解析、配置依赖

4. 引入路径别名，省略扩展名（注意 vue,css 文件的别名建议不要省略）

   ```js
   // vite.config.ts
   import { defineConfig } from 'vite'
   import { resolve } from 'path'
   
   export default defineConfig({
       resolve: {
           alias: {
               '@': resolve(__dirname, 'src'),
           },
       },
   })
   
   
   // eslint 配置,否则在使用时会提示无法解析
   module.exports = {
     rules: {
       // 引入文件时，忽略校验 省略的扩展名，airbnb 校验导致
       // vite resolve.entensions = ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
       'import/extensions': [
           'error',
           'ignorePackages',
           {
               mjs: 'never',
               js: 'never',
               jsx: 'never',
               ts: 'never',
               tsx: 'never',
               json: 'never',
           },
       ],
     }
     // 解决别名引入问题，需安装 eslint-import-resolver-typescript
     settings: {
       'import/resolver': {
         typescript: {
     			project: './tsconfig.json',
         },
     },
   }
   
   
   // tsconfig.json 解决别名引入问题
   {
     "compilerOptions": {
       "baseUrl": "src",
       "paths": {
           "@/*": [
               "*"
           ],
       }
     }
   }
   ```

​	所以添加一个别名时需要改 tsconfig.json, vite.config.js 

5. Lint staged 和 husky

   > `husky`**对 git 的 commit 操作进行校验**,`husky`继承了Git下所有的钩子，在触发钩子的时候。 配合`lint-staged`在提交代码之前运行 Linting更有意义。通过这样做，您可以确保没有错误进入存储库并强制执行代码样式。`husky`可以阻止不合法的commit，push等等

​		利用 husky 在指定 git 钩子时，使用 lint-staged 过滤出匹配的文件，并针对匹配出的文件执行相应的命令。

```bash
# 初始化 husky, yarn 1
npx husky-init && yarn  
# 创建一个钩子，并执行指定命令
npx husky add .husky/pre-commit "lint-staged"
git add .husky/pre-commit

# 安装 lint-staged
yarn add -D lint-staged
```



```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx}": [
      "eslint --fix",
      "git add"
    ],
    "src/**/*.{html,vue,css,less,scss}": [
      "stylelint --fix",
      "git add"
    ]
  }
```

6. commitlint

   ```bash
   yarn add -D @commitlint/cli @commitlint/config-conventional
   ```

   ```js
   // commitlint.config.js
   module.exports = {
       extends: ['@commitlint/config-conventional'],
   }
   ```

   ```
   npx husky add .husky/commit-msg 'npx commitlint --edit $1'
   ```

8.  环境变量

   ```
   // .env.development
   VITE_APP_PUBLIC_PATH = /
   
   
   // .env.production
   VITE_APP_PUBLIC_PATH = /
   ```

   - 在 vite 中访问环境变量 的写法，导出配置需改写成返回配置第一项的函数

     ```js
     // 原
     export default defineConfig({ key: value})
     
     // 改为
     export default ({ mode }) => {
     		const root = process.cwd()
         const env = loadEnv(mode, root)
         
         return {
           base: env.VITE_APP_PUBLIC_PATH
         }
     }
     ```

     

   - 在 src 的文件中访问环境变量的方法

     ```
     import.meta.env[?mode][key]
     ```

     

9.  组件库 ant design vue 3

   ```bash
   yarn add ant-design-vue
   ```

   - 全局部分注册组件，参见 src/components/antd.ts ，然后在 main.ts 中引入使用；官方的 vite 示例 messge 组件在scripts 中使用需要单独引入，所以不使用此方式

     

   - 覆盖主题，引入 antd 的全局样式文件必须引入 less 格式的，其他格式的无效

     方案一：使用less 变量文件覆盖

     ```
     // src/styles/variables.less
     @primaryc-color: red;
     
     // vite.config.js
     css: {
       preprocessorOptions: {
           less: {
               modifyVars: {
                   hack: 'true; @import "@/styles/variables.less";',
                   'root-entry-name': 'variable',
               },
               // DO NOT REMOVE THIS LINE
               javascriptEnabled: true,
           },
       },
     },
     ```

     方法二：直接在 vide.config.js 里重新配置颜色

     ```
     css: {
       preprocessorOptions: {
           less: {
               modifyVars: {
                   'primary-color': '#1DA57A',
               },
               // DO NOT REMOVE THIS LINE
               javascriptEnabled: true,
           },
       },
     },
     ```

   10.  nvmrc or volta

       ```
       node -v > .nvmrc
       ```

   
   11.  状态管理 Pinia，持久化方案
   
       ```
       yarn add pinia 
       
       // main.ts 注册
       import { createPinia } from 'pinia'
       createApp(App).use(createPinia()).mount('#app')
       ```
   
       state, getter, action，无 mutation
   
   12.  单元测试 Jest
   
       https://dev.to/imomaliev/creating-vite-vue-ts-template-setup-jest-5h1i
   
       https://jestjs.io/zh-Hans/docs/getting-started
   
       https://test-utils.vuejs.org/installation/
   
       https://github.com/vuejs/vue-jest
   
       https://stackoverflow.com/questions/72013449/upgrading-jest-to-v28-error-test-environment-jest-environment-jsdom-cannot-be
   
       https://stackoverflow.com/questions/72428323/jest-referenceerror-vue-is-not-defined
   
       ```bash
       yarn add -D jest ts-jest @types/jest @vue/test-utils @vue/vue3-jest@28 jest-environment-jsdom
       
       # 生成配置文件
       npx ts-jest config:init
       
       # jest.config.js 最终配置
       /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
       module.exports = {
           preset: 'ts-jest',
       		# 处理测试 vue 组件 document is not defined 的问题    
           testEnvironment: 'jsdom',
           # 处理测试 vue，引用 shallowMount Vue is not defined 的问题
           testEnvironmentOptions: {
              customExportConditions: ["node", "node-addons"],
           },
          	# 省略的扩展名列表， 不建议省略 vue 扩展名
           moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx'],
           transform: {
               '^.+\\.vue$': '@vue/vue3-jest',
           },
           // 路径别名
           moduleNameMapper: {
               '^@/(.*)$': '<rootDir>/src/$1',
           },
       }
       
       
       # eslint 中添加配置,避免 eslint 对测试文件关键词报错
       overrides: [
           {
               files: [
                   '**/__tests__/*.{j,t}s?(x)',
                   '**/tests/unit/**/*.spec.{j,t}s?(x)',
               ],
               env: {
                   jest: true,
               },
           },
       ]
       ```
   
   13. E2e 测试 cypress
   
       ```
       yarn add cypress --dev
       ```
   
   14. 国际化
   
       https://vue-i18n.intlify.dev/
   
       ```
       yarn add vue-i18n
       ```
   
       解决控制台报错 `You are running the esm-bundler build of vue-i18n ....`
   
       ```
       // vite.config.js
       alias: {
         'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
       },
       ```
   
       
