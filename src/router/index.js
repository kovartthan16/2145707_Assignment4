import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Import the login view
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Add the registration route
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    //Add the login route
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },

    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WishlistView.vue')
    }
  ]
})

export default router
