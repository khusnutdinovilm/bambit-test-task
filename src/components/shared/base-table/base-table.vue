<template>
  <div ref="baseTableRef" class="base-table">
    <table ref="baseTableHeadRef" class="base-table__head">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            <div class="base-table__head-cell">
              <span>
                {{ column.label }}
              </span>

              <span v-if="column.sortable">
                <arrows-up-down-icon class="size-5" />
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>

    <div ref="baseTableBodyRef" class="base-table__body" @scroll="handleScroll">
      <table>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="idx" class="">
            <td v-for="column in columns" :key="column.key">
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="currentPage < maxPageCount" class="base-table__loader">
        <div class="loader size-5"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="D">
import { onMounted, ref } from "vue";

import { ArrowsUpDownIcon } from "@heroicons/vue/16/solid";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

defineOptions({
  name: "app-table",
});

const props = defineProps<{
  columns: TableColumn<D>[];
  rows: D[];
  isLoadMoreContent?: boolean;
  maxPageCount: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "load-more"): void;
}>();

const baseTableRef = ref<HTMLDivElement | null>(null);
const baseTableHeadRef = ref<HTMLDivElement | null>(null);
const baseTableBodyRef = ref<HTMLDivElement | null>(null);

const getTableBodyHeight = () => {
  const tableHeight = baseTableRef.value?.clientHeight || 600;
  const tableHeadHeight = baseTableHeadRef.value?.clientHeight || 37;
  return tableHeight - tableHeadHeight;
};

onMounted(() => {
  const tableBodyHeight = getTableBodyHeight();

  if (baseTableBodyRef.value) {
    baseTableBodyRef.value.style.height = `${tableBodyHeight}px`;
  }
});

const handleScroll = () => {
  if (!baseTableBodyRef.value) return;
  if (props.isLoadMoreContent) return;

  const { scrollTop, scrollHeight, clientHeight } = baseTableBodyRef.value;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    emit("load-more");
  }
};
</script>
