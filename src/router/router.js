import VueRouter from 'vue-router';
import Vue from 'vue';
import Login from './../components/login/Login.vue';
import Container from './../components/Container.vue';
import Settings from './../Settings.vue';
import About from './../About';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            alias: '/login',
            component: Login
        },
        {
            path: '/blog',
            name: 'container',
            component: Container
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
});
