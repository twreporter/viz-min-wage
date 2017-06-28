/*eslint-disable */
const path = require('path')
const glob = require('glob')

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader',
        {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]'
            }
        }, 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader',
        'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              context: '/', // <- putting this line right under "options" did the trick
              sassLoader: {
                includePaths: [
                  path.resolve(__dirname, 'vendor/zurb/foundation/scss'),
                ]
              },
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )

    // Perform customizations to config
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })

    return config
  },

  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/other": { page: "/other" },
    }
  },
}
