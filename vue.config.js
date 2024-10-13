const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // Desativa o ESLint
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // Outras opções de configuração do Electron Builder
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'BMVE Comercio'; // Defina o título desejado aqui
        return args;
      });
  }
});
