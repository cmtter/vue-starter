/**
 * 应用RuneTime配置
 * @author xiufu.wang
 */
export default {
  /**
   * 路由拦截处理
   * 用户处理菜单访问权限
   */
  async doRouterIntercept(to, from, next){
    if (to, from, next){
      console.log('----------');
    }
  },

  /**
   * 获取当前用户信息
  */
  async getUser(){

  },

  /**
   * 是否登录
   */
  async loggedIn(){

  },

  /**
   * 默认首页
   * @returns path
   */
  async resolveHomePage(){

  },

  /**
   * 交互异常
   */
   async resolveException(){

  },

  //解析http异常,并返回消息
  resolveHttpException(){

  }
} 