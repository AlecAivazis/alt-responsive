/*
 * Base build configuration common to both live and development builds.
 *   references:
 *     * http://webpack.github.io/docs/
 *     * https://github.com/petehunt/webpack-howto
 */

/* local imports */
var project_paths = require('./project_paths')


// export the configuration
module.exports = {
    output: {
        libraryTarget: 'commonjs2',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: project_paths.source_dir,
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: require(project_paths.babel_config),
                include: project_paths.source_dir,
            },
        ],
    },
    resolve: {
        extensions: ['', '.js'],
    },
    eslint: {
        configFile: project_paths.eslint_config,
        failOnError: true,
    },
}


// end of file
