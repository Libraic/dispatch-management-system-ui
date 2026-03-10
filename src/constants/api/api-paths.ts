/**
 * General API paths.
 */
export const HOST = "http://localhost:8090";
export const BASE_URL = HOST + "/api";
export const CORE_URL = BASE_URL + "/core";
export const PAGINATION_DETAILS = CORE_URL + "/pagination";

/**
 * User-related API paths.
 */
export const SAVE_USER = BASE_URL + "/users";

/**
 * Company-related API paths.
 */
export const COMPANIES_BASE_URL = BASE_URL + "/companies";

/**
 * Driver-related API paths.
 */
export const DRIVERS_BASE_URL = BASE_URL + "/drivers";

/**
 * Truck-related API paths.
 */
export const TRUCKS_BASE_URL = BASE_URL + "/trucks";

/**
 * Trailer-related API paths.
 */
export const TRAILERS_BASE_URL = BASE_URL + "/trailers";

/**
 * Loads-related API paths.
 */
export const LOADS_BASE_URL = BASE_URL + "/loads";

/**
 * The API paths related to Reports.
 */
export const REPORTS_BASE_URL = BASE_URL + "/reports";
export const FINANCIAL_REPORTS_BASE_URL = REPORTS_BASE_URL + "/financial";
export const LOAD_BY_LOAD_REPORTS_URL = REPORTS_BASE_URL + "/load-by-load";

/**
 * The API paths related to Dispatchers.
 */

export const DISPATCHERS_BASE_URL = BASE_URL + "/dispatchers";
