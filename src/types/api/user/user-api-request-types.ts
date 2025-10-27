export type CreateSupervisorRequest = {
  uuid: string | null;
  fullName: string | null;
};

export type CreateWorkloadRequest = {
  companyUuid: string;
  companyName: string;
  itemIdentifier: string;
  commission: number;
};

export type EmergencyContact = {
  name: string | null;
  relationship: string | null;
  phone: string | null;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  nickname: string | null;
  email: string;
  password: string;
  personalEmail: string | null;
  birthDate: string;
  employmentDate: string;
  emergencyContact: EmergencyContact | null;
  role: string;
  position: string;
  supervisor: CreateSupervisorRequest;
  workloads: CreateWorkloadRequest[];
  notes: string[];
};
