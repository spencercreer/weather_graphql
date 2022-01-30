import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard title', () => {
  render(<App />);
  const title = screen.getByText(/Weather Dashboard/i);
  expect(title).toBeInTheDocument();
});
