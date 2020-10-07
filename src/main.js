import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin, LayoutPlugin, NavbarPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueHeadful from 'vue-headful'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Custom from "@/pages/Custom"
import Intro from "@/pages/Intro"
import Index from "@/pages/Index"
import Recommendation from "@/pages/Recommendation"
import store from './store'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)
Vue.use(NavbarPlugin)
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.component('vue-headful', vueHeadful);
Vue.component('v-select', vSelect);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,

    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/intro',
            name: 'Intro',
            component: Intro
        },
        {
            path: '/recommendation',
            name: 'Recommendation',
            component: Recommendation
        },
        {
            path: '/custom',
            name: 'Custom',
            component: Custom
        },
        // router 轉址
        {path: '/*', redirect: '/'}
    ]
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
