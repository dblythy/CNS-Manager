module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },

  env: {
    browser: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:vue/strongly-recommended",
    "prettier",
  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    "vue",

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],

  globals: {
    ga: "readonly", // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
  },
  rules: {
    "prefer-promise-reject-errors": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    "no-trailing-spaces": "error",
    "eol-last": "error",
    "space-in-parens": ["error", "never"],
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "space-infix-ops": "error",
    "no-useless-escape": "off",
    "require-atomic-updates": "off",
    "no-throw-literal": "error",
    "prefer-template": "error",
    "vue/require-prop-types": "off",
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unreachable": "warn",
    "no-var": "error",
    "no-await-in-loop": "error",
    eqeqeq: ["error", "always"],
    "vue/require-default-prop": "off",
    "no-empty": "error",
    "prefer-arrow-callback": "error",
    "vue/no-v-model-argument": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/no-reserved-component-names": "off",
  },
};
