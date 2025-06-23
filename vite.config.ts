import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/bambit-test-task/" : "/",

  plugins: [vue(), vueDevTools(), tailwindcss()],

  resolve: {
    alias: {
      common: fileURLToPath(new URL("./src/components/common/", import.meta.url)),
      styles: fileURLToPath(new URL("./src/styles/", import.meta.url)),
      ui: fileURLToPath(new URL("./src/components/ui/", import.meta.url)),
      shared: fileURLToPath(new URL("./src/components/shared/", import.meta.url)),
      services: fileURLToPath(new URL("./src/services", import.meta.url)),
      stores: fileURLToPath(new URL("./src/stores/", import.meta.url)),
      utils: fileURLToPath(new URL("./src/utils/", import.meta.url)),
    },
  },
});
