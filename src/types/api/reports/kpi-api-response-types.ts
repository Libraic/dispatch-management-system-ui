export type Subject = {
  uuid: string;
  name: string;
};

export type KpiResponse = {
  subject: Subject;
  kpis: KpiDetails[];
};

export type KpiDetails = {
  type: string;
  discriminators: KpiDiscriminator[];
};

export type KpiDiscriminator = {
  startDate: string;
  endDate: string;
  label: string;
  value: number;
  hasCurrency: boolean;
};
