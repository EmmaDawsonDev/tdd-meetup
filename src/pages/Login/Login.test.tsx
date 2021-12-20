import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import Login from './Login'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Routes, Route } from 'react-router'
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <Login />
    </Provider>
  )
})

describe('Login unit tests', () => {
  it('renders login component correctly (smoke test', () => {})
  it('renders an empty email input field initially', () => {
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.textContent).toBe('')
  })
  it('renders an empty password input field initially', () => {
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput.textContent).toBe('')
  })
  it('renders a log in button', () => {
    const loginBtn = screen.getByTestId('login-btn')
    expect(loginBtn).toBeInTheDocument()
  })
})
