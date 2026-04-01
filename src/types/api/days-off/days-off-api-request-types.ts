export interface UpsertDayOffPeriodRequest {
  daysOffPeriodId?: string;
  relationId: string;
  startDate: Date;
  endDate: Date;
}
