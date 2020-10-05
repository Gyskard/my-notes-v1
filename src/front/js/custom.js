const apiUrl = 'http://localhost:3000'

new Vue({
    el: '#list',
    data () {
      return {
        list: null
      }
    },
    mounted () {
      axios
        .get(`${apiUrl}/list`)
        .then(response => (this.list = response.data))
    }
  })