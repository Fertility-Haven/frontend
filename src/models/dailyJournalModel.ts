import { IRootModel } from './rootModel'

export interface IDaylyJournalModel extends IRootModel {
  dailyJournalId: string
  dailyJournalUserId: string
  dailyJournalTitle: string
  dailyJournalDescription: string
}

export interface IDaylyJournaCreateRequestModel {
  dailyJournalTitle: string
  dailyJournalDescription: string
}

export interface IDaylyJournalUpdateRequestModel {
  dailyJournalId: string
  dailyJournalTitle?: string
  dailyJournalDescription?: string
}
