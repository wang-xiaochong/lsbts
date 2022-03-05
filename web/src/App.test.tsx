import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
let categories = (window as any).categories
test('renders learn react link', () => {
  render(<App categories={categories}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
