import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/authpage',
    name: 'AuthPage',
    component: () => import('../views/AuthPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: () => import('../views/AdminPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/paiduserpage',
    name: 'PaidUserPage',
    component: () => import('../views/PaidUserPage.vue'),
    meta: { requiresAuth: true, requiresPaidUser: true }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('../views/Roles.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/** 
 * ROUTE GUARD 1
 * Checks if User is Authenticated
 * Uses meta : requiresAuth
 **/
router.beforeEach((to, from, next) => {

  //Route has meta => requiresAuth : true
  if (to.matched.some(record => record.meta.requiresAuth)) {

    //USER AUTHENTICATED
    if (store.getters['users/isUserAuth']) {
      next()

    } else {
      //USER IS NOT AUTHENTICATED
      store.dispatch('snackbar/showSnackAction', { text: "User should be signed in", color: "error" })
      next('/signin')
    }

  } else {
    //Route has meta => requiresAuth : false
    next()
  }
})

/** 
 * ROUTE GUARD 2
 * Checks if User is Authenticated & User is Admin
 * Uses meta : requiresAdmin 
 **/
router.beforeEach((to, from, next) => {

  //Route has meta => requiresAdmin : true
  if (to.matched.some(record => record.meta.requiresAdmin)) {

    //USER IS ADMIN
    if ((store.getters['users/isUserAuth']) && (store.getters['users/isUserAdmin'])) {
      next()
    } else {
      //USER IS NOT ADMIN
      store.dispatch('snackbar/showSnackAction', { text: "User should have 'admin' access", color: "error" })
      next('/')
    }

  } else {
    //Route has meta => requiresAdmin : false
    next()
  }
})

/** 
 * ROUTE GUARD 3
 * Checks if User is Authenticated & User is paid
 * Uses meta : requiresPaidUser 
 **/
router.beforeEach((to, from, next) => {

  //Route has meta => requiresPaidUser : true
  if (to.matched.some(record => record.meta.requiresPaidUser)) {

    //USER IS PAID
    if ((store.getters['users/isUserAuth']) && (store.getters['users/isUserPaid'])) {
      next()
    } else {
      //USER IS NOT PAID
      store.dispatch('snackbar/showSnackAction', { text: "User should have 'paid' user access", color: "error" })
      next('/')
    }

  } else {
    //Route has meta => requiresPaidUser : false
    next()
  }
})

export default router