<template>
  <v-container>
    <div v-if="this.note">
      <vue-markdown>{{ this.note }}</vue-markdown>
    </div>

    <div v-if="this.err">
      <p>{{ this.err }}</p>
    </div>
  </v-container>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  props: ['note', 'err'],
  components: {
    VueMarkdown
  }
};
</script>
