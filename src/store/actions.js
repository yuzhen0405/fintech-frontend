import * as types from './mutations_type.js'
import axios from "axios";
import {backendAddr} from "@/backend_address";

export const actionCustomMA = ({commit}, form) => {
    const url = backendAddr + '/api/ma/custom/'

    axios({
        url: url,
        method: 'post',
        responseType: 'json',
        data: JSON.stringify(form),
    })
        .then(function (response) {
            console.log("response status = " + response)
            console.log("response data = " + response.data)
            commit(types.UPDATE, response.data)
        })
}

export const actionRecommendMA = ({commit}, form) => {
    const url = backendAddr + '/api/ma/recommend/'

    axios({
        url: url,
        method: 'post',
        responseType: 'json',
        data: JSON.stringify(form),
    })
        .then(function (response) {
            console.log("response status = " + response)
            console.log("response data = " + response.data)
            commit(types.UPDATE, response.data)
        })
}

export const actionChartLoading = ({commit}, isLoading) => {
    commit(types.CHART_LOADING, isLoading)
}