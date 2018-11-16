import VueRouter from 'vue-router';
import Vue from 'vue';
import Login from './../components/login/Login.vue';
import Container from './../components/Container.vue';
import Settings from './../Settings.vue';
import About from './../About';
import Resources from './../components/resources/Resources.vue';

Vue.use(VueRouter);

const router = new VueRouter({
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
        },
        {
            path: '/resources',
            name: 'resources',
            component: Resources
        }
    ]
});

router.beforeEach((to, from, next)=> {
    if(to.name !== 'login') {
        //TODO: Authentication
        //! FOR NOW JUST GO
        next();
    } else {
        // if we're going to log in who cares if we're logged in?
        next();
    }
})

export default router;