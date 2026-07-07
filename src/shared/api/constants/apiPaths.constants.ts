/**
 * General API paths.
 */
export const HOST = import.meta.env.VITE_API_HOST;
export const BASE_URL = HOST ? HOST + "/api" : "/api";

/**
 * Company-related API paths.
 */
export const COMPANIES_BASE_URL = BASE_URL + "/companies";
export const COMPANIES_SETTINGS_URL = "/settings";
export const COMPANY_TOKEN_REGISTRATION_VALIDATION =
  BASE_URL + "/company-invitations/validate";

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
export const LOADS_DOCUMENTS = LOADS_BASE_URL + "/upload";
export const LOADS_COLUMNS = LOADS_BASE_URL + "/columns";

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
