import Home from '@pages/index';
import { render, screen } from '@testing-library/react';
import React from 'react';

it('should render home page', () => {
  render(<Home />);

  const heading = screen.getByText(/Hello World/i);
  expect(heading).toBeInTheDocument();
});
