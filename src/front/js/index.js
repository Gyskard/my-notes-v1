const Note = {
  template: '<div>note {{ $route.params.id }}</note>'
}

const routes = [
  { path: '/user/:id', component: Note }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
