import { IRootModel } from './rootModel'

export interface IDailyJournalModel extends IRootModel {
  dailyJournalId: string
  dailyJournalUserId: string
  dailyJournalTitle: string
  dailyJournalDescription: string
}

export interface IDailyJournaCreateRequestModel {
  dailyJournalTitle: string
  dailyJournalDescription: string
}

export interface IDailyJournalUpdateRequestModel {
  dailyJournalId: string
  dailyJournalTitle?: string
  dailyJournalDescription?: string
}
