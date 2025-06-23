import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import { globalIgnores } from "eslint/config";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    rules: {
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "script[setup]", ["style[scoped]", "style"]],
        },
      ],
      "vue/component-definition-name-casing": ["error", "kebab-case"],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineModel", "defineSlots"],
          defineExposeLast: true,
        },
      ],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "SLOT",
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            ["ATTR_DYNAMIC", "ATTR_STATIC", "ATTR_SHORTHAND_BOOL"],
            "EVENTS",
            "CONTENT",
          ],
        },
      ],
      "vue/multi-word-component-names": "error",
      "vue/no-v-html": "warn",
      "vue/v-slot-style": ["error", "shorthand"],
      "vue/component-name-in-template-casing": ["error", "kebab-case"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
