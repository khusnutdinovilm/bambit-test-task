import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

type ThemeType = "light" | "dark";

const APP_THEME = "app-theme";

const useThemeStore = defineStore("theme-store", () => {
  const theme = ref<ThemeType>("light");
  watch(theme, applyTheme);

  onMounted(() => {
    const storedTheme = localStorage.getItem(APP_THEME) as ThemeType | null;

    if (storedTheme) {
      theme.value = storedTheme;
    } else {
      const isPrefereDark = window.matchMedia("(prefers-color-scheme: dark)");
      theme.value = isPrefereDark ? "dark" : "light";
    }

    applyTheme();
  });

  function applyTheme() {
    const html = document.documentElement;

    html.dataset.theme = theme.value;
  }

  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  return {
    theme,
    toggleTheme,
  };
});

export default useThemeStore;
