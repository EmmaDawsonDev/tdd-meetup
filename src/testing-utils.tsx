import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'

const renderWithRouter = (ui: ReactElement, options?: any) => render(ui, { wrapper: MemoryRouter, ...options })

const renderWithPath = (entry: string, ui: ReactElement, path: string) =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  )
export { renderWithRouter, renderWithPath }
