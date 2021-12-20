import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from './testing-utils'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

test('renders App component (smoke test)', () => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

describe('App integration tests', () => {
  it('renders home page initially', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const currentMeetupsTitle = screen.getByText(/Current Meetups/i)
    expect(currentMeetupsTitle).toBeInTheDocument()
  })
  it('renders meetup detail page when card is clicked', async () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const cards = await screen.findAllByTestId('currentListItem')
    const card1 = cards[0]
    userEvent.click(card1)

    const meetupPage = await screen.findByTestId('meetup-detail-page')
    expect(meetupPage).toBeInTheDocument()
  })
  it('renders log in page when login button in header is clicked', async () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const loginBtn = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginBtn)
    const loginPage = await screen.findByRole('heading', { name: 'Log in' })
    expect(loginPage).toBeInTheDocument()
  })
  it("doesn't render login button in header when route is /login", () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const loginBtn = screen.getByRole('button', { name: /login/i })
    userEvent.click(loginBtn)

    const sameLoginButton = screen.queryByRole('button', { name: /login/i })
    expect(sameLoginButton).not.toBeInTheDocument()
  })
  it('redirects to previous page if user credentials are correct when logging in', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const loginBtn = screen.getByRole('button', { name: /login/i })

    userEvent.click(loginBtn)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByTestId('login-btn')

    userEvent.type(emailInput, 'hannah@gmail.com')
    userEvent.type(passwordInput, 'hannahIsBest')
    userEvent.click(submitBtn)

    const title = screen.getByRole('heading', { name: 'Current meetups' })
    expect(title).toBeInTheDocument()
  })
  it("renders the user's name in the header when logged in", () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    //Still logged in after previous test
    // const loginBtn = screen.getByRole('button', { name: /login/i })

    // userEvent.click(loginBtn)

    // const emailInput = screen.getByLabelText(/email/i)
    // const passwordInput = screen.getByLabelText(/password/i)
    // const submitBtn = screen.getByTestId('login-btn')

    // userEvent.type(emailInput, 'hannah@gmail.com')
    // userEvent.type(passwordInput, 'hannahIsBest')
    // userEvent.click(submitBtn)

    const username = screen.getByText('Welcome, Hannah')
    expect(username).toBeInTheDocument()
  })
  it('renders a log out button in the header when user is logged in', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )
    // Still logged in
    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    expect(logoutBtn).toBeInTheDocument()
  })
  it('doesnt render a log in button in the header when user is logged in', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )
    // Still logged in
    const loginBtn = screen.queryByRole('button', { name: /login/i })
    expect(loginBtn).not.toBeInTheDocument()
  })
  it('renders log in button again once logged out', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const loginBtn = screen.queryByRole('button', { name: /login/i })
    expect(loginBtn).not.toBeInTheDocument()

    const logoutBtn = screen.getByRole('button', { name: /log out/i })
    userEvent.click(logoutBtn)

    const sameLoginBtn = screen.queryByRole('button', { name: /login/i })
    const username = screen.queryByText('Welcome, Hannah')

    expect(sameLoginBtn).toBeInTheDocument()
    expect(username).not.toBeInTheDocument()
  })
})
