<template>
  <div style="height: 100%;">
    <iframe
      v-for="item in iframes"
      :src="item.target"
      :key="item.key"
      v-show="current && current.key === item.key"
    ></iframe>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    iframes: [],
    current: null
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss">
</style>

