module.exports = {
    entry: "./public/jsx/index.jsx",
    output: {
        path: "./public/jsx",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', "react"]
                }
            }
        ]
    }
}
