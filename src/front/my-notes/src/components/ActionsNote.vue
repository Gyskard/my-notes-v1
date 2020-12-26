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
        <v-btn depressed color="primary" class="ml-3" :to="{ path: `/modify/${this.id}` }"> Modify </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              color="error"
              class="ml-3"
              dark
              v-on="on"
              v-bind="attrs"
            >
              Delete
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Delete {{ this.title }}
            </v-card-title>
            <v-card-text>
              Are you sure you want to delete this note?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="error" text @click="dialog = false; deleteNote()">
                Delete this note
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row justify="center"> </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
        dialog: false,
      }
  },
  props: {
    title: String,
    err: String,
    id: Number,
    deleteNote: Function
  }
}
</script>