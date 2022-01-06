import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

import userEvent from '@testing-library/user-event'
import { reset as resetUsers } from '../../store/usersSlice'
import { reset as resetMeetUps } from '../../store/meetupsSlice'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

// afterEach(() => {

// })

describe('App integration tests - registering for events', () => {
  it('doesnt render an attend button when user is logged out', () => {
    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(attendBtn).not.toBeInTheDocument()
  })
  it('renders an attend button on meetup detail page when user is logged in if event is not full', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(attendBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it("doesn't render an attend button if the event has already past", () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(attendBtn).not.toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders a meetup is over message instead of attend button if meetup is past', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const message = screen.getByText('Meetup is over')
    expect(message).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders message Meetup full if attendee limit is reached', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card3 = cards[2]
    userEvent.click(card3)

    const message = screen.getByText('Meetup is fully booked')
    expect(message).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders a log in to attend button if user is not logged in', () => {
    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const loginPromptBtn = screen.getByRole('button', { name: 'Log in to attend' })
    expect(loginPromptBtn).toBeInTheDocument()
  })
  it('adds attendee to list of attendees when attend button is clicked', async () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'sofie@gmail.com')
    userEvent.type(passwordInput, 'sofieIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendeeList = screen.getAllByTestId('userCard')
    expect(attendeeList).toHaveLength(2)

    const attendBtn = screen.getByRole('button', { name: 'Attend' })
    userEvent.click(attendBtn)

    const updatedAttendeeList = await screen.findAllByTestId('userCard')
    expect(updatedAttendeeList).toHaveLength(3)

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('Reduces the number of places by one when someone registers to attend', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'emma@gmail.com')
    userEvent.type(passwordInput, 'emmaIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const numberOfPlaces = screen.getByTestId('places-left')

    expect(numberOfPlaces).toContainHTML('<p data-testid="places-left"><strong>Places left: </strong>17</p>') // find a way to reset tests in between

    const attendBtn = screen.getByRole('button', { name: 'Attend' })
    userEvent.click(attendBtn)

    const updatedNumberOfPlaces = screen.getByTestId('places-left')
    expect(updatedNumberOfPlaces).toContainHTML('<p data-testid="places-left"><strong>Places left: </strong>16</p>')

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it("doesn't render the attend button if you already registered", () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(attendBtn).not.toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders an empty comment input once logged in', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const commentInput = screen.queryByLabelText('Add a comment')

    expect(commentInput).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders an add comment button once logged in', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const addCommentBtn = screen.queryByRole('button', { name: 'Add' })
    expect(addCommentBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders 2 comments initially for swim meetup', () => {
    const cards = screen.getAllByTestId('pastListItem')
    const card2 = cards[1]
    userEvent.click(card2)

    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList).toHaveLength(2)
  })
  it('renders comments in chronological order (oldest first)', () => {
    const cards = screen.getAllByTestId('pastListItem')
    const card2 = cards[1]
    userEvent.click(card2)

    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList[0]).toHaveTextContent('11:00')
    expect(commentsList[1]).toHaveTextContent('11:21')
  })
  it('adds a new comment to the list when add comment button is pressed', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList).toHaveLength(0)

    const commentInput = screen.getByLabelText('Add a comment')
    const addCommentBtn = screen.getByRole('button', { name: 'Add' })
    userEvent.type(commentInput, 'This is a test')
    userEvent.click(addCommentBtn)

    const updatedCommentsList = screen.queryAllByTestId('commentListItem')
    expect(updatedCommentsList).toHaveLength(1)

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('adds a new comment to the bottom of the list (chronological order)', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card2 = cards[1]
    userEvent.click(card2)

    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList).toHaveLength(2)

    const commentInput = screen.getByLabelText('Add a comment')
    const addCommentBtn = screen.getByRole('button', { name: 'Add' })
    userEvent.type(commentInput, 'This is a test')
    userEvent.click(addCommentBtn)

    const updatedCommentsList = screen.queryAllByTestId('commentListItem')
    expect(updatedCommentsList).toHaveLength(3)
    expect(updatedCommentsList[0]).toHaveTextContent('11:00')
    expect(updatedCommentsList[1]).toHaveTextContent('11:21')
    expect(updatedCommentsList[2]).toHaveTextContent('This is a test')

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders a ratings bar when user is logged in and attended a past meetup', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const ratingInput = screen.queryAllByTestId('star-rating')
    expect(ratingInput).toHaveLength(5)

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('doesnt render a ratings bar when user is logged in but did not attend a past meetup', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'sofie@gmail.com')
    userEvent.type(passwordInput, 'sofieIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const ratingInput = screen.queryAllByTestId('star-rating')
    expect(ratingInput).toHaveLength(0)

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders an add rating button when logged in and user attended meetup', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    // Find button
    const addRatingBtn = screen.getByRole('button', { name: 'Add rating' })
    expect(addRatingBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('updates the rating when a new rating is submitted', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('pastListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    // Find button add add rating

    const ratingInput = screen.queryAllByTestId('star-rating')
    userEvent.click(ratingInput[4])

    const addRatingBtn = screen.getByRole('button', { name: 'Add rating' })
    userEvent.click(addRatingBtn)

    const rating = screen.getByText('5 / 5')
    expect(rating).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('renders an unregister button if user is already registered to attend meetup', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const unregisterBtn = screen.queryByRole('button', { name: 'Unregister' })
    expect(unregisterBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('removes attendee from list when clicking unregister', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'joe@gmail.com')
    userEvent.type(passwordInput, 'joeIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const userCards = screen.getAllByTestId('userCard')
    expect(userCards).toHaveLength(4)

    const numPlacesLeft = screen.getByTestId('places-left')
    expect(numPlacesLeft).toContainHTML('<p data-testid="places-left"><strong>Places left: </strong>16</p>')

    const unregisterBtn = screen.getByRole('button', { name: 'Unregister' })
    userEvent.click(unregisterBtn)

    const updatedUserCards = screen.getAllByTestId('userCard')
    expect(updatedUserCards).toHaveLength(3)

    const updatedNumPlacesLeft = screen.getByTestId('places-left')
    expect(updatedNumPlacesLeft).toContainHTML('<p data-testid="places-left"><strong>Places left: </strong>17</p>')

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('shows the attend button again when clicking unregister', () => {
    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'emma@gmail.com')
    userEvent.type(passwordInput, 'emmaIsBest')
    userEvent.click(submitBtn)

    // Navigate to detail page
    const cards = screen.getAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const attendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(attendBtn).not.toBeInTheDocument()

    const unregisterBtn = screen.getByRole('button', { name: 'Unregister' })
    userEvent.click(unregisterBtn)

    const newAttendBtn = screen.queryByRole('button', { name: 'Attend' })
    expect(newAttendBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
})


