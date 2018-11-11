// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false

Vue.filter('title', (value)=> {
    return value.substring(0,1).toUpperCase() + value.substring(1);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    router,
    store,
    template: '<App/>',
    render (h) { return h(App) }
});
