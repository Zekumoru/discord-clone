import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

vi.mock('firebase/auth');

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

    expect(screen.getByDisplayValue(/sample@mail.com/));
    expect(screen.getByDisplayValue(/password123/));
  });
});
