<template>
  <div>
    <div v-if="note">
        <vue-markdown># test</vue-markdown>
        <vue-markdown>{{ note }}</vue-markdown>
    </div>

    <div v-if="err">
      <p>{{ err }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMarkdown from 'vue-markdown';

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      note: null,
      err: null,
    };
  },
  components: {
    VueMarkdown
  },
  beforeCreate() {
    axios
      .get("http://localhost:3000/note/1")
      .then((note) => {
        this.note = note.data;
      })
      .catch((err) => {
        this.err = err;
      });
  },
};
</script>
