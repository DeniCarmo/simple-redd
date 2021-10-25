import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('truncateURL', function(val){
  if(val.length > 30){
    return val.substring(0, 29) + '...'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
