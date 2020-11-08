<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <div v-if="this.title">
          <div class="text-h5 text-decoration-underline">{{ this.title }}</div>
        </div>
        <div v-if="this.err">
          <div class="text-h5 text-decoration-underline">{{ this.err }}</div>
        </div>
      </v-col>
      <v-col cols="6" md="4">
        <v-btn depressed color="primary" class="ml-3"> Modify </v-btn>
        <v-btn depressed color="error" class="ml-3"> Delete </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["title", "err"],
};
</script>