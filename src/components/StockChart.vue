<template>
  <v-chart :options="chartOption" ref="myChart" :autoresize="true"></v-chart>
</template>

<script>
import ECharts from 'vue-echarts'
import {mapGetters, mapActions} from "vuex";
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'

export default {
  name: "StockChart",
  components: {
    'v-chart': ECharts
  },
  computed: {
    ...mapGetters({
      stockPrice: 'getStockPrice',
      holdingPeriod: 'getHoldingPeriod',
      profit: 'getProfit',
      isChartLoading: 'getChartLoading',
      ti1: 'getTI1',
      ti2: 'getTI2',
      ti3: 'getTI3',
      ti4: 'getTI4',
    }),
    hp_update() {
      return this.holdingPeriod
    },
    chart_loading_state() {
      return this.isChartLoading
    }
  },
  methods: {
    ...mapActions([
      'actionChartLoading'
    ])
  },
  watch: {
    chart_loading_state: function () {
      if (this.isChartLoading)
        this.$refs.myChart.showLoading()
      else
        this.$refs.myChart.hideLoading()
    },
    hp_update: function () {
      const x = []
      for (let i = 0; i < this.stockPrice.length; i++) {
        x.push(i + 1)
      }
      this.chartOption.dataset.source = [
        x,
        this.stockPrice,
        this.holdingPeriod,
        this.ti1,
        this.ti2,
        this.ti3,
        this.ti4
      ]
      this.actionChartLoading(false)
    }
  },
  data() {
    return {
      chartOption: {}
    }
  },
  mounted() {
    this.$refs.myChart.showLoading()
    this.chartOption = {
      dataset: {
        source: []
      },
      xAxis: {
        type: 'category',
        boundaryGap:
            false
      },
      yAxis: {
        type: 'value',
        boundaryGap:
            ['1%', '1%'],
        scale: true,
      },
      grid: {
        left: '5%',
        right: '7%',
        top: '20%',
        bottom: '15%'
      },
      legend: {
        type: 'plain',
        show: true,
        orient: 'horizontal',
        top: '8%',
        left: 'center',
        width: '80%',
        padding: [5, '60%', 5, 5]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          label: {
            show: true,
            precision: 2,
          }
        }
      },
      dataZoom: [
        {
          type: 'inside',
          filterMode: 'none',
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          filterMode: 'none',
          yAxisIndex: 0,
          start: 0,
          end: 100
        },
        {
          type: 'slider',
          filterMode: 'none',
          start: 0,
          end: 100,
          height: '5%',
          fillerColor: 'rgba(180,180,180,0.5)',
          dataBackground: {
            lineStyle: {
              opacity: 0
            },
            areaStyle: {
              opacity: 0
            }
          }
        },
        {
          type: 'slider',
          filterMode: 'none',
          yAxisIndex: 0,
          start: 0,
          end: 100,
          width: '3%',
          fillerColor: 'rgba(180,180,180,0.5)',
          dataBackground: {
            lineStyle: {
              opacity: 0
            },
            areaStyle: {
              opacity: 0
            }
          }
        }
      ],
      toolbox: {
        show: true,
        orient: 'horizontal',
        left: 'right',
        top: 'top',
        feature: {
          mark: {show: true},
          restore: {show: true, title: '重置'},
          saveAsImage: {
            show: true,
            title: '另存圖片'
          },
          dataZoom: {
            title: {
              zoom: '區域縮放', back: '區域縮放還原',
              filterMode: 'none'
            }
          }
        }
      },
      series: [
        {
          name: '股價',
          type: 'line',
          smooth: 0,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: {
            width: 3
          },
          seriesLayoutBy: 'row'
        },
        {
          name: '持有區間',
          type: 'line',
          smooth: 0,
          symbol: 'none',
          symbolSize: 0,
          lineStyle: {
            width: 3
          },
          seriesLayoutBy: 'row',
          areaStyle: {color: 'rgba(0,180,0,0.4)'}
        },
        {
          name: '買1',
          type: 'line',
          smooth: 0,
          symbol: 'none',
          symbolSize: 8,
          lineStyle: {
            width: 2
          },
          seriesLayoutBy: 'row',
        },
        {
          name: '買2',
          type: 'line',
          smooth: 0,
          symbol: 'none',
          symbolSize: 8,
          lineStyle: {
            width: 2
          },
          seriesLayoutBy: 'row',
        },
        {
          name: '賣1',
          type: 'line',
          smooth: 0,
          symbol: 'none',
          symbolSize: 1,
          lineStyle: {
            width: 2
          },
          seriesLayoutBy: 'row',
        },
        {
          name: '賣2',
          type: 'line',
          smooth: 0,
          symbol: 'none',
          symbolSize: 1,
          lineStyle: {
            width: 2
          },
          seriesLayoutBy: 'row',
        },
      ],
      visualMap: {
        type: 'piecewise',
        show: false,
        seriesIndex: 1,
      },
    }
    this.$refs.myChart.hideLoading()
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
</style>