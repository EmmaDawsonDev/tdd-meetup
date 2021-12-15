import { render, screen } from '@testing-library/react'
import { renderWithRouter } from '../../testing-utils'
import Home from './Home'

describe('Home unit tests', () => {
  it('renders Home component correctly (smoketest)', () => {
    renderWithRouter(<Home />)
  })
})
