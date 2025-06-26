import ApiClient from "../api";

const PAGE_LIMIT = 30;

interface PhotoParams {
  albumIds: string[];
  page: number;
}

class PhotoService extends ApiClient {
  constructor(apiHost: string) {
    super(apiHost);
  }

  async getPhotos(photoParams: PhotoParams) {
    const { albumIds, page } = photoParams;

    const albumIdsQuery = this.createAlbumIdsParams(albumIds);
    const enpoint = `/photos?${albumIdsQuery}`;

    const photos = await this.get(enpoint);

    const maxPageCount = Math.ceil(photos.length / PAGE_LIMIT);

    const startIdx = PAGE_LIMIT * (page - 1);
    const endIdx = PAGE_LIMIT * page;

    return {
      data: photos.slice(startIdx, endIdx),
      maxPageCount,
      page,
    };
  }

  private createAlbumIdsParams(albumIds: string[]): string {
    return albumIds.reduce((prev, curr) => (prev += `albumId=${curr}&`), "");
  }
}

const photoService = new PhotoService("https://jsonplaceholder.typicode.com");

export default photoService;
