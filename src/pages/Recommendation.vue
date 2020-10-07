<template>
  <b-container fluid="auto">
    <b-row align-h="center" class="mt-2">
      <b-col md="4" align-self="center">
        <RecommendForm/>
      </b-col>
      <b-col md="6">
        <StockChart/>
      </b-col>
    </b-row>
    <hr>
    <StrategyResult/>
  </b-container>
</template>

<script>
import RecommendForm from "@/components/ParamForm/RecommendForm";
import StockChart from "@/components/StockChart";
import StrategyResult from "@/components/StrategyResult";

export default {
  name: "Recommendation",
  components: {
    StrategyResult,
    RecommendForm,
    StockChart,
  }
}
</script>

<style scoped>

</style>