import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { AuthError } from 'firebase/auth';

vi.mock('firebase/auth');
vi.mock('react-firebase-hooks/auth');

const mockedUseSignInWithEmailAndPassword = vi.mocked(
  useSignInWithEmailAndPassword
);

beforeEach(() => {
  mockedUseSignInWithEmailAndPassword.mockReturnValue([
    async (_e, _p) => undefined,
    undefined,
    false,
    undefined,
  ]);
});

describe('Authentication/Login', () => {
  it('should correctly type email and password', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailInput);
    await user.keyboard('sample@mail.com');
    await user.click(passwordInput);
    await user.keyboard('password123');

    expect(screen.getByDisplayValue(/^sample@mail.com$/));
    expect(screen.getByDisplayValue(/^password123$/));
  });

  it('should display error message if email and/or password are/is invalid', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button');

    await user.click(emailInput);
    await user.keyboard('sample@mail.com');
    await user.click(passwordInput);
    await user.keyboard('password123');
    await user.click(submitButton);
    mockedUseSignInWithEmailAndPassword.mockReturnValue([
      async (_e, _p) => undefined,
      undefined,
      false,
      { code: 'Auth/Invalid-Login-Credentials' } as AuthError,
    ]);
    rerender(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getAllByLabelText(/invalid-login-credentials/i));
  });

  it('should remove error message on type', async () => {
    const user = userEvent.setup();
    mockedUseSignInWithEmailAndPassword.mockReturnValue([
      async (_e, _p) => undefined,
      undefined,
      false,
      { code: 'Auth/Invalid-Login-Credentials' } as AuthError,
    ]);
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailInput);
    await user.keyboard('sample@mail.com');
    await user.click(passwordInput);
    await user.keyboard('password123');

    expect(
      screen.queryAllByLabelText(/invalid-login-credentials/i).length
    ).toBe(0);
  });
});
