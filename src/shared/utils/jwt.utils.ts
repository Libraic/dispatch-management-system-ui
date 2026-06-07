import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "#/features/authentication/api/api.types";

const PLATFORM_ADMIN_ROLE = "ROLE_PLATFORM_ADMIN";
const TOKEN_STORAGE_KEY = "token";

export const hasPlatformAdminRole = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    return false;
  }

  try {
    const payload = jwtDecode<JwtPayload>(token);
    const roles = extractRoles(payload);
    return roles.includes(PLATFORM_ADMIN_ROLE);
  } catch {
    return false;
  }
};

const extractRoles = (payload?: JwtPayload): string[] => {
  if (!payload) {
    return [];
  }

  return payload.roles ?? [];
};
