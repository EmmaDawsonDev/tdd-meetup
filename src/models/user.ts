export interface IUser {
  id: number
  name: string
  email: string
  attending: number[]
  meetupOwner: number[]
}

export interface IUserPassword extends IUser {
  password: string
}
