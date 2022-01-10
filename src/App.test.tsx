import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from './testing-utils'
import App from './App'
// import { store } from './store/store'
import { makeStore } from './store/store'
import { Provider } from 'react-redux'

import userEvent from '@testing-library/user-event'

beforeEach(() => {
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

test('renders App component (smoke test)', () => {})

describe('App integration tests - navigating', () => {
  it('renders home page initially', () => {
    const currentMeetupsTitle = screen.getByText(/Current Meetups/i)
    expect(currentMeetupsTitle).toBeInTheDocument()
  })
  it('renders meetup detail page when card is clicked', async () => {
    const cards = await screen.findAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const meetupPage = await screen.findByTestId('meetup-detail-page')
    expect(meetupPage).toBeInTheDocument()
  })
})

describe('App integration test - login and logout flows', () => {
  it('renders log in page when login button in header is clicked', async () => {
    const loginBtn = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginBtn)
    const loginPage = await screen.findByRole('heading', { name: 'Log in' })
    expect(loginPage).toBeInTheDocument()
  })
  it("doesn't render login button in header when route is /login", () => {
    const loginBtn = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginBtn)

    const sameLoginButton = screen.queryByRole('button', { name: /login/i })
    expect(sameLoginButton).not.toBeInTheDocument()
  })
  it('redirects to previous page if user credentials are correct when logging in', () => {
    login("hannah@gmail.com", "hannahIsBest")

    const title = screen.getByRole('heading', { name: 'Current meetups' })
    expect(title).toBeInTheDocument()

    
  })
  it("renders the user's name in the header when logged in", () => {
    login("hannah@gmail.com", "hannahIsBest")

    const username = screen.getByText('Welcome, Hannah')
    expect(username).toBeInTheDocument()

    
  })
  it('renders a log out button in the header when user is logged in', () => {
    login("hannah@gmail.com", "hannahIsBest")

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    expect(logoutBtn).toBeInTheDocument()
    
  })
  it('doesnt render a log in button in the header when user is logged in', () => {
    login("hannah@gmail.com", "hannahIsBest")

    const sameLoginBtn = screen.queryByRole('button', { name: /login/i })
    expect(sameLoginBtn).not.toBeInTheDocument()

    
  })
  it('renders log in button again once logged out', () => {
    login("hannah@gmail.com", "hannahIsBest")

    const loginBtn = screen.queryByRole('button', { name: /login/i })
    expect(loginBtn).not.toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)

    const sameLoginBtn = screen.queryByRole('button', { name: /login/i })
    const username = screen.queryByText('Welcome, Hannah')

    expect(sameLoginBtn).toBeInTheDocument()
    expect(username).not.toBeInTheDocument()
  })
  it('renders my profile link in header when logged in', () => {
    const myProfileLink = screen.queryByRole('link', { name: 'My profile' })
    expect(myProfileLink).not.toBeInTheDocument()

    login("hannah@gmail.com", "hannahIsBest")

    const newMyProfileLink = screen.queryByRole('link', { name: 'My Profile' })
    expect(newMyProfileLink).toBeInTheDocument()

    
  })
  
})


