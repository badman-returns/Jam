// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add SCSS support
      const sassRegex = /\.(scss|sass)$/;
      const sassModuleRegex = /\.module\.(scss|sass)$/;

      // Find the rule that handles CSS files
      const cssRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && rule.oneOf.find((innerRule) => innerRule.test && innerRule.test.toString() === /\.css$/.toString())
      );

      // Add SCSS handling after CSS handling
      if (cssRule) {
        cssRule.oneOf.unshift(
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sassOptions: {
                    includePaths: [path.resolve(__dirname, 'src/styles')],
                  },
                },
              },
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sassOptions: {
                    includePaths: [path.resolve(__dirname, 'src/styles')],
                  },
                },
              },
            ],
          }
        );
      }

      // Modify ESLint configuration
      const eslintRule = webpackConfig.module.rules.find(
        (rule) => rule.use && rule.use.some((use) => use.options && use.options.useEslintrc !== void 0)
      );

      if (eslintRule) {
        eslintRule.use[0].options.useEslintrc = true;
      }

      return webpackConfig;
    },
  },
};
