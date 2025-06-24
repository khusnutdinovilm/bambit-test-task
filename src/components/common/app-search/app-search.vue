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

defineOptions({
  name: "app-search",
});

const searchQuery = ref("");

const onSearch = () => {
  console.log("on-search: ", searchQuery.value);
};
</script>
