<template>
  <router-view></router-view>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'
import { Card } from 'element-ui'
export default defineComponent({
  name: 'bbbB',
  components: {
    Card
  },
  setup() {
    console.log('----------------');
    const a = ref(2222)
    return {
      a
    }
  },
})
</script>
<style lang="scss">
</style>

