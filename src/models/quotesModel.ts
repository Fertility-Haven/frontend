import { IRootModel } from './rootModel'

export interface IQuotesModel extends IRootModel {
  quoteId: string
  quoteText: string
}

export interface IQuotesCreateRequestModel {
  quoteText: string
}
