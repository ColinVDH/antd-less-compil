import ExtractTextPlugin from 'extract-text-webpack-plugin';
const PRODUCTION = process.env.NODE_ENV === 'production';

export default function (appName) {
    const prefix = appName ? `${appName}/` : '';

    return [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=babel',
    }, {
        test: /\.jpe?g$|\.gif$|\.png$/,
        use: `url-loader?limit=10000&name=/${prefix}[hash].[ext]`,
    }, {
        test: /\.(otf|svg)(\?.+)?$/,
        use: 'url-loader?limit=8192',
    }, {
        test: /\.eot(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
    }, {
        test: /\.woff2(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff2',
    }, {
        test: /\.woff(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-woff',
    }, {
        test: /\.ttf(\?\S*)?$/,
        use: 'url-loader?limit=100000&mimetype=application/font-ttf',
    }, {
        test: /\.html$/,
        use: 'html-loader',
    }, {
        test: /\.s?css$/,
        exclude: /node_modules/,
        ...(PRODUCTION ? {
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
                })
            } : {loaders: ["style-loader", "css-loader?sourceMap", "postcss-loader", "sass-loader?sourceMap&sourceComments"]} )
    }, {
        test: /antd.*\.less$/,
        ...(PRODUCTION ? {
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
                })
            } : {
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {sourceMap: 1}
                    },
                    "postcss-loader",
                    "less-loader"
                ]
            } )
    },
    ];
}
