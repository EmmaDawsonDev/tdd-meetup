import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderWithRouter } from './testing-utils'
import App from './App'

test('renders App component (smoke test)', () => {
  renderWithRouter(<App />)
})
