<template>
  <div ref="baseTableRef" class="base-table">
    <table ref="baseTableHeadRef" class="base-table__head">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ 'cursor-pointer': column.sortable }"
            @click="handleSort(column.key)"
          >
            <div class="base-table__head-cell">
              <span>
                {{ column.label }}
              </span>

              <span v-if="column.sortable">
                <arrows-up-down-icon
                  v-if="!sortParams || sortParams?.key !== column.key"
                  class="size-5"
                />
                <template v-else>
                  <arrow-long-up-icon
                    v-if="sortParams.asc && sortParams.key === column.key"
                    class="size-5"
                  />
                  <arrow-long-down-icon v-else class="size-5" />
                </template>
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
import { computed, onMounted, ref } from "vue";

import { ArrowLongDownIcon, ArrowLongUpIcon, ArrowsUpDownIcon } from "@heroicons/vue/16/solid";

import type { IBaseTableEmits, IBaseTableProps, SortParams } from "./types";

defineOptions({
  name: "app-table",
});

const props = defineProps<IBaseTableProps<D>>();
const emit = defineEmits<IBaseTableEmits<D>>();

const baseTableRef = ref<HTMLDivElement | null>(null);
const baseTableHeadRef = ref<HTMLDivElement | null>(null);
const baseTableBodyRef = ref<HTMLDivElement | null>(null);

const isStopLoadData = computed(
  () => props.currentPage === props.maxPageCount || props.isLoadMoreContent,
);

onMounted(() => {
  const tableHeight = baseTableRef.value?.clientHeight || 600;
  const tableHeadHeight = baseTableHeadRef.value?.clientHeight || 37;
  const tableBodyHeight = tableHeight - tableHeadHeight;

  if (baseTableBodyRef.value) {
    baseTableBodyRef.value.style.height = `${tableBodyHeight}px`;
  }
});

const handleScroll = () => {
  if (isStopLoadData.value) return;
  if (!baseTableBodyRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = baseTableBodyRef.value;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    emit("load-more", props.currentPage + 1);
  }
};

const handleSort = (key: keyof D) => {
  const params: SortParams<D> = {
    key,
    asc: !props.sortParams?.asc,
  };

  emit("sort-by", params);
};
</script>
