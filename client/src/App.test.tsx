import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// for the sake of ttime, i opted out of test driven development for
// this sample but ill be ehappy to expand on tests using
// jest if the opportunity is given to me.

test('will test the render of some dom text in the future', () => {
  render(<App />);
  const linkElement = screen.getByText(/lashauna created this/i);
  expect(linkElement).toBeInTheDocument();
});
