module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: [
        'vue',
        '@typescript-eslint',
    ],
    rules: {
        // resolve Cannot read property 'loc' of undefined
        // https://github.com/eslint/eslint/issues/13956
        indent: 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1, // switch case 添加一个单位缩进
            },
        ],
        semi: [
            'error',
            'never',
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // NOTE 解决 ts 类型声明参数名称未使用的问题
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
        ],
        'vue/multi-word-component-names': 'off', // 允许单个单词的组件名
        'vue/mustache-interpolation-spacing': 'error', // 插值双花括号和内容之间需要有空格
        'vue/multiline-html-element-content-newline': 'error', // 标签包裹的内容独占一行
        'vue/component-name-in-template-casing': [ // 模板中组件名称使用 kebab-case 模式
            'error',
            'kebab-case',
            {
                registeredComponentsOnly: true,
                ignores: [],
            },
        ],
        'vue/html-quotes': [ // vue 模版单引号
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        // NOTE 关闭 vscode/setting.json 的 editor.formatOnSave 属性，否则格式化后又会还原
        'vue/max-attributes-per-line': [ // 属性换行，每个属性一行
            'error',
            {
                singleline: 1,
                multiline: 1,
            },
        ],
        'vue/first-attribute-linebreak': [ // 属性换行，第一个属性独占一行
            'error',
            {
                singleline: 'ignore',
                multiline: 'below',
            },
        ],
        'vue/html-indent': [ // 属性换行，缩进配置
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: false,
                ignores: [],
            },
        ],
        'import/prefer-default-export': 'off', // 单个导出时默认使用 default
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
        // 解决 vite.config.js 中 引入 node 依赖报错
        'import/no-extraneous-dependencies': [
            'off',
            { 'packageDir ': './src/' },
        ],
    },
    // 解决引入文件使用路径别名报错的问题
    // 需同时在 tsconfig.json 中配置 baseUrl 和 path 与 vite 别名保持一致
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
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
    ],
    globals: {
        JSX: true,
    },
}
