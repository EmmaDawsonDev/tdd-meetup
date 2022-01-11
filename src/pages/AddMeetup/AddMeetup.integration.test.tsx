import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { makeStore } from '../../store/store'
import { Provider } from 'react-redux'
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

const inputNewMeetup = (
  title: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  description: string,
  location: string
) => {
  const addMeetupBtn = screen.getByRole('button', { name: '+' })
  userEvent.click(addMeetupBtn)
  const titleInput = screen.getByLabelText('Title', { exact: false })
  const startDateInput = screen.getByLabelText('Start Date', { exact: false })
  const startTimeInput = screen.getByLabelText('Start Time', { exact: false })
  const endDateInput = screen.getByLabelText('End Date', { exact: false })
  const endTimeInput = screen.getByLabelText('End Time', { exact: false })
  const descriptionInput = screen.getByLabelText('Description', { exact: false })
  const locationInput = screen.getByLabelText('Location', { exact: false })
  const addBtn = screen.getByRole('button', { name: 'Add meetup' })
  userEvent.type(titleInput, title)
  userEvent.type(startDateInput, startDate)
  userEvent.type(startTimeInput, startTime)
  userEvent.type(endDateInput, endDate)
  userEvent.type(endTimeInput, endTime)
  userEvent.type(descriptionInput, description)
  userEvent.type(locationInput, location)
  userEvent.click(addBtn)
}

describe('Add meetup integration tests', () => {
  it('adds a meetup to the list', () => {
    const currentMeetupList = screen.getAllByTestId('currentListItem')
    expect(currentMeetupList).toHaveLength(3)
    // Login
    login('hannah@gmail.com', 'hannahIsBest')
    // Add meetup
    inputNewMeetup('New Meetup', '2022-03-06', '18:00', '2022-03-06', '20:00', 'This is a description', 'Nyköping')
    const updatedCurrentMeetupList = screen.getAllByTestId('currentListItem')
    expect(updatedCurrentMeetupList).toHaveLength(4)
  })
  it('shows an error if the meetup date has already passed', () => {
    // Login
    login('hannah@gmail.com', 'hannahIsBest')
    // Add meetup
    inputNewMeetup('New Meetup', '2021-03-06', '18:00', '2021-03-06', '20:00', 'This is a description', 'Nyköping')
    const errorMessage = screen.getByText('Please choose a future date')
    expect(errorMessage).toBeInTheDocument()
  })
  it('adds a meetup to the list in the correct order', () => {
    // Login
    login('hannah@gmail.com', 'hannahIsBest')
    // Add meetup
    inputNewMeetup('New Meetup', '2022-12-26', '18:00', '2022-12-26', '20:00', 'This is a description', 'Nyköping')

    const updatedCurrentMeetupList = screen.getAllByTestId('currentListItem')
    expect(updatedCurrentMeetupList).toHaveLength(4)
    expect(updatedCurrentMeetupList[0]).toContainHTML('<p><strong>Start: </strong>Sat Dec 17 2022 13:00</p>')
    expect(updatedCurrentMeetupList[1]).toContainHTML('<p><strong>Start: </strong>Mon Dec 26 2022 18:00</p>')
    expect(updatedCurrentMeetupList[2]).toContainHTML('<p><strong>Start: </strong>Tue Dec 27 2022 13:00</p>')
    expect(updatedCurrentMeetupList[3]).toContainHTML('<p><strong>Start: </strong>Sat Jan 07 2023 19:30</p>')
  })
  it('shows an error if end date is before start date', () => {
    // Login
    login('hannah@gmail.com', 'hannahIsBest')
    // Add meetup
    inputNewMeetup('New Meetup', '2021-03-06', '18:00', '2021-03-05', '20:00', 'This is a description', 'Nyköping')
    const errorMessage = screen.getByText('Meetup must end after start date and time')
    expect(errorMessage).toBeInTheDocument()
  })
})
