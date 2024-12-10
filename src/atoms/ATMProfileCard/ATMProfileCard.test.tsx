import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ATMProfileCard from './ATMProfileCard';

describe('ATMProfileCard Component', () => {
  test('renders the profile image', () => {
    const { getByAltText } = render(<ATMProfileCard />);
    const imgElement = getByAltText(/user-image/i);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/profile.webp');
  });

  test('renders the greeting text', () => {
    const { getByText } = render(<ATMProfileCard />);
    const greetingElement = getByText(/Hi, Reader,/i);
    expect(greetingElement).toBeInTheDocument();
  });

  test('renders the news text', () => {
    const { getByText } = render(<ATMProfileCard />);
    const newsElement = getByText(/Here's your News!/i);
    expect(newsElement).toBeInTheDocument();
  });
});
