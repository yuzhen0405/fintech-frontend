<template>
  <b-container fluid="auto">
    <b-row align-h="center" class="mt-2">
      <b-col md="4" align-self="center">
        <MAParamForm/>
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
import MAParamForm from "@/components/ParamForm/MAParamForm";
import StockChart from "@/components/StockChart";
import StrategyResult from "@/components/StrategyResult";

export default {
  name: 'Custom',
  components: {
    MAParamForm,
    StockChart,
    StrategyResult
  }
}
</script>
