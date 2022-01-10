import { screen } from '@testing-library/react'
import { renderWithPath } from '../../testing-utils'
import MeetupDetail from './MeetupDetail'



describe('Meetup detail unit tests', () => {
  it('renders the meetup detail component (smoke test)', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
  })
  it('displays the meetup title', async () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const title = await screen.findByRole('heading', { name: 'Javascript meetup' })
    expect(title).toBeInTheDocument()
  })
  it('displays the start date', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const startDate = screen.getByText('Sat Dec 17 2022 13:00', { exact: false })
    expect(startDate).toBeInTheDocument()
  })
  it('displays the end date', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const endDate = screen.getByText('Sat Dec 17 2022 15:00', { exact: false })
    expect(endDate).toBeInTheDocument()
  })
  it('displays the location', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const location = screen.getByText('10 Main Street, London', { exact: false })
    expect(location).toBeInTheDocument()
  })
  it('displays the host', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const host = screen.getByText('Hannah', { exact: false })
    expect(host).toBeInTheDocument()
  })
  it('displays the description', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const description = screen.getByText('Description', { exact: false })
    expect(description).toBeInTheDocument()
  })
  it('displays the price', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const price = screen.getByText('Price', { exact: false })
    expect(price).toBeInTheDocument()
  })
  it('displays the attendees', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const attendeesList = screen.getAllByTestId('userCard')
    expect(attendeesList).toHaveLength(2)
  })
  it('doesnt render a text area input for comments if user is logged out', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const commentInput = screen.queryByLabelText('Add a comment')
    expect(commentInput).not.toBeInTheDocument()
  })
  it('doesnt render an add comment button if user is logged out', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const addCommentButton = screen.queryByRole('button', { name: 'Add' })
    expect(addCommentButton).not.toBeInTheDocument()
  })
  it('renders a list of empty comments initially for meetup with id 1', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const commentsList = screen.queryAllByTestId('commentListItem')
    const commentsMessage = screen.getByText('No comments yet')
    expect(commentsList).toHaveLength(0)
    expect(commentsMessage).toBeInTheDocument()
  })
  it('renders a list of 2 comments initially for meetup with id 3', () => {
    renderWithPath('/meetups/3', <MeetupDetail />, '/meetups/:id')
    const commentsList = screen.queryAllByTestId('commentListItem')
    expect(commentsList).toHaveLength(2)
  })
  it('does not render a rating for future meetups', () => {
    renderWithPath('/meetups/1', <MeetupDetail />, '/meetups/:id')
    const ratingContainer = screen.queryByTestId('rating')
    expect(ratingContainer).not.toBeInTheDocument()
  })
  it('renders a rating for past meetups', () => {
    renderWithPath('/meetups/3', <MeetupDetail />, '/meetups/:id')
    const ratingContainer = screen.queryByTestId('rating')
    expect(ratingContainer).toBeInTheDocument()
  })
  it('renders a rating of 4.5 for  meetup with id 3', () => {
    renderWithPath('/meetups/3', <MeetupDetail />, '/meetups/:id')
    const rating = screen.getByText('4.5 / 5')
    expect(rating).toBeInTheDocument()
  })
  it('renders a no ratings yet message for  meetup with id 5', () => {
    renderWithPath('/meetups/5', <MeetupDetail />, '/meetups/:id')
    const ratingMessage = screen.getByText('No ratings yet')
    expect(ratingMessage).toBeInTheDocument()
  })
  it('does not render ratings input when user is logged out', () => {
    renderWithPath('/meetups/3', <MeetupDetail />, '/meetups/:id')
    const ratingInput = screen.queryAllByTestId('star-rating')
    expect(ratingInput).toHaveLength(0)
  })
  
})
