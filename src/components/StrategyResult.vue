<template>
  <div>
    <h3>交易策略</h3>
    <p> 買入： MA({{ strategy['buy1'] }}) 穿 MA({{ strategy['buy2'] }}) </p>
    <p> 賣出： MA({{ strategy['sell1'] }}) 穿 MA({{ strategy['sell2'] }}) </p>
    <p> 報酬率: {{ Math.round((profit + Number.EPSILON) * 10000)/100 }}% </p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "StrategyResult",
  computed: {
    ...mapGetters({
      profit: 'getProfit',
      strategy: 'getStrategy'
    })
  }
}
</script>

<style scoped>

</style>