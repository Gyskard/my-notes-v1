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
              @input="onChangeFile"
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
import axios from "axios";

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
  created() { this.mode === "modifyExistingNote" ? this.getTitle() : false },
  watch: {
    $route() { this.mode === "modifyExistingNote" ? this.getTitle() : false },
  },
  props: {
    id: String,
    mode: String
  },
  methods: {
    getTitle() {
      axios
          .get(`http://localhost:3000/note/title/${this.id}`)
          .then((title) => { this.title = title.data })
          .catch((err) => { console.error(err) });
    },
    onChangeFile(file) { if (file !== undefined) this.file = file },
    onChangeTitle(title) { if (title !== undefined) this.title = title },
    uploadNote() {
      if (this.mode === "modifyExistingNote") {
        let formData = new FormData();
        formData.append('file', this.file);
        axios.patch( `http://localhost:3000/note/${this.id}?title=${this.title}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        ).then(() => { this.$router.push({ path: '/'}) })
        .catch((err) => { console.error(err) })
      }
    }
  }
}

</script>