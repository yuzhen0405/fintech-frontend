<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="MA-param-form">
    <b-row class="mb-2">
      <b-col cols="4">指定股票代碼：</b-col>
      <b-col cols="8">
        <v-select id="select-symbol" class="mb-2" :options="my_options" label="title" v-model="form.symbol"
                  :aria-required="form.symbol===''">
          <template slot="option" slot-scope="option">
            <img :src="option.cardImage"/>
            {{ option.title }}
          </template>
        </v-select>
      </b-col>
      <b-col cols="4"> 自訂買入訊號：</b-col>
      <b-col cols="4">
        <b-input
            id="input-buy1"
            v-model="form.buy1"
            placeholder="買1"
            type="number"
            min="1"
            max="256"
            class="mb-2"
            :state="buy1State"
            aria-describedby="input-live-feedback"
            required></b-input>
        <b-form-invalid-feedback id="input-live-feedback"> 輸入範圍須介於 0 ~ 256</b-form-invalid-feedback>
      </b-col>
      <b-col cols="4">
        <b-input
            id="input-buy2"
            v-model="form.buy2"
            placeholder="買2"
            type="number"
            min="1"
            max="256"
            class="mb-2"
            :state="buy2State"
            aria-describedby="input-live-feedback"
            required></b-input>
        <b-form-invalid-feedback id="input-live-feedback"> 輸入範圍須介於 0 ~ 256</b-form-invalid-feedback>
      </b-col>
      <b-col cols="4">自訂賣出訊號：</b-col>
      <b-col cols="4">
        <b-input
            id="input-sell1"
            v-model="form.sell1"
            placeholder="賣1"
            type="number"
            min="1"
            max="256"
            class="mb-2"
            :state="sell1State"
            aria-describedby="input-live-feedback"
            required></b-input>
        <b-form-invalid-feedback id="input-live-feedback"> 輸入範圍須介於 0 ~ 256</b-form-invalid-feedback>
      </b-col>
      <b-col cols="4">
        <b-input
            id="input-sell2"
            v-model="form.sell2"
            placeholder="賣2"
            type="number"
            min="1"
            max="256"
            class="mb-2"
            :state="sell2State"
            aria-describedby="input-live-feedback"
            required></b-input>
        <b-form-invalid-feedback id="input-live-feedback"> 輸入範圍須介於 0 ~ 256</b-form-invalid-feedback>
      </b-col>

      <b-col cols="4">
        訓練起始日期：
      </b-col>
      <b-col cols="8">
        <b-datepicker
            id="training_start"
            v-model="form.start"
            class="mb-2"
            :state="date1State"
            required></b-datepicker>
      </b-col>
      <b-col cols="4">
        訓練截止日期：
      </b-col>
      <b-col cols="8">
        <b-datepicker
            id="training_end"
            v-model="form.end"
            class="mb-2"
            :state="date2State"
            required></b-datepicker>
      </b-col>
      <b-col cols="6">
        <b-button class="mb-2" type="submit" variant="primary">Submit</b-button>
      </b-col>
      <b-col cols="6">
        <b-button class="mb-2" type="reset" variant="danger">Reset</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {mapActions} from 'vuex'
import axios from "axios";
import {backendAddr} from "@/backend_address"

export default {
  name: "ParamForm",
  data() {
    return {
      form: {
        symbol: null,
        // buy signal
        buy1: '',
        buy2: '',
        // sell signal
        sell1: '',
        sell2: '',
        start: '', // first day of the training period
        end: '' // last day of the training period
      },
      show: true,
      my_options: []
    }
  },
  computed: {
    buy1State() {
      if (this.form.buy1 === '') {
        return null;
      }
      return this.form.buy1 >= 1 && this.form.buy1 <= 256;
    },
    buy2State() {
      if (this.form.buy2 === '') {
        return null;
      }
      return this.form.buy2 >= 1 && this.form.buy2 <= 256;
    },
    sell1State() {
      if (this.form.sell1 === '') {
        return null;
      }
      return this.form.sell1 >= 1 && this.form.sell1 <= 256;
    },
    sell2State() {
      if (this.form.sell2 === '') {
        return null;
      }
      return this.form.sell2 >= 1 && this.form.sell2 <= 256;
    },
    date1State() {
      if (this.form.start === '')
        return null

      const date1 = new Date(this.form.start)
      const date2 = new Date(this.form.end)
      if (date1.getDay() === 0 || date1.getDay() === 6 || date1.getTime() === date2.getTime())
        return false

      return true
    },
    date2State() {
      if (this.form.end === '')
        return null

      const date1 = new Date(this.form.start)
      const date2 = new Date(this.form.end)
      if (date2.getDay() === 0 || date2.getDay() === 6 || date1.getTime() === date2.getTime())
        return false

      return true
    }
  },
  mounted() {
    axios.get(backendAddr + '/api/stock/list/').then((response) => {

      response.data['stock list'].forEach(it => {
            const img_path = '/img/company_logo/'
            this.my_options.push({title: it, cardImage: img_path + it + '.png'})
          }
      )
    }).catch(function (error) {
      console.log(error);
    })
  },
  updated() {
    this.$nextTick(() => {
      if (this.form.start !== '' && this.form.end !== '') {
        const date1 = new Date(this.form.start)
        const date2 = new Date(this.form.end)
        if (date1 > date2) {
          this.form.start = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
          this.form.end = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
        }
      }
    })
  },
  methods: {
    ...mapActions([
      'actionCustomMA',
      'actionChartLoading'
    ]),
    onSubmit(evt) {
      evt.preventDefault()
      this.actionCustomMA(this.form)
      this.actionChartLoading(true)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.buy1 = ''
      this.form.buy2 = ''
      this.form.sell1 = ''
      this.form.sell2 = ''
      this.form.start = ''
      this.form.end = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
