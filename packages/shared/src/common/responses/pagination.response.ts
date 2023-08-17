export interface PaginationResponse<T> {
  page: number;
  pages: number;
  total: number;
  elements: T[];
}
