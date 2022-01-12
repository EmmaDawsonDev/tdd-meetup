import { IUser, IUserPassword } from '../models/user'

let users: IUserPassword[] = [
  {
    id: 1,
    name: 'Hannah',
    email: 'hannah@gmail.com',
    password: 'hannahIsBest',
    attending: [3, 4, 5],
    meetupOwner: [1, 2],
  },
  {
    id: 2,
    name: 'Joe',
    email: 'joe@gmail.com',
    password: 'joeIsBest',
    attending: [1],
    meetupOwner: [3, 4, 5],
  },
  {
    id: 3,
    name: 'Chris',
    email: 'chris@gmail.com',
    password: 'chrisIsBest',
    attending: [3, 4, 1],
    meetupOwner: [],
  },
  { id: 4, name: 'Sofie', email: 'sofie@gmail.com', password: 'sofieIsBest', attending: [], meetupOwner: [] },
  { id: 5, name: 'Emma', email: 'emma@gmail.com', password: 'emmaIsBest', attending: [], meetupOwner: [] },
]

export const validateUser = (email: string, password: string): IUser | undefined => {
  const user = users.find(user => user.email === email)

  return user && user.password === password
    ? { id: user.id, name: user.name, email: user.email, attending: user.attending, meetupOwner: user.meetupOwner }
    : undefined
}

export const updateAttending = (userId: number, meetupId: number) => {
  const userIndex = users.findIndex(user => user.id === userId)
  const user = users.find(user => user.id === userId)

  if (user) {
    const updatedUser = { ...user }
    updatedUser.attending = [...updatedUser.attending, meetupId]
    users[userIndex] = updatedUser
    return updatedUser
  } else {
    return undefined
  }
}

export const deleteAttending = (userId: number, meetupId: number) => {
  const userIndex = users.findIndex(user => user.id === userId)
  const user = users.find(user => user.id === userId)

  if (user) {
    const updatedUser = { ...user }
    updatedUser.attending = user.attending.filter(id => id !== meetupId)
    users[userIndex] = updatedUser
    return updatedUser
  } else {
    return undefined
  }
}

export const resetUsers = () => {
  users = [
    {
      id: 1,
      name: 'Hannah',
      email: 'hannah@gmail.com',
      password: 'hannahIsBest',
      attending: [3, 4, 5],
      meetupOwner: [1, 2],
    },
    {
      id: 2,
      name: 'Joe',
      email: 'joe@gmail.com',
      password: 'joeIsBest',
      attending: [1],
      meetupOwner: [3, 4, 5],
    },
    {
      id: 3,
      name: 'Chris',
      email: 'chris@gmail.com',
      password: 'chrisIsBest',
      attending: [1, 4, 3],
      meetupOwner: [],
    },
    { id: 4, name: 'Sofie', email: 'sofie@gmail.com', password: 'sofieIsBest', attending: [], meetupOwner: [] },
    { id: 5, name: 'Emma', email: 'emma@gmail.com', password: 'emmaIsBest', attending: [], meetupOwner: [] },
  ]
}
