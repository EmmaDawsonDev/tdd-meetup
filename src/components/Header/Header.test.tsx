import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders Header component correctly (smoketest)', () => {
    render(<Header />)
  })
  it('renders text MeetApp in the header', () => {
    render(<Header />)

    const title = screen.getByText(/meetapp/i)

    expect(title).toBeInTheDocument()
  })
})
