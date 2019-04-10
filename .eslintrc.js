module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "quotes": [2, "single", { "avoidEscape": true }],
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "indent": ["error", "tab"],
        "space-infix-ops": ["error", {"int32Hint": false}],
        "no-console": "off",
        "no-mixed-spaces-and-tabs": "off"
    }
};