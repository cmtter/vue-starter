<template>
  <div>
    <br />
    <Card class="box-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span>卡片名称de</span>
      </div>
      {{rrr}}
    </Card>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api'
import { Card } from 'element-ui'
export default defineComponent({
  name: 'bbbB',
  data() {
    const rrr = this.$route.params
    return {
      rrr
    }
  },
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

