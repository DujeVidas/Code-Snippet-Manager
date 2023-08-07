<template>
  <q-dialog transition-show="rotate" transition-hide="rotate">
    <q-card style="width: 700px; height: 500px">
      <q-card-section>
        <q-item>
          <q-item-section>
            <div class="text-h6">{{ title }}</div>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="delete"
              color="red"
              size="md"
              @click="handleEmit"
              style="cursor: pointer"
              v-close-popup
            />
          </q-item-section>
        </q-item>

        <div class="tags-container">
          <div class="text-subtitle2" v-for="tag in tags" :key="tag">
            <p>{{ tag }}</p>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <Prism :language="language">{{ code }}</Prism>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="black" v-close-popup />
        <q-btn flat label="Copy" color="black" @click="copyCode" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import 'prismjs';
import 'prismjs/themes/prism.css';
import Prism from 'vue-prism-component';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-docker';
import { useQuasar } from 'quasar';
const emit = defineEmits('delete-snippet');
const props = defineProps({
  title: String,
  code: String,
  tags: Array,
  language: String,
  id: String,
});

const $q = useQuasar();

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
const handleEmit = () => {
  emit('delete-snippet', props.id);
};
</script>

<style lang="scss" scoped>
.tags-container {
  display: flex;
  justify-content: space-evenly;
}

.q-item-section--main {
  justify-content: flex-start;
}

.q-item-section--side {
  justify-content: flex-end;
}
</style>
