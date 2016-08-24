module.exports = {
    entry: "./App.jsx",
    output:
    {
        filename: "bundle.js"
    },
    module:
    {
        loaders:
        [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query:
                {
                    presets: ['es2015', "react", "stage-1"]
                }
            },
            {   
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                loader: "style!css"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            }
        ]
    }
}