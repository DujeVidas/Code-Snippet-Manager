<template>
  <div class="action" @click="handleClickOutside">
    <q-toolbar class="toolbar">
      <q-avatar
        color="dark"
        text-color="white"
        class="avatar"
        :class="{ active: showMenu }"
        @click="handleMenu"
      >
        {{ userName[0] }}
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
    </q-toolbar>
    <transition name="slide">
      <div class="user-card" v-if="showMenu">
        <div class="user-info">
          <div class="user-details">
            <q-avatar icon="person" size="75px"></q-avatar>
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
          <q-btn
            flat
            dense
            rounded
            color="white"
            style="background-color: black"
            @click="alertLogout = true"
            class="full-width"
            >Logout</q-btn
          >
        </div>
      </div>
    </transition>
    <div class="newButton">
      <q-btn
        flat
        dense
        style="background: #212121; color: white; width: 95%"
        icon="add"
        @click="$emit('addCode')"
        ><q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          transition-show="slide-up"
          transition-hide="slide-down"
          >Add Snippet</q-tooltip
        ></q-btn
      >
    </div>
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
  showMenu: Boolean,
});
const emit = defineEmits([
  'filter-tags',
  'filter-languages',
  'toggle-menu',
  'close-menu',
]);
const handleTagEmit = (tagsToFilter) => {
  emit('filter-tags', tagsToFilter);
};

const handleLangEmit = (languagesToFilter) => {
  emit('filter-languages', languagesToFilter);
};

const handleMenu = () => {
  emit('toggle-menu');
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.avatar')) {
    emit('close-menu');
  }
};
</script>

<style lang="scss">
.action {
  position: relative;
}
.action::before {
  content: '';
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 20px; /* Adjust the height */
  background-color: #212121; /* Semi-transparent overlay color */
  z-index: 1;
}
.newButton {
  height: 60px;
  width: 400px;
  background-color: #212121;
  margin: 0 auto;
  box-shadow: 0px 0px 6px 6px rgba(255, 255, 255, 0.201);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: x-large;
  font-weight: bold;
  font-family: 'RubixSmall', Times, serif;
  cursor: default;
}
.full-width {
  width: 100%;
  text-align: center;
}

.menu-list {
  padding: 0;
  margin: 0;
}

.user-card {
  position: absolute;
  left: 10px;
  top: 60px;
  width: 200px;
  background-color: #1d1d1d;
  color: white;
  box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.201);
  border-radius: 10px;
  z-index: 10;
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
  padding-top: 5px;
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
  cursor: pointer;
  position: relative;
}

.active {
  box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.201);
}

.action .user-card::before {
  background-color: #1d1d1d;
  content: '';
  height: 20px;
  position: absolute;
  left: 11px;
  transform: rotate(45deg);
  top: -10px;
  width: 20px;
  box-shadow: -1px -1px 0px 0px rgba(255, 255, 255, 0.201);
}

.action .user-card::after {
  background-color: #1d1d1d;
  content: '';
  height: 8px;
  position: absolute;
  left: 14px;
  top: -15px;
  width: 15px;
  z-index: 12;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  transform-origin: top;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
