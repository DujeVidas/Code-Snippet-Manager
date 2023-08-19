<template>
  <ToolbarComp
    :tags="tags"
    class="toolbar"
    @add-code="showDialog = true"
    @delete-all-snippets="deleteAllSnippets"
    @filter-tags="filterTags"
  />

  <div class="text-white">
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
import ToolbarComp from 'src/components/ToolbarComp.vue';

import {
  saveSnippetToLocalStorage,
  getSnippetsFromLocalStorage,
  deleteAllSnippetsFromLocalStorage,
  deleteSnippetFromLocalStorage,
} from '../api';
import { ref, onMounted } from 'vue';

const text = ref('');
const showDialog = ref(false);
const snippetsToShow = ref([]);
const jsonData = ref([]);
const tags = ref([]);
const snippetsTagsFiltered = ref([]);
const tagsToFilterToUse = ref([]);

onMounted(async () => {
  jsonData.value = getSnippetsFromLocalStorage() || [];
  snippetsToShow.value = jsonData.value;
  tags.value = getTags(jsonData.value);
  snippetsTagsFiltered.value = jsonData.value;
});

const addSnippet = (snippet) => {
  snippet.language = snippet.language.value;
  saveSnippetToLocalStorage(snippet);
  if (jsonData.value === null) {
    jsonData.value = snippet;
  } else {
    jsonData.value.push(snippet);
  }
  snippetsToShow.value = jsonData.value;
  tags.value = getTags(jsonData.value);
};

const getTags = (snippets) => {
  const allTagsSet = new Set();
  for (const snippet of snippets) {
    snippet.tags.forEach((tag) => allTagsSet.add(tag));
  }
  return Array.from(allTagsSet);
};

const searchSnippets = () => {
  if (text.value !== '') {
    const searchText = text.value.toLowerCase();
    const filteredSnippets = snippetsTagsFiltered.value.filter((snippet) =>
      snippet.title.toLowerCase().includes(searchText)
    );
    snippetsToShow.value = filteredSnippets;
  } else {
    snippetsToShow.value = snippetsTagsFiltered.value;
  }
};

const resetText = () => {
  text.value = '';
  if (tagsToFilterToUse.value.length !== 0) {
    snippetsTagsFiltered.value = jsonData.value.filter((snippet) =>
      snippet.tags.some((tag) => tagsToFilterToUse.value.includes(tag))
    );
    snippetsToShow.value = snippetsTagsFiltered.value;
  } else {
    searchSnippets();
  }
};

const deleteAllSnippets = () => {
  deleteAllSnippetsFromLocalStorage();
  jsonData.value = getSnippetsFromLocalStorage() || [];
  snippetsToShow.value = jsonData.value;
};

const deleteSnippet = (id) => {
  deleteSnippetFromLocalStorage(id);
  jsonData.value = getSnippetsFromLocalStorage() || [];
  snippetsToShow.value = jsonData.value;
};

const filterTags = (tagsToFilter) => {
  tagsToFilterToUse.value = tagsToFilter;
  if (tagsToFilter.length !== 0) {
    snippetsTagsFiltered.value = jsonData.value.filter((snippet) =>
      snippet.tags.some((tag) => tagsToFilter.includes(tag))
    );
    searchSnippets(); // Apply search filter to the filtered tags
  } else {
    snippetsTagsFiltered.value = jsonData.value;
    searchSnippets(); // Apply search filter to all snippets
  }
};
</script>

<style lang="scss">
body {
  background-color: whitesmoke;
}
.custom-input {
  width: 400px;
  margin: 0 auto;
  padding-top: 20px;
}
.toolbar {
  background-color: white;
  color: black;
  height: 70px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  font-weight: bold;
}
</style>
