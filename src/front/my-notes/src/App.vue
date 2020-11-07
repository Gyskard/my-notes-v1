<template>
  <v-app>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> My notes </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-main class="pt-10">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
