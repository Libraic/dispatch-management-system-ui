import type { Error, GroupsErrorResponse } from "./api-errors-types.ts";

export type LiveSearchResult<T> = {
  items: T[];
  error: string | null;
};

export type ApiResponse<T, E extends Error | GroupsErrorResponse> = {
  data?: T;
  error?: E;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export type NoContentResponse = {};
