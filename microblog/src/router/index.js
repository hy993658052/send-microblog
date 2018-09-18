import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../views/index'
import Reg from '../views/reg'
import Login from '../views/login'
import User from '../views/user'
 
Vue.use(Router)

export default new Router({
  routes: [
    /*
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
    */
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
