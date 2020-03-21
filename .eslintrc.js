module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
    "no-empty": [
      "error", 
      { 
        "allowEmptyCatch": true 
      }
    ],
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "semi": true,
        "no-unused-vars": "off",
        "endOfLine":"auto"
      },
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
