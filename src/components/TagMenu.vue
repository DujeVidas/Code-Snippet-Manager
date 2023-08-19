<template>
  <q-btn flat round dense icon="sell" color="black">
    <q-menu :offset="[30, 10]" class="bg-black text-white rounded-borders">
      <q-list v-for="tag in tags" :key="tag" style="min-width: 100px">
        <q-item clickable>
          <q-item-section
            class="item"
            :class="{ selected_item: tagsToFilter.includes(tag) }"
            @click="handleTag(tag)"
            >{{ tag }}</q-item-section
          >
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['sendTags']);

const props = defineProps({
  tags: Array,
});
const tagsToFilter = ref([]);
const handleTag = (tag) => {
  if (!tagsToFilter.value.includes(tag)) {
    tagsToFilter.value.push(tag);
  } else {
    tagsToFilter.value = tagsToFilter.value.filter(
      (taginArr) => taginArr != tag
    );
  }
  const tagsToFilterArr = Object.values(tagsToFilter.value);
  emit('sendTags', tagsToFilterArr);
};
</script>

<style lang="scss" scoped>
.item {
  border-radius: 5px;
  align-items: center;
}
.selected_item {
  background-color: green;
  box-shadow: 0 3px 6px aquamarine;
}
</style>
