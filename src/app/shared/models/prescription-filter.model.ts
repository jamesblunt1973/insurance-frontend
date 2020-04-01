export interface IPrescriptionFilter {
  pharmacyId: number,
  startDate: Date,
  endDate: Date,
  stateList: number[],
  trackCode: string,
  page: number
}
