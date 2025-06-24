<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <theme-switcher class="app-header__theme-switcher" />

        <app-search class="app-header__search-form" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppSearch from "common/app-search";
import ThemeSwitcher from "common/theme-switcher";

defineOptions({
  name: "app-header",
});
</script>
