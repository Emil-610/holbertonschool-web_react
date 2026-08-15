import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

test('testing signin form elements', () => {
  render(<Login />);

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElements = screen.getAllByRole('button', { name: /OK/i });
  const inputElements = screen.getAllByLabelText(/email|password/i);

  expect(inputElements).toHaveLength(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElements.length).toBeGreaterThanOrEqual(1);
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  render(<Login />);

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getAllByText('Email')[0];

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('it should check that the password input element will be focused whenver the associated label is clicked', async () => {
  render(<Login />);

  const passwordLabel = screen.getAllByText('Password')[0];
  const passwordInput = screen.getByLabelText('Password');

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit input should be disabled by default', () => {
  render(<Login />);

  const submitInput = screen.getByRole('button', { name: /OK/i });
  expect(submitInput).toBeDisabled();
});

test('submit input becomes enabled only when email and password are valid', async () => {
  render(<Login />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitInput = screen.getByRole('button', { name: /OK/i });

  await userEvent.type(emailInput, 'invalid-email');
  await userEvent.type(passwordInput, '12345');
  expect(submitInput).toBeDisabled();

  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, 'user@example.com');
  expect(submitInput).toBeDisabled();

  await userEvent.clear(passwordInput);
  await userEvent.type(passwordInput, 'longpass8');

  await waitFor(() => {
    expect(submitInput).toBeEnabled();
  });
});

test('calls logIn prop with email and password when form submitted', async () => {
  const logInMock = jest.fn();
  render(<Login logIn={logInMock} />);

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitInput = screen.getByRole('button', { name: /OK/i });

  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'longpass8');

  fireEvent.click(submitInput);

  expect(logInMock).toHaveBeenCalledTimes(1);
  expect(logInMock).toHaveBeenCalledWith('user@example.com', 'longpass8');
});
