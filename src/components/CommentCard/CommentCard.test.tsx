import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import CommentCard from './CommentCard'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

const comment = { name: 'Hannah', date: new Date('2021-12-06T11:00:00'), content: 'How warm is the water?' }

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <CommentCard comment={comment} />
    </Provider>
  )
})

describe('Comment card tests', () => {
  it('renders the comment content', () => {
    const commentContent = screen.getByText('How warm is the water?')
    expect(commentContent).toBeInTheDocument()
  })
  it('renders the commenters name', () => {
    const commentersName = screen.getByTestId('commenters-name')
    expect(commentersName).toBeInTheDocument()
    expect(commentersName).toHaveTextContent('Hannah')
  })
  it('renders the date the comment was made', () => {
    const commentDate = screen.getByText('06/12/2021')
    expect(commentDate).toBeInTheDocument()
  })
  it('renders the time the comment was made', () => {
    const commentTime = screen.getByText('11:00')
    expect(commentTime).toBeInTheDocument()
  })
})
