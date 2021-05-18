export interface DataProvider<T> {
  context: any;
  save: (params: T) => void;
  find: (id: number) => T | undefined;
  update: (id: number, change: { field: string; value: any }) => void;
  getAll: () => T[];
  last: () => T;
}
