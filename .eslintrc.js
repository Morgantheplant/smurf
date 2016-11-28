module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "max-len": [1, 120, 2, {"ignoreComments": true}],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": 0,
        "prop-types": 0,
        "jsx-filename-extension": 0
    }
};