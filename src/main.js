import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', component: require('./pages/WelcomePage.vue').default},
  { path: '/home', component: require('./pages/HomePage.vue').default},
  { path: '/favs', component: require('./pages/FavoritePage.vue').default},
  { path: '/my-reviews', component: require('./pages/MyReviewsPage.vue').default},
]

const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')