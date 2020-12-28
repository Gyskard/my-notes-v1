<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
              :rules="messageRules"
              :counter="25"
              label="Title"
              @change="onChangeTitle"
              required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-file-input
              :rules="fileRules"
              show-size
              truncate-length="15"
              label="Note"
              @change="onChangeFile"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="uploadFile"
      >
        Validate
      </v-btn>
      <div v-if="this.err" class="pt-5">
        <p>{{ this.err }}</p>
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Add',
  data: () => ({
    file: null,
    title: null,
    err: null,
    valid: true,
    messageRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ],
    fileRules: [
      v => !!v || 'File is required'
    ]
  }),
  methods: {
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      this.$axios.put( `http://localhost:3000/note?title=${this.title}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((e) => {
        this.$router.push({ path: `/note/${e.data}`})
      })
      .catch((err) => {
        this.err = err.response.data
      })
    },
    onChangeFile(file) {
      if (file !== undefined) this.file = file
    },
    onChangeTitle(title) {
      if (title !== undefined) this.title = title
    }
  }
}
</script>
