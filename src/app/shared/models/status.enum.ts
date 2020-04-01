export enum PrescriptionState {
  InProgress = 1,
  Verified = 10,
  Rejected = 20,
  RequestComplete = 51,
  UserCompleted = 61
}

export function GetStateTitle(state: PrescriptionState): string {
  switch (state) {
    case PrescriptionState.InProgress:
      return "در انتظار";
    case PrescriptionState.Rejected:
      return "رد شده";
    case PrescriptionState.Verified:
      return "تایید شده";
    case PrescriptionState.RequestComplete:
      return "درخواست تکمیل مدارک";
    case PrescriptionState.UserCompleted:
      return "مدارک تکمیل شده";
    default:
      return "";
  }
}
