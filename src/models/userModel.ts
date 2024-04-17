import { IRootModel } from './rootModel'

export interface IUserModel extends IRootModel {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userPhoto: string
  userRole: 'patient' | 'therapist' | 'admin'
}

export interface IUserUpdateRequestModel {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userPhoto?: string
  userRole?: 'patient' | 'therapist' | 'admin' | string
}

export interface IUserCreateRequestModel {
  userName: string
  userEmail: string
  userPassword: string
  userPhoto?: string
  userRole: 'patient' | 'therapist' | 'admin' | string
}

export interface IUserLoginRequestModel {
  userEmail: string
  userPassword: string
}
