import { render, screen, fireEvent } from '@testing-library/react';
import NavbarComponent from './NavbarComponent';
import '@testing-library/jest-dom';

describe('NavbarComponent', () => {
  const onSearchMock = jest.fn();

  beforeEach(() => {
    render(<NavbarComponent onSearch={onSearchMock} />);
  });

  it('renders the search input field', () => {
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch prop when typing in the input field', () => {
    const searchQuery = 'apple';
    const searchInput = screen.getByPlaceholderText('Search');
    
    fireEvent.change(searchInput, { target: { value: searchQuery } });
    
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith(searchQuery);
  });

  it('displays the correct search query in the input field', () => {
    const searchQuery = 'apple';
    const searchInput = screen.getByPlaceholderText('Search');
    
    fireEvent.change(searchInput, { target: { value: searchQuery } });

    expect(searchInput).toHaveValue(searchQuery);
  });
});
