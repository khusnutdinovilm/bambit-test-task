export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

export type SortParams<T> = {
  key: keyof T;
  asc: boolean;
};

export interface IBaseTableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  isLoadMoreContent?: boolean;
  maxPageCount: number;
  currentPage: number;
  sortParams?: SortParams<T>;
}

export interface IBaseTableEmits<T> {
  (e: "load-more", page: number): void;
  (e: "sort-by", params: SortParams<T>): void;
}
