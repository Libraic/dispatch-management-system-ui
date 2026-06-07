export interface AuthenticationRequest {
  email?: string;
  password?: string;
}

export interface AuthenticationResponse {
  token?: string;
}

export interface JwtPayload {
  authorityId?: string;
  roles?: string[];
}
