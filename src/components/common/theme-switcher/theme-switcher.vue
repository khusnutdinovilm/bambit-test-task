<template>
  <div class="theme-switcher" @click="themeStore.toggleTheme">
    <moon-icon v-if="themeStore.theme === 'dark'" />
    <sun-icon v-else />
  </div>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/16/solid";
import useThemeStore from "stores/use-theme-store";

defineOptions({
  name: "theme-switcher",
});

const themeStore = useThemeStore();
</script>
