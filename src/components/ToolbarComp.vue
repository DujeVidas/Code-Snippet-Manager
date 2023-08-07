<template>
  <div>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        color="black"
        icon="code"
        style="cursor: default"
        :ripple="false"
      />
      <q-toolbar-title class="title"> Code Snippet Manager </q-toolbar-title>
      <q-btn
        flat
        round
        dense
        icon="delete_forever"
        color="black"
        @click="$emit('deleteAllSnippets')"
      />
      <q-btn flat round dense icon="help" color="black" />
      <q-btn
        flat
        round
        dense
        icon="add_circle"
        color="black"
        @click="$emit('addCode')"
      />
    </q-toolbar>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.title {
  font-size: x-large;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}
</style>
