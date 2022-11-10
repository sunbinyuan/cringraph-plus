const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// let htmlPageNames = ['index', 'graph', 'graph_free', 'graph_hp', 'iframe'];
let htmlPageNames = ['index', 'graph_free', 'graph_hp'];
let multipleHtmlPlugins = htmlPageNames.map((name) => {
    return new HtmlWebpackPlugin({
        template: `./src/html/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        chunks: [`${name}`], // respective JS files
    });
});

module.exports = (env) => {
    const isDevelopment = !env.production;

    return {
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
                watch: true,
            },
            compress: false,
            port: 9000,
            hot: true,
        },
        devtool: isDevelopment ? 'eval-source-map' : false,
        //   entry: htmlPageNames.reduce((acc, name) => {
        //     acc[name] = `./src/${name}.js`;
        //   }, {}),
        entry: Object.fromEntries(
            htmlPageNames.map((name) => [name, `./src/${name}.js`])
        ),
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['css-loader'],
                },
                {
                    test: /\.mst$/i,
                    loader: 'raw-loader',
                },
            ],
        },
        plugins: [
            ...multipleHtmlPlugins,
            new CopyPlugin({
                patterns: [{ from: 'public', to: '' }],
            }),
        ],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/[name].bundle.js',
            chunkFilename: '[id].chunk.js',
        },
    };
};
