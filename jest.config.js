/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // 处理测试 vue 组件 document is not defined 的问题
    testEnvironmentOptions: { // 处理测试 vue，引用 shallowMount Vue is not defined 的问题
        customExportConditions: ['node', 'node-addons'],
    },
    moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx'], // 省略的扩展名列表， 不建议省略 vue 扩展名
    transform: { // 转换 vue 文件
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleNameMapper: { // 引入文件时可以使用路径别名
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
