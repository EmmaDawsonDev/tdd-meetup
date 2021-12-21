import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

import userEvent from '@testing-library/user-event'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

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
  })
})
