import { IMeetup } from '../models/meetup'

const meetups: IMeetup[] = [
  {
    id: 2,
    title: 'Advanced Javascript meetup',
    startDate: new Date('2021-12-27T13:00:00'),
    endDate: new Date('2021-12-27T15:00:00'),
    hostName: 'Hannah',
    description: 'This is a more advanced meetup about Javascript',
    location: '10 Main Street, London',
    attendees: [],
    comments: [],
    rating: 0,
  },
  {
    id: 1,
    title: 'Javascript meetup',
    startDate: new Date('2021-12-17T13:00:00'),
    endDate: new Date('2021-12-17T15:00:00'),
    hostName: 'Hannah',
    description: 'This is a meetup',
    location: '10 Main Street, London',
    attendees: [],
    comments: [],
    rating: 0,
  },
  {
    id: 3,
    title: 'Swimming group in Stockholm',
    startDate: new Date('2021-12-07T19:00:00'),
    endDate: new Date('2021-12-07T20:00:00'),
    hostName: 'Joe',
    description: 'come and swim with us!',
    location: 'Vasagatan 15, Stockholm',
    attendees: ['Hannah', 'Chris'],
    comments: [
      { name: 'Hannah', date: new Date('2001-12-06T11:00:00'), content: 'How warm is the water?' },
      { name: 'Joe', date: new Date('2001-12-06T11:21:03'), content: "It's about 30 degrees" },
    ],
    rating: 5,
  },
  {
    id: 4,
    title: 'Frontend programming',
    startDate: new Date('2022-01-07T19:30:00'),
    endDate: new Date('2022-01-07T20:30:00'),
    hostName: 'Joe',
    description: 'come and learn frontend with us!',
    location: 'Stureplan 1, Stockholm',
    attendees: [],
    comments: [],
    rating: 0,
  },
  {
    id: 5,
    title: 'Backend programming',
    startDate: new Date('2021-12-08T19:30:00'),
    endDate: new Date('2021-12-08T20:30:00'),
    hostName: 'Joe',
    description: 'come and learn backend with us!',
    location: 'Stureplan 1, Stockholm',
    attendees: ['Hannah'],
    comments: [],
    rating: 4,
  },
]

export const getAllMeetups = () => {
  return meetups
}

export const getMeetupById = (id: number) => {
  const meetup = meetups.find(meetup => meetup.id === id)

  return meetup
}

export const getAllCurrentMeetups = (currentDate: Date) => {
  let now = currentDate.getTime()

  const comingMeetups = meetups.filter(meetup => meetup.startDate.getTime() > now)
  return comingMeetups
}

export const getAllPastMeetups = (currentDate: Date) => {
  let now = currentDate.getTime()

  const pastMeetups = meetups.filter(meetup => meetup.startDate.getTime() < now)
  return pastMeetups
}


