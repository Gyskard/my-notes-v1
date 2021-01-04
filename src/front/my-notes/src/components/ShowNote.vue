<template>
  <v-container>
    <div v-if="this.note">
      <vue-markdown>{{ this.note }}</vue-markdown>
    </div>
  </v-container>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  name: 'ShowNote',
  props: ['note', 'err'],
  components: {
    VueMarkdown
  }
};
</script>
