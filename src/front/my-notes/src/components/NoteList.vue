<template>
  <div>
    <div v-if="list.length > 0">
      <v-card class="mx-auto" max-width="400" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-for="note in list" :key="note.number">
              <router-link :to="{ path: '/note/' + note.number }">
                {{ note.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div v-else>
      <v-card class="mx-auto" max-width="400" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              There are no notes.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <div v-if="err">
      <p>{{ err }}</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data() {
    return {
      list: null,
      err: null,
    };
  },
  beforeCreate() {
    axios
      .get("http://localhost:3000/list")
      .then((list) => {
        this.list = list.data;
      })
      .catch((err) => {
        this.err = err;
      });
  },
};
</script>
