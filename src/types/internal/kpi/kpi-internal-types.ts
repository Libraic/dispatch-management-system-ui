export type KpiModel = {
  uuid: string;
  subjectName: string;
  kpisData: KpiData[];
};

export type KpiData = {
  start: string;
  end: string;
  label: string;
  kpis: Kpi[];
};

export type Kpi = {
  type: string;
  hasCurrency: boolean;
  value: number;
};
