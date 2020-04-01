export interface ICategory {
  id: number,
  name: string,
  maxIndexLimit: number,
  countOfAllRows: number,
  IndexFileNames: string[],
  ReasonItems: string[],
  RejectItems: string[],
  edit?: boolean
}
