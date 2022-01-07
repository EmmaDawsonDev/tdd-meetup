import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter } from '../../testing-utils'
import AddMeetup from './AddMeetup'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Routes, Route } from 'react-router'
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <AddMeetup />
    </Provider>
  )
})

describe('Add meetup tests', () => {
  it('renders add meetup component (smoke test)', () => {})
  it('renders a title input field', () => {
    const titleInput = screen.getByLabelText('Title', { exact: false })
    expect(titleInput).toBeInTheDocument()
  })
  it('renders a start date input field', () => {
    const startDateInput = screen.getByLabelText('Start Date', { exact: false })
    expect(startDateInput).toBeInTheDocument()
  })
  it('renders a start time input field', () => {
    const startTimeInput = screen.getByLabelText('Start Time', { exact: false })
    expect(startTimeInput).toBeInTheDocument()
  })
  it('renders a end date input field', () => {
    const endDateInput = screen.getByLabelText('End Date', { exact: false })
    expect(endDateInput).toBeInTheDocument()
  })
  it('renders a end time input field', () => {
    const endTimeInput = screen.getByLabelText('End Time', { exact: false })
    expect(endTimeInput).toBeInTheDocument()
  })
  it('renders a description input field', () => {
    const descriptionInput = screen.getByLabelText('Description', { exact: false })
    expect(descriptionInput).toBeInTheDocument()
  })
  it('renders a location input field', () => {
    const locationInput = screen.getByLabelText('Location', { exact: false })
    expect(locationInput).toBeInTheDocument()
  })
  it('renders a price input field', () => {
    const priceInput = screen.getByLabelText('Price', { exact: false })
    expect(priceInput).toBeInTheDocument()
  })
  it('renders a attendee limit input field', () => {
    const attendeeLimitInput = screen.getByLabelText('Attendee Limit', { exact: false })
    expect(attendeeLimitInput).toBeInTheDocument()
  })
})
