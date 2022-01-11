import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { makeStore } from '../../store/store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import { resetMeetups } from '../../data/meetups'
import { resetUsers } from '../../data/users'

beforeEach(() => {
  resetMeetups()
  resetUsers()
  const store = makeStore()
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

const login = (email: string, password: string) => {
  const loginBtn = screen.getByRole('button', { name: /login/i })
  userEvent.click(loginBtn)
  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submitBtn = screen.getByTestId('login-btn')
  userEvent.type(emailInput, email)
  userEvent.type(passwordInput, password)
  userEvent.click(submitBtn)
}

describe('Profile integration tests', () => {
  it('renders 1 attending meetups on Hannahs profile page', () => {
    login('hannah@gmail.com', 'hannahIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.getAllByTestId('currentProfileListItem')
    expect(myMeetups).toHaveLength(1)
  })
  it('renders no current meetups message on Emmas profile page', () => {
    login('emma@gmail.com', 'emmaIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('currentProfileListItem')
    expect(myMeetups).toHaveLength(0)
    const message = screen.getByText('No current meetups')
    expect(message).toBeInTheDocument()
  })
  it('renders 1 current meetup on profile after clicking to attend a meetup', () => {
    login('emma@gmail.com', 'emmaIsBest')

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendeeList = screen.getAllByTestId('userCard')
    expect(attendeeList).toHaveLength(2)

    const attendBtn = screen.getByRole('button', { name: 'Attend' })
    userEvent.click(attendBtn)

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('currentProfileListItem')
    expect(myMeetups).toHaveLength(1)
  })
  it('renders attending meetups in chronological order', () => {
    login('emma@gmail.com', 'emmaIsBest')

    // Navigate to first event page and attend
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]

    userEvent.click(card1)

    const attendBtn = screen.getByRole('button', { name: 'Attend' })
    userEvent.click(attendBtn)

    // Return to homepage
    const homepageLink = screen.getByText('MeetApp')
    userEvent.click(homepageLink)

    //Navigate to next event and attend
    const newCards = screen.getAllByTestId('currentListItem')
    const card2 = newCards[1]
    userEvent.click(card2)
    const newAttendBtn = screen.getByRole('button', { name: 'Attend' })
    userEvent.click(newAttendBtn)

    // Navigate to profile
    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('currentProfileListItem')
    expect(myMeetups[0]).toContainHTML('<p><strong>Start: </strong>Sat Dec 17 2022 13:00</p>')
    expect(myMeetups[1]).toContainHTML('<p><strong>Start: </strong>Tue Dec 27 2022 13:00</p>')
  })
  it('renders 2 attended (PAST) meetups on Hannahs profile page', () => {
    login('hannah@gmail.com', 'hannahIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.getAllByTestId('pastProfileListItem')
    expect(myMeetups).toHaveLength(2)
  })
  it('renders a no past meetups message on Emmas profile page', () => {
    login('emma@gmail.com', 'emmaIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('pastProfileListItem')
    expect(myMeetups).toHaveLength(0)
    const message = screen.getByText('No past meetups')
    expect(message).toBeInTheDocument()
  })
  it('shows past meetups in reverse chronological order', () => {
    login('hannah@gmail.com', 'hannahIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)
    const myMeetups = screen.getAllByTestId('pastProfileListItem')
    expect(myMeetups[0]).toContainHTML('<p><strong>Start: </strong>Wed Dec 08 2021 19:30</p>')
    expect(myMeetups[1]).toContainHTML('<p><strong>Start: </strong>Tue Dec 07 2021 19:00</p>')
  })
  it('renders a list of meetups being hosted - 2 meetups for Hannah', () => {
    login('hannah@gmail.com', 'hannahIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.getAllByTestId('hostingProfileListItem')
    expect(myMeetups).toHaveLength(2)
  })
  it('renders a message when no meetups are being hosted by the user', () => {
    login('emma@gmail.com', 'emmaIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('hostingProfileListItem')
    expect(myMeetups).toHaveLength(0)
    const message = screen.getByText('You are not hosting any meetups yet')
    expect(message).toBeInTheDocument()
  })
  it('renders 2 hosted (PAST) meetups for Joe', () => {
    login('joe@gmail.com', 'joeIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('hostedProfileListItem')
    expect(myMeetups).toHaveLength(2)
  })
  it('renders a message if user has not hosted any past meetups', () => {
    login('emma@gmail.com', 'emmaIsBest')

    const myProfileLink = screen.getByRole('link', { name: 'My Profile' })
    userEvent.click(myProfileLink)

    const myMeetups = screen.queryAllByTestId('hostedProfileListItem')
    expect(myMeetups).toHaveLength(0)
    const message = screen.getByText('You have not hosted any meetups yet')
    expect(message).toBeInTheDocument()
  })
})
