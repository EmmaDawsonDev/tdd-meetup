import { render, screen } from '@testing-library/react'
import Header from './Header'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { renderWithRouter } from '../../testing-utils'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <Header />
    </Provider>
  )
})

describe('Header', () => {
  it('renders Header component correctly (smoketest)', () => {})
  it('WitrenderWithRouters text MeetApp in the header', () => {
    const title = screen.getByText(/meetapp/i)

    expect(title).toBeInTheDocument()
  })
  it('renders a login button when a user is not logged in', () => {
    const loginBtn = screen.getByRole('button', { name: /login/i })
    expect(loginBtn).toBeInTheDocument()
  })
})
