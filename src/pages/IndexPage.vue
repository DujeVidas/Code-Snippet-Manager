<template>
  <ToolbarComp
    v-if="isComponentReady"
    :tags="tags"
    :languages="languages"
    @add-code="showDialog = true"
    @delete-all-snippets="deleteAllSnippets"
    @filter-tags="filterTags"
    @filter-languages="filterLanguages"
    :userName="userName"
    :userEmail="userEmail"
  />

  <div class="text-white bg-dark">
    <q-input
      bg-color="white"
      rounded
      outlined
      v-model="text"
      label="Search Snippets"
      class="custom-input q-pb-lg"
      @keyup.enter="searchSnippets"
      ><template v-slot:append>
        <q-icon
          v-if="text !== ''"
          name="close"
          @click="resetText"
          class="cursor-pointer"
        />
        <q-icon name="search" @click="searchSnippets" /> </template
    ></q-input>
    <div>
      <CardGrid :snippets="snippetsToShow" @delete-snippet="deleteSnippet" />
    </div>
  </div>
  <AddCode v-model="showDialog" :snippets="jsonData" @add="addSnippet" />
</template>

<script setup>
import AddCode from 'src/components/AddCode.vue';
import CardGrid from 'src/components/CardGrid.vue';
import { auth } from 'src/firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { Loading } from 'quasar';
import {
  saveSnippetFirebase,
  getSnippetsFirebase,
  deleteAllSnippetsFirebase,
  deleteSnippetFirebase,
} from '../api';
import { ref, onMounted, defineAsyncComponent } from 'vue';

const ToolbarComp = defineAsyncComponent(() =>
  import('src/components/ToolbarComp.vue')
);

const text = ref('');
const showDialog = ref(false);
const snippetsToShow = ref([]);
const jsonData = ref([]);
const tags = ref([]);
const languages = ref([]);
const snippetsTagsFiltered = ref([]);
const languagesToFilterToUse = ref([]);
const tagsToFilterToUse = ref([]);
const userId = ref({});
const userEmail = ref({});
const userName = ref({});
const isComponentReady = ref(false);

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userId.value = user.uid;
      userEmail.value = user.email;
      userName.value = user.displayName;
      isComponentReady.value = true;

      Loading.show();
      jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
      Loading.hide();

      console.log(typeof jsonData.value);
      console.log(jsonData.value);
      snippetsToShow.value = jsonData.value;
      tags.value = getTags(jsonData.value);
      languages.value = getLanguages(jsonData.value);
      snippetsTagsFiltered.value = jsonData.value;
    } else {
      console.log('No user is signed in');
    }
  });
});

const addSnippet = (snippet) => {
  snippet.language = snippet.language.value;
  saveSnippetFirebase(userId.value, snippet);
  jsonData.value.push(snippet);
  updateFilters();
};

const getTags = (snippets) => {
  const allTagsSet = new Set();
  snippets.forEach((snippet) => {
    snippet.tags.forEach((tag) => allTagsSet.add(tag));
  });
  return Array.from(allTagsSet);
};

const getLanguages = (snippets) => {
  const allLangSet = new Set();
  snippets.forEach((snippet) => {
    allLangSet.add(snippet.language);
  });
  return Array.from(allLangSet);
};

const updateFilters = () => {
  console.log(jsonData.value);
  tags.value = getTags(jsonData.value);
  languages.value = getLanguages(jsonData.value);
};

const searchSnippets = () => {
  const searchText = text.value.toLowerCase();
  snippetsToShow.value = snippetsTagsFiltered.value.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchText) &&
      (tagsToFilterToUse.value.length === 0 ||
        snippet.tags.some((tag) => tagsToFilterToUse.value.includes(tag))) &&
      (languagesToFilterToUse.value.length === 0 ||
        languagesToFilterToUse.value.includes(snippet.language))
  );
};

const resetText = () => {
  text.value = '';
  updateFilters();
  searchSnippets();
};

const deleteAllSnippets = async () => {
  await deleteAllSnippetsFirebase(userId.value);
  jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
  console.log(jsonData.value);
  snippetsToShow.value = jsonData.value;
  snippetsTagsFiltered.value = [];
  tagsToFilterToUse.value = [];
  languagesToFilterToUse.value = [];
  updateFilters();
};

const deleteSnippet = async (id) => {
  await deleteSnippetFirebase(userId.value, id);
  jsonData.value = (await getSnippetsFirebase(userId.value)) || [];
  console.log('json: ', jsonData.value);
  snippetsToShow.value = jsonData.value;
  removeSnippetFrontend(id);
  updateFilters();
};

const removeSnippetFrontend = (id) => {
  snippetsTagsFiltered.value = snippetsTagsFiltered.value.filter(
    (snippet) => snippet.id !== id
  );
};

const filterTags = (tagsToFilter) => {
  tagsToFilterToUse.value = tagsToFilter;
  searchSnippets();
};

const filterLanguages = (languagesToFilter) => {
  languagesToFilterToUse.value = languagesToFilter;
  searchSnippets();
};
</script>

<style lang="scss">
body {
  background-color: #1d1d1d;
}
.custom-input {
  width: 400px;
  margin: 0 auto;
  padding-top: 20px;
  font-family: 'Rubix';
}
</style>
