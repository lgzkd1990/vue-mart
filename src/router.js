import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import store from './store';
import History from './utils/history';

Vue.use(Router);
Vue.use(History);

// 实例化之前，扩展Router
Router.prototype.goBack = function () {
  this.isBack = true;
  this.back();
};
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      });
    }
  } else {
    next();
  }
});
// afterEach记录历史记录
router.afterEach((to, from) => {
  if (router.isBack) {
    // 后退
    History.pop();
    router.isBack = false;
    router.transitionName = 'route-back'; // 动画名称
  } else {
    History.push(to.path);
    router.transitionName = 'route-forward';
  }
});

export default router;

