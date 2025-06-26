import { defineStore } from "pinia";
import photoService from "services/photo-service";
import { ref } from "vue";
import { type IPhotoItem } from "../types/photo";

const usePhotoStore = defineStore("photo-store", () => {
  const photos = ref<IPhotoItem[]>([]);
  const albumIds = ref<string[]>([]);
  const maxPageCount = ref(0);
  const isPhotosLoading = ref(false);

  const loadPhotos = async (albumId: string[]) => {
    isPhotosLoading.value = true;

    try {
      const { data, ...resData } = await photoService.getPhotos({ albumIds: albumId, page: 1 });

      photos.value = [...data];
      maxPageCount.value = resData.maxPageCount;
      albumIds.value = [...albumId];
    } catch (error) {
      throw error;
    } finally {
      isPhotosLoading.value = false;
    }
  };

  const loadMorePhotos = async (page: number) => {
    try {
      const { data, ...resData } = await photoService.getPhotos({ albumIds: albumIds.value, page });

      photos.value = [...photos.value, ...data];
      maxPageCount.value = resData.maxPageCount;
    } catch (error) {
      throw error;
    }
  };

  return {
    photos,
    isPhotosLoading,
    maxPageCount,
    loadPhotos,
    loadMorePhotos,
  };
});

export default usePhotoStore;
