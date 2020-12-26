<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
                :rules="messageRules"
                :counter="25"
                label="Title"
                :value="title"
                @change="onChangeTitle"
                required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-file-input
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
            @click="updateFile"
        >
          Validate
        </v-btn>
        <div v-if="this.err" class="pt-5">
          <p>{{ this.err }}</p>
        </div>
      </v-container>
    </v-form>
    <div class="pt-5">
      <v-divider></v-divider>
      <div class="ms-7 pt-3">
        <ShowNote :note="note" :err="err"/>
      </div>
    </div>
  </div>
</template>

<script>
import ShowNote from "@/components/ShowNote.vue";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: 'Modify',
  components: {
    ShowNote
  },
  data: () => ({
    note: null,
    title: null,
    err: null,
    file: null,
    valid: true,
    messageRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ]
  }),
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
            this.err = null
          })
          .catch((err) => {
            this.note = null;
            this.err = err
          });
      axios
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
    updateFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      axios.patch( `http://localhost:3000/note/${this.id}?title=${this.title}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          ).then(() => {
            this.$router.push({ path: '/'})
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
