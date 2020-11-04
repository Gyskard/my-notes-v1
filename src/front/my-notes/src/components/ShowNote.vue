<template>
  <div>
    <div v-if="note">
        <p>{{ note }}</p>
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

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      list: null,
      err: null,
    };
  },
  beforeCreate() {
    axios
      .get("http://localhost:3000/note/1")
      .then((note) => {
        this.note = note;
      })
      .catch((err) => {
        this.err = err;
      });
  },
};
</script>
