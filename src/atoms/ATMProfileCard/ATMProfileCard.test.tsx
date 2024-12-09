import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ATMProfileCard from './ATMProfileCard';

describe('ATMProfileCard Component', () => {
  test('renders the profile image', () => {
    render(<ATMProfileCard />);
    const imgElement = screen.getByAltText(/user-image/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/profile.webp');
  });

  test('renders the greeting text', () => {
    render(<ATMProfileCard />);
    const greetingElement = screen.getByText(/Hi, Reader,/i);
    expect(greetingElement).toBeInTheDocument();
  });

  test('renders the news text', () => {
    render(<ATMProfileCard />);
    const newsElement = screen.getByText(/Here's your News!/i);
    expect(newsElement).toBeInTheDocument();
  });
});
