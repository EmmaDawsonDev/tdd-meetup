import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from './testing-utils'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'

test('renders App component (smoke test)', () => {
  renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  )
})
