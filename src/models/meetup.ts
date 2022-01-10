import { IComment } from './comment'

export interface IMeetup {
  id: number
  title: string
  startDate: Date
  endDate: Date
  hostName: string
  description: string
  price?: number
  location: string
  attendees: string[]
  attendeeLimit?: number
  comments: IComment[]
  rating: number[]
}

export interface IMeetupBase {
  title: string
  startDate: Date
  endDate: Date
  hostName: string
  description: string
  price?: number
  location: string
  attendeeLimit?: number
}