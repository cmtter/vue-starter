<template>
  <div style="height: 100%;">
    <IframeLoader
      :iframes="iframes"
      :current="current"
    ></IframeLoader>
    <router-view></router-view>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'
import IframeLoader from '@/components/moduleloads/iframe-loader'
export default defineComponent({
  name: 'bbbB',
  components: {
    IframeLoader
  },
  setup() {
    //缓存iframe页面
    const iframes = ref([])
    //缓存 Vue route页面
    const vueRoutes = ref([])
    // 当前显示的iframe
    const current = ref({ key: null })

    return {
      iframes,
      vueRoutes,
      current
    }
  },
})
</script>
<style lang="scss">
</style>

