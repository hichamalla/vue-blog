import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsPost from '../views/DetailsPost.vue'
import CreatePost from '../views/CreatePost.vue'
import Tag from '../views/tag.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/post/:idx',
      name:'postDetails',
      component: DetailsPost,
      props:true

    },
    {
      path:'/createPost',
      name:'createPost',
      component: CreatePost,
      // props:true

    },
    {
      path:'/tags/:tag',
      name:'tags',
      component: Tag,
      props:true

    }
  ]
})

export default router
