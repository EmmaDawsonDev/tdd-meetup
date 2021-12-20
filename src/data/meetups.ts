import { IMeetup } from '../models/meetup'

const meetups: IMeetup[] = [
  {
    id: 2,
    title: 'Advanced Javascript meetup',
    startDate: new Date('2022-12-27T13:00:00'),
    endDate: new Date('2022-12-27T15:00:00'),
    hostName: 'Hannah',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: '10 Main Street, London',
    attendees: [],
    attendeeLimit: 50,
    comments: [],
    rating: [],
  },
  {
    id: 1,
    title: 'Javascript meetup',
    startDate: new Date('2022-12-17T13:00:00'),
    endDate: new Date('2022-12-17T15:00:00'),
    hostName: 'Hannah',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    location: '10 Main Street, London',
    attendees: ['Chris', 'Joe'],
    attendeeLimit: 2,
    comments: [],
    rating: [],
  },
  {
    id: 3,
    title: 'Swimming group in Stockholm',
    startDate: new Date('2021-12-07T19:00:00'),
    endDate: new Date('2021-12-07T19:30:00'),
    hostName: 'Joe',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    price: 125,
    location: 'Vasagatan 15, Stockholm',
    attendees: ['Hannah', 'Chris'],
    attendeeLimit: 15,
    comments: [
      { name: 'Hannah', date: new Date('2001-12-06T11:00:00'), content: 'How warm is the water?' },
      { name: 'Joe', date: new Date('2001-12-06T11:21:03'), content: "It's about 30 degrees" },
    ],
    rating: [],
  },
  {
    id: 4,
    title: 'Frontend programming',
    startDate: new Date('2023-01-07T19:30:00'),
    endDate: new Date('2023-01-07T20:30:00'),
    hostName: 'Joe',
    price: 50,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Stureplan 1, Stockholm',
    attendees: [],
    comments: [],
    rating: [],
  },
  {
    id: 5,
    title: 'Backend programming',
    startDate: new Date('2021-12-08T19:30:00'),
    endDate: new Date('2021-12-08T20:30:00'),
    hostName: 'Joe',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Stureplan 1, Stockholm',
    attendees: ['Hannah'],
    comments: [],
    rating: [],
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


