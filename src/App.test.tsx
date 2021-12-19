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
})
