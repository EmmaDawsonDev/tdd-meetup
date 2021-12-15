import { IUser } from './user'
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
  atendees: IUser[]
  comments: IComment[]
  rating: number
}
