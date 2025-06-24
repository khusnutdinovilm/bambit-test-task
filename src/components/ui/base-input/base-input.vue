<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="base-input__label">
      {{ label }}
    </label>

    <input
      :id="id"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      class="base-input__field"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { debounce } from "utils/debounce";

import type { BaseInputProps } from "./types";

defineOptions({
  name: "base-input",
});

const props = defineProps<BaseInputProps>();

const inputModel = defineModel<string>({ required: true });

const inputValue = ref(inputModel.value);

const updateModel = props.debounce
  ? debounce((newValue: string) => (inputModel.value = newValue), props.debounce)
  : (newValue: string) => (inputModel.value = newValue);

watch(inputValue, newValue => {
  updateModel(newValue);
});
</script>
