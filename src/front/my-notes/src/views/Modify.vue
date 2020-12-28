<template>
  <div>
    <UploadNote :id="this.id" :mode="this.mode" />
  </div>
</template>

<script>
import UploadNote from "@/components/UploadNote.vue";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: 'Modify',
  components: {
    UploadNote
  },
  data: () => ({
    id: null,
    mode: "modifyExistingNote",
    messageRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 25) || 'Title must be less than 25 characters'
    ],
    fileRules: [
      v => !!v || 'File is required'
    ]
  }),
  methods: {
    updateId() {
      this.id = this.$route.params.id;
    }
  },
  created() { this.updateId() },
  watch: {
    $route() { this.updateId() }
  }
}
</script>
