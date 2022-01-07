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

describe('Home integration tests', () => {
  it('renders an add meetup button on main page when logged in', () => {
    const addMeetupBtn = screen.queryByRole('button', { name: '+' })
    expect(addMeetupBtn).not.toBeInTheDocument()

    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    const newAddMeetupBtn = screen.queryByRole('button', { name: '+' })
    expect(newAddMeetupBtn).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
  it('reroutes to add meetup page when add meetup button is clicked', () => {
    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    const addMeetupBtn = screen.getByRole('button', { name: '+' })
    userEvent.click(addMeetupBtn)

    const addMeetupTitle = screen.getByRole('heading', { name: 'Add Meetup' })
    expect(addMeetupTitle).toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)
  })
})
