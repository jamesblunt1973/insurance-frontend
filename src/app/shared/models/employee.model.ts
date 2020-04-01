export interface IEmployee {
  id: number,
  username: string,
  typeLevel: number,
  adminId: number,
  firstName: string,
  lastName: string,
  permissions: string[],
  organId: number,
  edit?: boolean
}
