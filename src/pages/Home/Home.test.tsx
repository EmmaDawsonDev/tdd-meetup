import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import Home from './Home'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <Home />
    </Provider>
  )
})

describe('Home unit tests', () => {
  it('renders Home component correctly (smoketest)', () => {})
  it('renders a list of 3 coming meetups', async () => {
    const products = await screen.findAllByTestId('currentListItem')
    expect(products).toHaveLength(3)
  })
  it('renders a list in chronological order', async () => {
    const products = await screen.findAllByTestId('currentListItem')
    expect(products[0]).toContainHTML('<p><strong>Start: </strong>Fri Dec 17 2021 13:00</p>')
    expect(products[1]).toContainHTML('<p><strong>Start: </strong>Mon Dec 27 2021 13:00</p>')
    expect(products[2]).toContainHTML('<p><strong>Start: </strong>Fri Jan 07 2022 19:30</p>')
  })
  it('renders a search input field', () => {
    const searchBox = screen.getByLabelText(/search/i)
    expect(searchBox).toBeInTheDocument()
  })
  it('renders an empty search input field initially', () => {
    const searchBox = screen.getByRole('searchbox')
    expect(searchBox.textContent).toBe('')
  })
  it('renders one meetups when searching for frontend', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredProducts = screen.getAllByTestId('currentListItem')

    expect(filteredProducts).toHaveLength(3)

    userEvent.type(searchBox, 'Frontend')

    const newFilteredProducts = screen.getAllByTestId('currentListItem')

    expect(newFilteredProducts).toHaveLength(1)
  })
  it('search is case insensitive', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredProducts = screen.getAllByTestId('currentListItem')

    expect(filteredProducts).toHaveLength(3)

    userEvent.type(searchBox, 'Javascript')

    const newFilteredProducts = screen.getAllByTestId('currentListItem')

    expect(newFilteredProducts).toHaveLength(2)
  })
})

