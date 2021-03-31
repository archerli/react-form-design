const CracoLessPlugin = require('craco-less');
/* craco.config.js */
module.exports = {
  // ...
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#578AEC' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
