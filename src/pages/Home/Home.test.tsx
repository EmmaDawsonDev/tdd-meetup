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

describe('Home unit tests', () => {
  it('renders Home component correctly (smoketest)', () => {})
  it('renders a list of 3 coming meetups', async () => {
    const meetups = await screen.findAllByTestId('currentListItem')
    expect(meetups).toHaveLength(3)
  })
  it('renders a list in chronological order', async () => {
    const meetups = await screen.findAllByTestId('currentListItem')
    expect(meetups[0]).toContainHTML('<p><strong>Start: </strong>Fri Dec 17 2021 13:00</p>')
    expect(meetups[1]).toContainHTML('<p><strong>Start: </strong>Mon Dec 27 2021 13:00</p>')
    expect(meetups[2]).toContainHTML('<p><strong>Start: </strong>Fri Jan 07 2022 19:30</p>')
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
  it('shows the current search string when the string is not empty', () => {
    const searchBox = screen.getByRole('searchbox')

    const invisibleSearchString = screen.queryByRole('button', { name: '' })

    expect(invisibleSearchString).not.toBeInTheDocument()

    userEvent.type(searchBox, 'javascript')

    const searchString = screen.getByRole('button', { name: /javascript/i })

    expect(searchString).toBeInTheDocument()
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
  it('renders different css styling for past events', () => {
    const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </Provider>)

    const pastItems = wrapper.find(".cardWrapperPast")

    expect(pastItems.length).toBe(2)

  })
  it("renders the text PAST on past meetup cards", () => {
    const pastText = screen.getAllByText("- PAST")

    expect(pastText).toHaveLength(2)
  })
})

//expect(wrapper.find('.my-button').hasClass('disabled')).to.equal(true);
