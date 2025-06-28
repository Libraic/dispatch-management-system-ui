export const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 2;

export const BASE_URL = "http://localhost:8090/api";
export const FETCH_COMPANIES_IN_BATCHES =
  BASE_URL + `/company?page=${DEFAULT_PAGE}&size=${DEFAULT_SIZE}`;
export const SAVE_USER = BASE_URL + "/users";
export const SAVE_COMPANY = BASE_URL + "/companies";
export const FETCH_COMPANIES = BASE_URL + "/companies";
