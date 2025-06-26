<template>
  <div class="app-search">
    <base-input
      id="search-album"
      v-model="searchQuery"
      placeholder="Введите id альбомов ч/з пробел"
    />

    <base-button @click="onSearch">
      <magnifying-glass-icon />
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import BaseButton from "ui/base-button";
import BaseInput from "ui/base-input";

import { MagnifyingGlassIcon } from "@heroicons/vue/16/solid";
import usePhotoStore from "stores/use-photo-store";

defineOptions({
  name: "app-search",
});

const photoStore = usePhotoStore();

const searchQuery = ref("");

const onSearch = async () => {
  const filteredSearchQuery = getFilteredSearchQuery();

  await photoStore.loadPhotos(filteredSearchQuery);
};

const getFilteredSearchQuery = () => {
  const filteredSearchQuery = searchQuery.value.split(" ").filter(item => Number(item));
  return Array.from(new Set(filteredSearchQuery).values());
};
</script>
