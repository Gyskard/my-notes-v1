import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Note from '../views/Note.vue'
import Add from '../views/Add.vue'
import Modify from '../views/Modify.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note
  },
  {
    path: '/modify/:id',
    name: 'Modify',
    component: Modify
  }
]

const router = new VueRouter({
  routes
})

export default router
