module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix'],
    '*.{scss,less,css,html}': ['stylelint --fix'],
    '*.vue': ['eslint --fix', 'stylelint --fix'],
}
