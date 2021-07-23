module.exports = {
  presets: [
    ['@vue/app', {
      targets: { ie: 10 },
      // 参考 F:\all-projects\ningbo\vue-pro\vue-starter\node_modules\core-js-compat\entries.json
      polyfills: [
        "es.weak-map",
        "es.weak-set",
        "es.aggregate-error",
        "es.object.to-string",
        "es.promise",
        "es.promise.all-settled",
        "es.promise.any",
        "es.promise.finally",
        "es.string.iterator",
        "web.dom-collections.iterator"
      ]
    }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}