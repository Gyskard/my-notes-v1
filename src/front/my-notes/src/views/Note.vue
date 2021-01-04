<template>
  <div>
    <div>
      <ActionsNote :id="id" :title="title" :deleteNote="deleteNote" />
    </div>
    <v-divider></v-divider>
    <div class="ms-7">
      <ShowNote :note="note" />
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
          this.note = note.data
        })
        .catch((err) => {
          console.error(err)
        });
      this.$axios
        .get(`http://localhost:3000/note/title/${this.id}`)
        .then((title) => {
          this.title = title.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deleteNote() {
      this.$axios
          .delete(`http://localhost:3000/note/${this.id}`)
          .then(() => this.$router.push({ path: '/'}))
    }
  }
}
</script>
