const path = require("path");
const dts = require("dts-bundle");

module.exports = {
    mode: "none",
    context: __dirname,
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "jackage.js",
        libraryTarget: "commonjs2",
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    stats: {
        warnings: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    "ts-loader",
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts"],
    },
    plugins: [
        new DtsBundlePlugin(),
    ],
};

function DtsBundlePlugin () { }
DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.hooks.done.tap("DtsBundlePlugin", function () {
        dts.bundle({
            name: "jackage",
            main: path.resolve(__dirname, "dist", "index.d.ts"),
            out: path.resolve(__dirname, "index.d.ts"),
            removeSource: true,
        });
    });
};