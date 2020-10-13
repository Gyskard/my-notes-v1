const Note = {
  template: `
    <div>
      <h2>Note {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const List = {
  template: `
    <div>
      <h2>List</h2>

      <div v-if="list">
        <ul>
          <li v-for="note in list">
          <router-link :to="{path: '/note/' + note.number}">{{ note.title }}</router-link>
          </li>
        </ul>
      </div>

      <div v-if="err">
        <p>{{ err }}</p>
      </div>

    </div>
  `,
  data () {
    return {
      list: null,
      err: null
    }
  },
  beforeRouteEnter (to, from, next) {
    axios
      .get('http://localhost:3000/list')
      .then(list => {
        next(vm => vm.setData('', list))
      })
      .catch(err => {
        next(vm => vm.setData(err, ''))
      })
  },
  methods: {
    setData (err, list) {
      if (err) this.err = err
      else this.list = list.data
    }
  }
}

const NoteShow = { template: '<div>show</div>' }
const NoteEdit = { template: '<div>edit</div>' }

const router = new VueRouter({
  routes : [
    {
      path: '/list', component: List
    },
    {
      path: '/note/:id', component: Note,
      children: [
        { path: 'show', component: NoteShow },
        { path: 'edit', component: NoteEdit }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
