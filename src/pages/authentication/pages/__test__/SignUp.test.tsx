import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';

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
    await user.click(emailInput);
    await user.keyboard('Foo');
    await user.click(passwordInput);
    await user.keyboard('password123');

    expect(screen.getByDisplayValue(/sample@mail.com/));
    expect(screen.getByDisplayValue(/foo/i));
    expect(screen.getByDisplayValue(/password123/));
  });
});
