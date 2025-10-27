export type Pagination = {
  getNextUrl: () => string | null;
  setNextUrl: (url: string | null) => void;
  shouldLoadNext: () => boolean;
  setLoadNext: (loadNext: boolean) => void;
};
