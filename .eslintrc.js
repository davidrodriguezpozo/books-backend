module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "prettier"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        indent: "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-module-boundary-types": ["error", {
            "allowArgumentsExplicitlyTypedAsAny": true
        }],
        "max-len": ["warn", 120],
    }
}