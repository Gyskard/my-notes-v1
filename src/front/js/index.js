const Note = {
  template: `
    <div>
      <h2>Note {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const NoteList = {
  template: `
    <h3>List</h3>
    <router-view></router-view>
  `,
  data () {
    return {
      list: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    axios
      .get('http://localhost:3000/list')
      .then(reponse => (this.list = reponse))
    console.log(this.list)
  }
}

const NoteShow = { template: '<div>show</div>' }
const NoteEdit = { template: '<div>edit</div>' }

const router = new VueRouter({
  routes : [
    {
      path: '/list', component: NoteList,
      path: '/note/:id', component: Note,
      children: [
        { path: 'show', component: NoteShow },
        { path: 'edit', component: NoteEdit }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
