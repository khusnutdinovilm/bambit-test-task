<template>
  <app-header />

  <main class="home-page container grow">
    <base-table
      v-if="!photoStore.isPhotosLoading"
      :columns="columns"
      :rows="photoStore.photos"
      :max-page-count="photoStore.maxPageCount"
      :current-page="currentPage"
      :is-load-more-content="isLoadMoreContent"
      :sort-params="sortPhotoParams"
      class="home-page__app-table"
      @load-more="loadMorePhotos"
      @sort-by="sortPhoto"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import AppHeader from "common/app-header";
import BaseTable from "shared/base-table";

import type { SortParams } from "shared/base-table/types";
import usePhotoStore from "stores/use-photo-store";
import type { IPhotoItem } from "./types/photo";

interface IColumnItem {
  key: keyof IPhotoItem;
  label: string;
  sortable?: boolean;
}

const photoStore = usePhotoStore();

const isLoadMoreContent = ref(false);
const currentPage = ref(1);

const columns: IColumnItem[] = [
  { key: "id", label: "ID", sortable: true },
  { key: "albumId", label: "Альбом", sortable: true },
  { key: "title", label: "Название Название Название", sortable: true },
  { key: "url", label: "Ссылка", sortable: false },
  { key: "thumbnailUrl", label: "Миниатюра", sortable: false },
];

const sortPhotoParams = ref<SortParams<IPhotoItem>>();

onMounted(async () => {
  await photoStore.loadPhotos([]);
});

const loadMorePhotos = async (page: number) => {
  isLoadMoreContent.value = true;

  try {
    await photoStore.loadMorePhotos(page);
    currentPage.value = page;
  } catch (error) {
    throw error;
  } finally {
    isLoadMoreContent.value = false;
  }
};

const sortPhoto = (sortParams: SortParams<IPhotoItem>) => {
  sortPhotoParams.value = sortParams;
};
</script>

<style>
.home-page {
  @apply flex grow flex-col items-center;
}

.home-page__app-table {
  @apply h-full max-h-[600px] max-w-[600px];
}
</style>
