module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
    ],
    customSyntax: 'postcss-html',
    plugins: ['stylelint-scss'],
    rules: {
        'indentation': 4, // 缩进 4
        'string-quotes': 'single', // 单引号
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'selector-pseudo-class-no-unknown': [ // 深度选择器
            true,
            {
                'ignorePseudoClasses': ['deep'],
            },
        ],
    },
}