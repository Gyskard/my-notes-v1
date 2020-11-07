<template>
  <v-container>
    <div v-if="note">
      <vue-markdown>{{ note }}</vue-markdown>
    </div>

    <div v-if="err">
      <p>{{ err }}</p>
    </div>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMarkdown from "vue-markdown";

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      note: null,
      err: null,
      id: null,
    };
  },
  components: {
    VueMarkdown,
  },
  created() {
    this.getNote();
  },
  watch: {
    $route() {
      this.getNote();
    },
  },
  methods: {
    getNote() {
      this.id = this.$route.params.id;
      axios
        .get(`http://localhost:3000/note/${this.id}`)
        .then((note) => {
          this.note = note.data;
          this.err = null;
        })
        .catch((err) => {
          this.note = null;
          this.err = err;
        });
    },
  },
};
</script>
