import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithRouter, renderWithPath } from '../../testing-utils'
import MeetupDetail from './MeetupDetail'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Routes, Route } from 'react-router'
import { MemoryRouter } from 'react-router-dom'

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
})
