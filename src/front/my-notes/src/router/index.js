import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Note from '../views/Note.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  }
]

const router = new VueRouter({
  routes
})

export default router
