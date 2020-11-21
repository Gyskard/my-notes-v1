<template>
  <div>
    <div>
      <ActionsNote :title="title" :err="err" :deleteNote="deleteNote" />
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
    this.getNote();
  },
  watch: {
    $route() {
      this.getNote();
    },
  },
  methods: {
    updateId() {
      this.id = this.$route.params.id;
    },
    getNote() {
      this.updateId();
      axios
        .get(`http://localhost:3000/note/${this.id}`)
        .then((note) => {
          this.note = note.data;
          console.log(note)
          this.title = "test3";
          this.err = null
        })
        .catch((err) => {
          this.note = null;
          this.title = null;
          this.err = err
        });
    },
    deleteNote() {
      axios.delete(`http://localhost:3000/note/${this.id}`)
    }
  },
};
</script>
