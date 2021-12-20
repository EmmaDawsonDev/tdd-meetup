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
})
