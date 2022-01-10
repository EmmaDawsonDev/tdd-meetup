import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
// import { store } from './store/store'
import { makeStore } from './store/store'
import { Provider } from 'react-redux'

const store = makeStore()

const renderWithRouter = (ui: ReactElement, options?: any) => render(ui, { wrapper: MemoryRouter, ...options })

const renderWithPath = (entry: string, ui: ReactElement, path: string) =>

  render(
    <MemoryRouter initialEntries={[entry]}>
      <Provider store={store}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </Provider>
    </MemoryRouter>
  )
export { renderWithRouter, renderWithPath }
