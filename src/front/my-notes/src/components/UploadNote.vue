<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              :counter="25"
              :rules="messageRules"
              :value="title"
              label="Title"
              @input="onChangeTitle"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-file-input
              :rules="fileRules"
              label="Note"
              show-size
              truncate-length="15"
              @change="onChangeFile"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-btn
          :disabled="!valid"
          class="mr-4"
          color="success"
          @click="uploadNote"
      >
        Validate
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Modify',
  data: () => ({
    file: null,
    title: null,
    valid: true,
    messageRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ],
    fileRules: [
      v => !!v || 'File is required'
    ]
  }),
  created() {
    if (this.mode === "modifyExistingNote") this.getTitle()
  },
  watch: {
    $route() {
      if (this.mode === "modifyExistingNote") this.getTitle()
    }
  },
  props: {
    id: String,
    mode: String
  },
  methods: {
    getTitle() {
      this.$axios
          .get(`http://localhost:3000/note/title/${this.id}`)
          .then((title) => {
            this.title = title.data
          })
          .catch((err) => {
            console.error(err)
          })
    },
    onChangeFile(file) {
      if (file !== undefined) this.file = file
    },
    onChangeTitle(title) {
      if (title !== undefined) this.title = title
    },
    uploadNote() {
      let config = { headers: { 'Content-Type': 'multipart/form-data' } };
      let formData = new FormData();
      formData.append('file', this.file);
      if (this.mode === "modifyExistingNote") {
        this.$axios
          .patch( `http://localhost:3000/note/${this.id}?title=${this.title}`, formData, config)
          .then(() => {
            this.$router.push({ path: '/'})
          })
          .catch((err) => { console.error(err) })
      } else if (this.mode === "addNewNote") {
        this.$axios
          .put( `http://localhost:3000/note?title=${this.title}`, formData, config)
          .then(() => {
            this.$router.push({ path: '/'})
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }
}

</script>