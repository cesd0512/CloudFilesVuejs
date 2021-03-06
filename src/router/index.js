import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import FirstPage from '../views/FirstPage.vue'
import Login from '../views/Login.vue'
import PasswordReset from '../views/PasswordReset.vue'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('../views/Files.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/segurity',
    name: 'Segurity',
    component: () => import('../views/Segurity.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/api-connection',
    name: 'ApiConnection',
    component: () => import('../views/ApiConnection.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    if (store.getters.isAuthenticated) {
      next('/');
      return;
    }
    next();
  }
});


export default router
