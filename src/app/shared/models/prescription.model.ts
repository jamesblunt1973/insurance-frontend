export interface IPrescription {
  id: number,
  trackCode: string,
  pharmacyId: number,
  pharmacyName: string,
  patientName: string,
  patientNationalCode: string,
  state: number,
  otc: string,
  prescriptionImagesIDList: number[],
  prescriptionIndexesList: string[],
  description: string,
  totalCount: number,
  userFullName: string,
  receivedDate: Date,
  categoryId?: number,
  expand?: boolean // این فیلد جهت تغیر حالت نمایش نسخه بکار میرود و از خصوصیات نسخه نیست
}
