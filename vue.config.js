/**
 * vue-cli 配置扩展
 * @author xiufu.wang
 */
const globby = require('globby')
const { sep, resolve } = require('path')
const bodyParser = require('body-parser')

function getMocks(cwd) {
  const _files = globby.sync(['**/*.js'], { cwd })
  const mocks = _files.map(r => ({
    [r]: require(resolve(cwd, r))
  }))

  return mocks.reduce((apis, defs) => {
    const r = Object.keys(defs)[0]
    const reqUrl = ('/' + ['mock', ...(r.split(sep))].join('/')).replace(/\.(js|ts)/g, '')
    Object.keys(defs[r]).forEach(function (prop) {
      if (defs[r][prop]) {
        const _hurl = reqUrl + (prop === 'default' ? '' : '/' + prop)
        apis[_hurl.toLowerCase()] = defs[r][prop]
      }
    })
    return apis
  }, {})
}

module.exports = function () {
  return {
    //构建输出目录
    outputDir: process.env.VUE_OUTPUT_DIR,
    //静态输出目录,相对于outputDir
    assetsDir: process.env.VUE_PUBLIC_PATH.slice(1),
    chainWebpack(webpackConfig) {

      // 路由自动生成差价
      webpackConfig
        .plugin('joyinrouter')
        .use(require('./cli/plugins/joyinrouter-webpack-plugin'), [{}])

      //路径别名
      webpackConfig.resolve.alias.delete('@')
      webpackConfig.resolve.alias.set('@', resolve(__dirname, './src'))

      // devMock
      webpackConfig.devServer.before((app) => {
        const mocksApi = getMocks(resolve(__dirname, './mock'))
        const urlencoded = bodyParser.urlencoded({ extended: false })
        const jsonParser = bodyParser.json()
        const rawParser = bodyParser.raw()
        app.use(function (req, res, next) {
          if (req.url.indexOf('/mock') < 0) {
            return next()
          }
          urlencoded(req, res, (err) => {
            if (err) return next(err)
            jsonParser(req, res, (err) => {
              if (err) return next(err)
              rawParser(req, res, next)
            })
          })
        })

        Object.keys(mocksApi).forEach(function (reqUrl) {
          const fn = mocksApi[reqUrl] instanceof Function ? mocksApi[reqUrl] : () => mocksApi[reqUrl]
          app.get(reqUrl, fn)
          app.post(reqUrl, fn)
        })
      })
    }
  }
}