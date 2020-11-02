<template>
  <v-app>
    <div id="app">
      <v-card color="grey lighten-4" flat tile>
        <v-toolbar>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>My notes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
      <v-content>
        <NoteList />
      </v-content>
    </div>
  </v-app>
</template>

<script>
import NoteList from "./components/NoteList.vue";

export default {
  name: "App",

  components: {
    NoteList,
  },
};
</script>
