import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import Profile from './Profile'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

import userEvent from '@testing-library/user-event'
import { reset as resetUsers } from '../../store/usersSlice'
import { reset as resetMeetUps } from '../../store/meetupsSlice'

beforeEach(() => {
  renderWithRouter(
    <Provider store={store}>
      <Profile />
    </Provider>
  )
})

describe('Profile unit tests', () => {
  it('renders component (smoke test)', () => {})
})
