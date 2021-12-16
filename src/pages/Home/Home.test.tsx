import { render, screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import Home from './Home'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

describe('Home unit tests', () => {
  it('renders Home component correctly (smoketest)', () => {
    renderWithRouter(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })
  it('renders a list of 3 coming meetups', async () => {
    renderWithRouter(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    const products = await screen.findAllByTestId('currentListItem')
    expect(products).toHaveLength(3)
  })
  it('renders a list in chronological order', async () => {
    renderWithRouter(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const products = await screen.findAllByTestId('currentListItem')
    expect(products[0]).toContainHTML("<p><strong>Start: </strong>Fri Dec 17 2021 13:00</p>")
    expect(products[1]).toContainHTML("<p><strong>Start: </strong>Mon Dec 27 2021 13:00</p>")
    expect(products[2]).toContainHTML("<p><strong>Start: </strong>Fri Jan 07 2022 19:30</p>")
  })
})

// Fri Dec 17 2021