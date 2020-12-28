<template>
  <div>
    <div>
      <ActionsNote :id="id" :title="title" :err="err" :deleteNote="deleteNote" />
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
      this.$axios
        .get(`http://localhost:3000/note/${this.id}`)
        .then((note) => {
          this.note = note.data;
          this.err = null
        })
        .catch((err) => {
          this.note = null;
          this.err = err
        });
      this.$axios
        .get(`http://localhost:3000/note/title/${this.id}`)
        .then((title) => {
          this.title = title.data;
          this.err = null
        })
        .catch((err) => {
          this.title = null;
          this.err = err
        })
    },
    deleteNote() {
      this.$axios
          .delete(`http://localhost:3000/note/${this.id}`)
          .then(() => this.$router.push({ path: '/'}))
    }
  },
};
</script>
