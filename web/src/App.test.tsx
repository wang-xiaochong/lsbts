import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './views/Home';
import { AppData } from 'models/app';
// let categories = (window as any).categories
// let appData:AppData
test('renders learn react link', () => {
  // render(<App categories={categories}/>);
  // render(<App appData={appData}/>);
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
