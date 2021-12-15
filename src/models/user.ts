import { IMeetup } from './meetup'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  attending: IMeetup[]
  meetupOwner: IMeetup[]
}
