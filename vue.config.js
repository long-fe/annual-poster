const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/annual" : "/",
    outputDir: "annual",
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    filenameHashing: false,
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    lintOnSave: process.env.NODE_ENV !== "production",
    //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    // 所有 webpack-dev-server 的选项都支持。
    devServer: {
      host: "localhost",
      port: 8080, // 端口号
      https: false,
      open: true, //配置自动启动浏览器
      // 配置多个代理
      proxy: {
        "/proxy": {
          target: "http://120.79.67.211:8081", //
          changeOrigin: true,
        },
      }
    }
  };