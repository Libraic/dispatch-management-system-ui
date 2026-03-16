/**
 * General API paths.
 */
export const HOST = "http://localhost:8090";
export const BASE_URL = HOST + "/api";
export const CORE_URL = BASE_URL + "/core";
export const PAGINATION_DETAILS = CORE_URL + "/pagination";

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
export const LOADS_RELATIONS_URL = LOADS_BASE_URL + "/relations";
export const LOADS_STARTING_POINT_PATH = "/starting-point";

/**
 * The API paths related to Dispatchers.
 */

export const DISPATCHERS_BASE_URL = BASE_URL + "/dispatchers";

/**
 * The API paths related to Vehicle Maintenance.
 */
export const VEHICLE_MAINTENANCE_BASE_URL = BASE_URL + "/vehicle-maintenance";
export const VEHICLE_MAINTENANCE_RELATIONS_URL =
  VEHICLE_MAINTENANCE_BASE_URL + "/relations";

/**
 * The API paths related to Days Off.
 */
export const DAYS_OFF_BASE_URL = BASE_URL + "/days-off";
export const DAYS_OFF_RELATIONS_URL = DAYS_OFF_BASE_URL + "/relations";

/**
 * The API paths related to Planning.
 */
export const PLANNING_BASE_URL = BASE_URL + "/planner";
