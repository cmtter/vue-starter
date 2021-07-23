<template>
  <div>
    <br />
    <Card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>卡片名称</span>
      </div>
      fasf
      fasfd
      as
      df
    </Card>
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

