import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { AuthError } from 'firebase/auth';

vi.mock('firebase/auth');
vi.mock('react-firebase-hooks/auth');

const mockedUseCreateUserWithEmailAndPassword = vi.mocked(
  useCreateUserWithEmailAndPassword
);

beforeEach(() => {
  mockedUseCreateUserWithEmailAndPassword.mockReturnValue([
    async (_e, _p) => undefined,
    undefined,
    false,
    undefined,
  ]);
});

describe('Authentication/SignUp', () => {
  it('should correctly type email, username, and password', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.click(emailInput);
    await user.keyboard('sample@mail.com');
    await user.click(usernameInput);
    await user.keyboard('Foo');
    await user.click(passwordInput);
    await user.keyboard('password123');

    expect(screen.getByDisplayValue(/^sample@mail.com$/));
    expect(screen.getByDisplayValue(/^foo$/i));
    expect(screen.getByDisplayValue(/^password123$/));
  });

  it('should display an error message if email is already taken', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button');

    await user.click(emailInput);
    await user.keyboard('sample@mail.com');
    await user.click(usernameInput);
    await user.keyboard('Foo');
    await user.click(passwordInput);
    await user.keyboard('password123');
    await user.click(submitButton);
    mockedUseCreateUserWithEmailAndPassword.mockReturnValue([
      async (_e, _p) => undefined,
      undefined,
      false,
      { code: 'Auth/Email-Already-In-Use' } as AuthError,
    ]);
    rerender(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email-already-in-use/i));
  });
});
