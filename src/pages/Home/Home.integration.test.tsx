import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import App from '../../App'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { resetMeetups } from '../../data/meetups'
import { resetUsers } from '../../data/users'

beforeEach(() => {
  resetMeetups()
  resetUsers()

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

const logout = () => {
  const logoutBtn = screen.queryByRole('button', { name: /log out/i })
  if (logoutBtn) {
    userEvent.click(logoutBtn)
  }
}

describe('Home integration tests', () => {
  it('renders an add meetup button on main page when logged in', () => {
    const addMeetupBtn = screen.queryByRole('button', { name: '+' })
    expect(addMeetupBtn).not.toBeInTheDocument()

    login('hannah@gmail.com', 'hannahIsBest')

    const newAddMeetupBtn = screen.queryByRole('button', { name: '+' })
    expect(newAddMeetupBtn).toBeInTheDocument()

    logout()
  })
  it('reroutes to add meetup page when add meetup button is clicked', () => {
    login('hannah@gmail.com', 'hannahIsBest')

    const addMeetupBtn = screen.getByRole('button', { name: '+' })
    userEvent.click(addMeetupBtn)

    const addMeetupTitle = screen.getByRole('heading', { name: 'Add Meetup' })
    expect(addMeetupTitle).toBeInTheDocument()

    logout()
  })
})
