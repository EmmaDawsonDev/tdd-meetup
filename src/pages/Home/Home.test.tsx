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
})
