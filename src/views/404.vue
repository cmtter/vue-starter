<template>
  <div>
    404 {{cccc}}
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'
import { Card } from 'element-ui'
export default defineComponent({
  name: 'bbbB',
  components: {
    Card
  },
  computed: {
    cccc() {
      return this.$store.state.global.test
    }
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

