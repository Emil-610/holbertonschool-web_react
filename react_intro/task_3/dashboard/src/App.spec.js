// task_2/dashboard/src/App.spec.js
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('Sign-in form', () => {
  test('renders 2 input elements (email & password)', () => {
    render(<App />);
    const email = screen.getByLabelText(/email:?/i);
    const password = screen.getByLabelText(/password:?/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email.tagName).toBe('INPUT');
    expect(password.tagName).toBe('INPUT');

    // bonus: vérifie les types
    expect(email).toHaveAttribute('type', 'email');
    expect(password).toHaveAttribute('type', 'password');
  });

  test('renders 2 label elements with text "Email" and "Password"', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email:?/i);
    const pwdLabel = screen.getByText(/password:?/i);
    expect(emailLabel.tagName).toBe('LABEL');
    expect(pwdLabel.tagName).toBe('LABEL');
  });

  test('renders a button with the text "OK"', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /^ok$/i })).toBeInTheDocument();
  });
});
