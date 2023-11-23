<template>
  <div>
    <q-card class="my-card text-white" bordered>
      <q-card-section @click="showDialog = true">
        <div class="text-h6 title" ref="titleRef">{{ title }}</div>
        <div class="tags-container">
          <div class="text-subtitle2 tags" v-for="tag in tags" :key="tag">
            <p>{{ tag }}</p>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn flat @click="copyCode">Copy</q-btn>
        <q-btn flat @click="showDialog = true">Open</q-btn>
      </q-card-actions>
    </q-card>

    <OpenCard
      v-model="showDialog"
      :title="title"
      :code="code"
      :tags="tags"
      :language="language"
      :id="id"
      @delete-snippet="handleEmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OpenCard from './OpenCard.vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const emit = defineEmits('delete-snippet');
const showDialog = ref(false);

const props = defineProps({
  title: String,
  code: String,
  tags: Array,
  language: String,
  id: String,
});
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    $q.notify({
      message: 'Copied',
      color: 'green',
    });
  } catch ($e) {
    $q.notify({
      message: 'Cannot Copy',
      color: 'red',
    });
  }
};

const handleEmit = (id) => {
  emit('delete-snippet', id);
};

const titleRef = ref(null);

onMounted(() => {
  const titleEl = titleRef.value;
  if (titleEl) {
    if (titleEl.scrollWidth > titleEl.offsetWidth) {
      titleEl.style.textOverflow = 'ellipsis';
      titleEl.style.whiteSpace = 'nowrap';
      titleEl.style.overflow = 'hidden';
    }
  }
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 250px;
  height: 150px;
  background: rgb(0, 0, 0);
  background: rgb(0, 0, 0);
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 1) 40%,
    rgb(73, 2, 111) 100%
  );
  box-shadow: 5px 4px 3px rgba(0, 0, 0, 0.2);
}
.my-card:hover {
  transform: translateY(-5px) translateX(-5px);
  box-shadow: 10px 9px 3px rgba(0, 0, 0, 0.2);
}
.tags-container {
  display: flex;
  justify-content: space-evenly;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.title {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.tags {
  font-family: 'Fantasy';
}
</style>
