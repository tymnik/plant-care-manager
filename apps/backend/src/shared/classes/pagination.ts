export class Pagination<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
  constructor(data: T[], count: number, perPage: number, page: number) {
    const lastPage = count / perPage;
    this.data = [...data];
    this.meta = {
      total: count,
      lastPage: Math.ceil(lastPage),
      currentPage: +page,
      perPage: +perPage,
      prev: +page - 1 || null,
      next: lastPage !== page ? +page + 1 : null,
    };
  }
}
