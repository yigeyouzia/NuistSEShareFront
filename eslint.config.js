// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'warn',
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'ignore',
    }],
  },
})
