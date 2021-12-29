import { screen } from '@testing-library/react'
import { renderWithPath } from '../../testing-utils'
import MeetupDetail from './MeetupDetail'

beforeEach(() => {
  renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
})

describe('Meetup detail unit tests', () => {
  it('renders the meetup detail component (smoke test)', () => {})
  it('displays the meetup title', async () => {
    const title = await screen.findByRole('heading', { name: 'Javascript meetup' })

    expect(title).toBeInTheDocument()
  })
  it('displays the start date', () => {
    const startDate = screen.getByText('Sat Dec 17 2022 13:00', { exact: false })
    expect(startDate).toBeInTheDocument()
  })
  it('displays the end date', () => {
    const endDate = screen.getByText('Sat Dec 17 2022 15:00', { exact: false })
    expect(endDate).toBeInTheDocument()
  })
  it('displays the location', () => {
    const location = screen.getByText('10 Main Street, London', { exact: false })
    expect(location).toBeInTheDocument()
  })
  it('displays the host', () => {
    const host = screen.getByText('Hannah', { exact: false })
    expect(host).toBeInTheDocument()
  })
  it('displays the description', () => {
    const description = screen.getByText('Description', { exact: false })
    expect(description).toBeInTheDocument()
  })
  it('displays the price', () => {
    const price = screen.getByText('Price', { exact: false })
    expect(price).toBeInTheDocument()
  })
  it('displays the attendees', () => {
    const attendeesList = screen.getAllByTestId('userCard')
    expect(attendeesList).toHaveLength(2)
  })
  it('doesnt render a text area input for comments if user is logged out', () => {
    const commentInput = screen.queryByLabelText('Add a comment')
    expect(commentInput).not.toBeInTheDocument()
  })
  it('doesnt render an add comment button if user is logged out', () => {
    const addCommentButton = screen.queryByRole('button', { name: 'Add' })
    expect(addCommentButton).not.toBeInTheDocument()
  })
  it('renders a list of empty comments initially for meetup with id 1', () => {
    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList).toHaveLength(0)
  })
  
})
