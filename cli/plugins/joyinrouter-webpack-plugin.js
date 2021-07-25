/**
 * 路由生成插件
 * @author xiufu.wang
 */
const globby = require('globby')
const { resolve } = require('path')
const jetpack = require('fs-jetpack');
const prettier = require('prettier')
const template = require('art-template');

function createRouteInfo(pathStr) {
  const normalFile = pathStr.replace(/\\/g, '/').replace(/\/\//g, '/')
  const nameSeps = normalFile.split('/')
  const fileName = nameSeps[nameSeps.length - 1].replace(/\.vue/g, '')
  let routeName, routePath, routeComponent;
  //去路径的最后两级目录作为名称
  let r = nameSeps[nameSeps.length - 1].toLocaleLowerCase()
  // 删除动态标记
  r = r[0] === '~' ? r.slice(1) : r
  //删除.vue
  r = r.replace(/\.vue/g, '')
  routeComponent = '@/views/' + normalFile
  routePath = nameSeps.slice(0, nameSeps.length - 1).join('/') + (r === 'index' ? (fileName[0] === '~' ? '/:id' : '') : ('/' + r + (fileName[0] === '~' ? '/:id' : '')))
  routeName = nameSeps.length > 1 ? (nameSeps[nameSeps.length - 2] + r) : r
  return {
    routeName: routeName,
    routePath: routePath[0] === '/' ? routePath.slice(1) : routePath,
    routeComponent: routeComponent,
    meta: { title: routeName }
  }
}

function globPaths(rootPath) {
  return globby.sync(['**/*.*(jsx|vue)'], {
    cwd: rootPath,
    ignore: ['**/commons/**/*.*(vue)', '**/components/**/*.*(vue)', '**/_*/*.*(vue)', '**/-*/*.*(vue)', '**/-*.*(vue)', '**/_*.*(vue)']
  })
}

//格式化代码
function pretterFormat(code, parser) {

  const CURSOR_PLACEHOLDER = "<|>";
  const RANGE_START_PLACEHOLDER = "<<<PRETTIER_RANGE_START>>>";
  const RANGE_END_PLACEHOLDER = "<<<PRETTIER_RANGE_END>>>";

  const indexProperties = [
    {
      property: "cursorOffset",
      placeholder: CURSOR_PLACEHOLDER,
    },
    {
      property: "rangeStart",
      placeholder: RANGE_START_PLACEHOLDER,
    },
    {
      property: "rangeEnd",
      placeholder: RANGE_END_PLACEHOLDER,
    },
  ];

  function replacePlaceholders(originalText, originalOptions) {
    const indexes = indexProperties
      .map(({ property, placeholder }) => {
        const value = originalText.indexOf(placeholder);
        return value === -1 ? undefined : { property, value, placeholder };
      })
      .filter(Boolean)
      .sort((a, b) => a.value - b.value);

    const options = { ...originalOptions };
    let text = originalText;
    let offset = 0;
    for (const { property, value, placeholder } of indexes) {
      text = text.replace(placeholder, "");
      options[property] = value + offset;
      offset -= placeholder.length;
    }
    return { text, options };
  }

  const { text, options } = replacePlaceholders(
    code,
    {}
  );

  const res = prettier.formatWithCursor(text, {
    singleQuote: false,
    jsxSingleQuote: true,
    parser: parser
  })
  return res.formatted
}

module.exports = function (options = {}) {
  options = options || {}
  let preRouteFileList = []
  const rootPath = options.rootPath || resolve(__dirname, '../../src/views')
  function generatorRender() {
    let customerRouters = globPaths(rootPath)
    customerRouters = customerRouters.map((routeFile) => {
      const a = routeFile.toLocaleLowerCase()
      if (a === '404.vue' || a === '500.vue' || a === 'login.vue') {
        return null
      }
      const routeInfo = createRouteInfo(routeFile)
      return `
        {
          name: '${routeInfo.routeName}',
          component: () => import(/* webpackChunkName: "router-${routeInfo.routeName}" */'${routeInfo.routeComponent}'),
          path: '${routeInfo.routePath}',
          meta: {title: '${routeInfo.meta.title}'}
        }
      `
    })

    customerRouters.push(
      `
       {
        name: 'iframe',
        path: 'iframe',
        meta: {title: 'iframe'},
        component: () => import(/* webpackChunkName: "router-iframe" */'@/components/moduleloads/iframe-router.vue')
       }
      
      `
    )

    const routesContent = `
      export default [
          {
            path: '/main',
            component: () => import(/* webpackChunkName: "router-userlayout" */'@/layout/UseLayout.vue'),
            children: [
              ${customerRouters.filter(r => !!r).join(',')}
            ]
          },
          { path: '/login', component: () => import(/* webpackChunkName: "router-login" */'@/views/login.vue') },
          { path: '/500/:code', component: () => import(/* webpackChunkName: "router-500" */'@/views/500.vue') },
          { path: '*', component: () => import(/* webpackChunkName: "router-404" */'@/views/404.vue') }
        ]
        `
    let content = jetpack.read(resolve(__dirname, '../tpls/router.tpl'))
    content = pretterFormat(template.render(content, { routesContent }, { escape: false, compileDebug: true }), 'flow')
    jetpack.write(resolve(__dirname, '../../.joyin/routes.js'), content)
  }

  this.apply = (compiler) => {
    //初始化 .joyin/routes.js文件
    compiler.hooks.environment.tap('joyin-router-init', () => {
      generatorRender()
    })

    compiler.hooks.watchRun.tap('joyin-router', (compiler) => {
      let currentRouteFileList = globPaths(rootPath)
      // 文件目录发生变化的时候，终端当前watch编译，重新生成路由文件
      if (preRouteFileList.join('') !== currentRouteFileList.join('')) {
        // 终端本次watch编译
        compiler.watchFileSystem.watcher.pause()
        generatorRender()
        preRouteFileList = currentRouteFileList
      }
    })
  }
}