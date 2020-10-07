import * as types from './mutations_type.js'

export const state = {
    trading_strategy: {},
    profit: 0,
    stock_price: [0],
    holding_period: [0],
    chartLoading: false,
    ti1: [0],
    ti2: [0],
    ti3: [0],
    ti4: [0],
}

export const mutations = {
    [types.UPDATE](state, result) {
        state.trading_strategy = result['strategy']
        state.profit = result['profit']
        state.stock_price = result['stock price']
        state.holding_period = result['holding period']
        state.ti1 = result['ti1']
        state.ti2 = result['ti2']
        state.ti3 = result['ti3']
        state.ti4 = result['ti4']
        console.log("ti1: " + result['ti1'])
        console.log("ti2: " + result['ti2'])
        console.log("ti3: " + result['ti3'])
        console.log("ti4: " + result['ti4'])
    },
    [types.CHART_LOADING](state, isLoading) {
        state.chartLoading = isLoading
    }
}