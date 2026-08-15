import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import newContext from '../Context/context';

test('should contain a <h1/> and an <img/>', () => {
  const { container } = render(<Header />);
  const headingElement = screen.getByRole('heading', {
    name: /school Dashboard/i,
  });
  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
  expect(container.querySelector('#logoutSection')).toBeNull();
});

test('logoutSection is rendered when context user is logged in', () => {
  const contextValue = {
    user: {
      email: 'user@example.com',
      password: 'password',
      isLoggedIn: true,
    },
    logOut: () => {},
  };

  const { container } = render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  const logoutSection = container.querySelector('#logoutSection');
  expect(logoutSection).toBeInTheDocument();
  expect(logoutSection).toHaveTextContent(/Welcome user@example.com/i);
  const logoutLink = screen.getByText(/logout/i);
  expect(logoutLink).toBeInTheDocument();
});

test('clicking logout link calls logOut from context', () => {
  const logOutMock = jest.fn();
  const contextValue = {
    user: {
      email: 'user@example.com',
      password: 'password',
      isLoggedIn: true,
    },
    logOut: logOutMock,
  };

  render(
    <newContext.Provider value={contextValue}>
      <Header />
    </newContext.Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);
  expect(logOutMock).toHaveBeenCalledTimes(1);
});
