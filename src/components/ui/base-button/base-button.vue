<template>
  <button class="base-button" :class="btnClasses" :disabled="disabled">
    <template v-if="loading">
      <div class="base-button__loader loader"></div>
    </template>
    <template v-else>
      <div v-if="$slots.prepend" class="base-button__prepend">
        <slot name="prepend"></slot>
      </div>

      <slot>{{ label }}</slot>

      <div v-if="$slots.append" class="base-button__append">
        <slot name="append"></slot>
      </div>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BaseButtonProps } from "./types";

defineOptions({
  name: "base-button",
});

const { btnType = "primary", ...props } = defineProps<BaseButtonProps>();

const btnClasses = computed(() => ({
  "base-button--primary": btnType === "primary",
  "base-button--secondary": btnType === "secondary",
  "base-button--danger": btnType === "danger",
  "base-button--loading": props.loading,
}));
</script>
