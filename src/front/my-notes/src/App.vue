<template>
  <div id="app">
    <h1>List</h1>
    <NoteList />
  </div>
</template>

<script>
import NoteList from './components/NoteList.vue';

export default {
  name: 'App',

  components: {
    NoteList,
  }
};
</script>
