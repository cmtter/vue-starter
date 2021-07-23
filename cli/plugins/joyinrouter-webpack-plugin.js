/**
 * 路由生成插件
 * @author xiufu.wang
 */

module.exports = function (options) {

  const cache = new WeakMap()

  function isChangeRouter() {
    return false
  }

  this.apply = (compiler) => {

    //初始化 .joyin/routes.js文件
    compiler.hooks.environment.tap('joyin-router-init', (compiler) => {

    })

    compiler.hooks.watchRun.tap('joyin-router', (compiler) => {
      if (isChangeRouter()) {
        // 改变则修改router  
      }
    })
  }
}