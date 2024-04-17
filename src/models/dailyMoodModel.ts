import { IRootModel } from './rootModel'

export interface IDailyMoodModel extends IRootModel {
  dailyMoodId: string
  dailyMoodUserId: string
  dailyMoodExpression:
    | 'Angry'
    | 'Happy'
    | 'Sad'
    | 'Afraid'
    | 'Anxious'
    | 'Confused'
    | 'Relaxed'
    | 'Disappointed'
}

export interface IDailyMoodCreateRequestModel {
  dailyMoodExpression:
    | 'Angry'
    | 'Happy'
    | 'Sad'
    | 'Afraid'
    | 'Anxious'
    | 'Confused'
    | 'Relaxed'
    | 'Disappointed'
    | string
}

export interface IDailyMoodUpdateRequestModel {
  dailyMoodId: string
  dailyMoodExpression?:
    | 'Angry'
    | 'Happy'
    | 'Sad'
    | 'Afraid'
    | 'Anxious'
    | 'Confused'
    | 'Relaxed'
    | 'Disappointed'
    | string
}
