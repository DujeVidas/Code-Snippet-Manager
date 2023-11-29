<template>
  <div>
    <q-toolbar class="toolbar">
      <q-avatar color="dark" text-color="white" class="avatar">
        {{ userName[0] }}
        <q-menu
          :offset="[5, 7]"
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list class="menu-list">
            <q-item>
              <q-item-section>
                <div class="user-card">
                  <div class="user-info">
                    <div class="user-details">
                      <p class="user-name">{{ userName }}</p>
                      <p class="user-email">{{ userEmail }}</p>
                    </div>
                    <q-btn
                      flat
                      color="primary"
                      @click="alertLogout = true"
                      class="full-width"
                      >Logout</q-btn
                    >
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
      <q-toolbar-title class="title"> Code Snippet Manager </q-toolbar-title>

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
      <q-dialog v-model="alertLogout">
        <q-card style="width: 300px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Do you Want to Logout
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="YES"
              color="black"
              @click="logout"
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
const alertLogout = ref(false);
const props = defineProps({
  tags: Array,
  languages: Array,
  userName: String,
  userEmail: String,
});
const emit = defineEmits(['filter-tags', 'filter-languages']);
const handleTagEmit = (tagsToFilter) => {
  emit('filter-tags', tagsToFilter);
};

const handleLangEmit = (languagesToFilter) => {
  emit('filter-languages', languagesToFilter);
};
</script>

<style lang="scss">
.title {
  font-size: x-large;
  font-weight: bold;
  font-family: 'RubixSmall', Times, serif;
}

.q-menu {
  background-color: #1d1d1d;
  color: white;
}

.full-width {
  width: 100%;
  text-align: center;
}
.menu-content {
  background-color: #1d1d1d;
  color: white;
  border-radius: 5px;
  width: 200px; /* Adjust width as needed */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.menu-list {
  padding: 0;
  margin: 0;
}

.user-card {
  padding: 10px;
}

.user-name {
  font-weight: bold;
  font-size: 20px;
}

.user-email {
  color: gray;
}

.user-info {
  cursor: default;
}

.toolbar {
  background-color: #212121;
  color: rgb(255, 255, 255);
  height: 70px;
  box-shadow: 2px 4px 6px rgba(255, 255, 255, 0.201);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom: 1px solid rgb(124, 124, 124);
  display: flex;
  font-weight: bold;
}

.avatar {
  cursor: default;
}
</style>
