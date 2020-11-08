<template>
  <div>
    <div>
      <ActionsNote :title="title" :err="err" />
    </div>
    <v-divider></v-divider>
    <div class="ms-7">
      <ShowNote :note="note" :err="err"/>
    </div>
  </div>
</template>

<script>
import ShowNote from "@/components/ShowNote.vue";
import ActionsNote from "@/components/ActionsNote.vue";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "Note",
  components: {
    ShowNote,
    ActionsNote,
  },
  data() {
    return {
      title: null,
      note: null,
      err: null,
      id: null,
    };
  },
  created() {
    this.getTitle();
    this.getNote();
  },
  watch: {
    $route() {
      this.getTitle();
      this.getNote();
    },
  },
  methods: {
    updateId() {
      this.id = this.$route.params.id;
    },
    getTitle() {
      this.updateId();
      axios
        .get(`http://localhost:3000/list`)
        .then((list) => {
          let title = "test";
          for (const note in list) {
            console.log(note)
          }
          this.title = title;
          this.err = null;
        })
        .catch((err) => {
          this.title = null;
          this.err = err;
        });
    },
    getNote() {
      this.updateId();
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
