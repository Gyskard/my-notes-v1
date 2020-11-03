<template>
  <v-app>
    <div id="app">
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
      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
  </v-app>
</template>
