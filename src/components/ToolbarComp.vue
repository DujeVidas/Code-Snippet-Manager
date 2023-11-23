<template>
  <div>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        color="white"
        icon="code"
        style="cursor: default"
        :ripple="false"
      />
      <q-toolbar-title class="title"> Code Snippet Manager </q-toolbar-title>
      <q-btn flat @click="logout">Logout</q-btn>
      <q-btn
        flat
        round
        dense
        icon="delete_forever"
        color="white"
        @click="alert = true"
        ><q-tooltip>Delete All Snippets</q-tooltip></q-btn
      >
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Do you Want to Delete All Snippets
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="YES"
              color="black"
              @click="$emit('deleteAllSnippets')"
              v-close-popup
            />
            <q-btn flat label="NO" color="black" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <TagMenu @send-tags="handleTagEmit" :tags="tags" />
      <LanguageMenu @send-languages="handleLangEmit" :languages="languages" />
      <q-btn
        flat
        round
        dense
        icon="add_circle"
        color="white"
        @click="$emit('addCode')"
        ><q-tooltip>Add Snippet</q-tooltip></q-btn
      >
    </q-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TagMenu from './TagMenu.vue';
import LanguageMenu from './LanguageMenu.vue';
import signout from 'src/firebase/firebase-signout';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  signout().then(() => {
    router.push('/login');
  });
};
const alert = ref(false);
const props = defineProps({
  tags: Array,
  languages: Array,
});
const emit = defineEmits(['filter-tags', 'filter-languages']);
const handleTagEmit = (tagsToFilter) => {
  emit('filter-tags', tagsToFilter);
};

const handleLangEmit = (languagesToFilter) => {
  emit('filter-languages', languagesToFilter);
};
</script>

<style lang="scss" scoped>
.title {
  font-size: x-large;
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
}
</style>
