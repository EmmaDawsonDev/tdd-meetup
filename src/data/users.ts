import { getMaxListeners } from 'process'
import { IUser } from '../models/user'

const users: IUser[] = [
  {
    id: 1,
    name: 'Hannah',
    email: 'hannah@gmail.com',
    password: 'hannahIsBest',
    attending: [3, 5],
    meetupOwner: [1, 2],
  },
  {
    id: 2,
    name: 'Joe',
    email: 'joe@gmail.com',
    password: 'joeIsBest',
    attending: [],
    meetupOwner: [3, 4, 5],
  },
  {
    id: 3,
    name: 'Chris',
    email: 'chris@gmail.com',
    password: 'chrisIsBest',
    attending: [3],
    meetupOwner: [],
  },
  { id: 4, name: 'Sofie', email: 'sofie@gmail.com', password: 'sofieIsBest', attending: [], meetupOwner: [] },
]

export const getAllUsers = () => {
  return users
}

export const getUserById = (id: number) => {
  const user = users.find(user => user.id === id)

  return user
}
