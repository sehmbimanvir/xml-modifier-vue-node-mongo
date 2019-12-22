import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import NotFound from '../components/404'
import Register from '../components/Auth/Register'
import ParseXML from '../components/XMLParser/Parse'
import { AuthGuard } from '../middleware/auth'
import { GuestGuard } from '../middleware/guest'

Vue.use(VueRouter)

const routes = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    }, {
      path: '/login/:token?',
      name: 'Login',
      component: Login,
      beforeEnter: GuestGuard,
      meta: {
        title: 'Login'
      }
    }, {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: GuestGuard,
      meta: {
        title: 'Register'
      }
    }, {
      path: '/xml/parse',
      name: 'ParseXML',
      component: ParseXML,
      beforeEnter: AuthGuard,
      meta: {
        title: 'XML Modifier'
      }
    }, {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})

routes.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Untitled'
  next()
})

export default routes
