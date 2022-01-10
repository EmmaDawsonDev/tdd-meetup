import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Routes, Route } from 'react-router'
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

describe('Add meetup integration tests', () => {
  it('adds a meetup to the list', () => {
    const currentMeetupList = screen.getAllByTestId('currentListItem')
    expect(currentMeetupList).toHaveLength(3)

    // Login
    const loginBtn = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    // Add meetup
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

    userEvent.type(titleInput, 'New Meetup')
    userEvent.type(startDateInput, '2022-03-06')
    userEvent.type(startTimeInput, '18:00')
    userEvent.type(endDateInput, '2022-03-06')
    userEvent.type(endTimeInput, '20:00')
    userEvent.type(descriptionInput, 'This is a description')
    userEvent.type(locationInput, 'Nyköping')
    userEvent.click(addBtn)

    const updatedCurrentMeetupList = screen.getAllByTestId('currentListItem')
    expect(updatedCurrentMeetupList).toHaveLength(4)

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
})
