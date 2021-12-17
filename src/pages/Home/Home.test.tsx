import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import Home from './Home'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import {mount} from "enzyme"
import {Routes, Route} from "react-router"
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <Home />
    </Provider>
  )
})

describe('Home unit tests - meetup lists', () => {
  it('renders Home component correctly (smoketest)', () => {})
  it('renders a list of 3 coming meetups', async () => {
    const meetups = await screen.findAllByTestId('currentListItem')
    expect(meetups).toHaveLength(3)
  })
  it('renders a list in chronological order', async () => {
    const meetups = await screen.findAllByTestId('currentListItem')
    expect(meetups[0]).toContainHTML('<p><strong>Start: </strong>Sat Dec 17 2022 13:00</p>')
    expect(meetups[1]).toContainHTML('<p><strong>Start: </strong>Tue Dec 27 2022 13:00</p>')
    expect(meetups[2]).toContainHTML('<p><strong>Start: </strong>Sat Jan 07 2023 19:30</p>')
  })
  it('renders a list of 2 past meetups', async () => {
    const meetups = await screen.findAllByTestId('pastListItem')
    expect(meetups).toHaveLength(2)
  })
  it('renders a list of past meetups in reverse chronological order', async () => {
    const meetups = await screen.findAllByTestId('pastListItem')
    expect(meetups[0]).toContainHTML('<p><strong>Start: </strong>Wed Dec 08 2021 19:30</p>')
    expect(meetups[1]).toContainHTML('<p><strong>Start: </strong>Tue Dec 07 2021 19:00</p>')
  })
  it('renders different css styling for past events', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    )

    const pastItems = wrapper.find('.cardWrapperPast')

    expect(pastItems.length).toBe(2)
  })
  it('renders the text PAST on past meetup cards', () => {
    const pastText = screen.getAllByText('- PAST')

    expect(pastText).toHaveLength(2)
  })
})

describe('Home unit tests - search', () => {
  it('renders one past meetup when searching for backend', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredMeetups = screen.getAllByTestId('pastListItem')

    expect(filteredMeetups).toHaveLength(2)

    userEvent.type(searchBox, 'Backend')

    const newFilteredMeetups = screen.getAllByTestId('pastListItem')

    expect(newFilteredMeetups).toHaveLength(1)
  })
  it('renders no past meetups found message when searching for frontend', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredMeetups = screen.getAllByTestId('pastListItem')

    expect(filteredMeetups).toHaveLength(2)

    userEvent.type(searchBox, 'frontend')

    const newFilteredMeetups = screen.queryAllByTestId('pastListItem')
    const message = screen.getByText(/no past meetups found/i)

    expect(newFilteredMeetups).toHaveLength(0)
    expect(message).toBeInTheDocument()
  })
  it('renders a search input field', () => {
    const searchBox = screen.getByLabelText(/search/i)
    expect(searchBox).toBeInTheDocument()
  })
  it('renders an empty search input field initially', () => {
    const searchBox = screen.getByRole('searchbox')
    expect(searchBox.textContent).toBe('')
  })
  it('renders one meetup when searching for frontend', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredMeetups = screen.getAllByTestId('currentListItem')

    expect(filteredMeetups).toHaveLength(3)

    userEvent.type(searchBox, 'Frontend')

    const newFilteredMeetups = screen.getAllByTestId('currentListItem')

    expect(newFilteredMeetups).toHaveLength(1)
  })
  it('search is case insensitive', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredProducts = screen.getAllByTestId('currentListItem')

    expect(filteredProducts).toHaveLength(3)

    userEvent.type(searchBox, 'Javascript')

    const newFilteredProducts = screen.getAllByTestId('currentListItem')

    expect(newFilteredProducts).toHaveLength(2)
  })
  it('renders a no matches found message if search doesnt have any matches', () => {
    const searchBox = screen.getByRole('searchbox')
    const filteredMeetups = screen.getAllByTestId('currentListItem')

    expect(filteredMeetups).toHaveLength(3)

    userEvent.type(searchBox, 'xyz')

    const newFilteredMeetups = screen.queryAllByTestId('currentListItem')
    const message = screen.getByText(/no current meetups found/i)

    expect(newFilteredMeetups).toHaveLength(0)
    expect(message).toBeInTheDocument()
  })
  it('shows the current search string as a button when the string is not empty', () => {
    const searchBox = screen.getByRole('searchbox')

    const invisibleSearchString = screen.queryByRole('button', { name: '' })

    expect(invisibleSearchString).not.toBeInTheDocument()

    userEvent.type(searchBox, 'javascript')

    const searchString = screen.getByRole('button', { name: /javascript/i })

    expect(searchString).toBeInTheDocument()
  })
  it('clears the search when the search string button is pressed', () => {
    const searchBox = screen.getByRole('searchbox')

    userEvent.type(searchBox, 'javascript')
    const filteredMeetups = screen.getAllByTestId('currentListItem')

    expect(filteredMeetups).toHaveLength(2)

    const searchString = screen.getByRole('button', { name: /javascript/i })

    userEvent.click(searchString)

    const newFilteredMeetups = screen.getAllByTestId('currentListItem')

    expect(newFilteredMeetups).toHaveLength(3)
  })
})

describe('Home unit tests - date picker', () => {
  it('renders a date input on the screen', () => {
    const dateInput = screen.getByLabelText(/date/i)

    expect(dateInput).toBeInTheDocument()
  })
  it('shows the current date filter if a date is chosen', () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2021-12-07')

    const dateString = screen.getByRole('button', { name: /2021-12-07/ })

    expect(dateString).toBeInTheDocument()
  })
  it('shows the Javascript meetup for a date filter 2022-12-17', async () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2022-12-17')

    const currentMeetups = await screen.findAllByTestId('currentListItem')
    expect(currentMeetups).toHaveLength(1)
  })
  it('shows a no matches found in past meetups for date filter 2022-12-17', async () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2022-12-17')

    const message = await screen.findByText(/no past meetups found/i)

    expect(message).toBeInTheDocument()
  })
  it('shows the swimming past meetup for a date filter 2021-12-07', async () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2021-12-07')

    const pastMeetups = await screen.findAllByTestId('pastListItem')
    expect(pastMeetups).toHaveLength(1)
  })
  it('shows a no matches found in current meetups for date filter 2021-12-07', async () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2021-12-07')

    const message = screen.getByText(/no current meetups found/i)

    expect(message).toBeInTheDocument()
  })
  it('removes the date filter when date filter button is clicked', async () => {
    const dateInput = screen.getByLabelText(/date/i)

    userEvent.type(dateInput, '2022-12-17')

    const currentMeetups = await screen.findAllByTestId('currentListItem')
    expect(currentMeetups).toHaveLength(1)

    const dateString = screen.getByRole('button', { name: /2022-12-17/ })

    userEvent.click(dateString)

    const unfilteredCurrentMeetups = await screen.findAllByTestId('currentListItem')
    expect(unfilteredCurrentMeetups).toHaveLength(3)
  })
  it('removes all search and date filters when clicking remove all button', () => {
    const dateInput = screen.getByLabelText(/date/i)
    const searchBox = screen.getByRole('searchbox')

    userEvent.type(dateInput, '2022-12-17')
    userEvent.type(searchBox, 'javascript')

    const removeButton = screen.getByRole('button', { name: /remove/i })

    userEvent.click(removeButton)

    const currentMeetups = screen.getAllByTestId('currentListItem')
    const pastMeetups = screen.getAllByTestId('pastListItem')
    expect(currentMeetups).toHaveLength(3)
    expect(pastMeetups).toHaveLength(2)
  })
})


