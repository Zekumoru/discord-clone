import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsernameInput from '../UsernameInput';
import { useState } from 'react';

describe('AddFriendScreenModal/UsernameInput', () => {
  it('should show the placeholder', () => {
    render(
      <UsernameInput
        username=""
        placeholder="Username#0000"
        onChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText(/^username#0000$/i)).toBeInTheDocument();
  });

  it('should show the placeholder tag after username', async () => {
    const user = userEvent.setup();
    const WrapperComponent = () => {
      const [username, setUsername] = useState('');
      return (
        <UsernameInput
          username={username}
          placeholder="Username#0000"
          onChange={setUsername}
        />
      );
    };
    render(<WrapperComponent />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('Foo#1');

    expect(screen.getByText(/^foo#1$/i)).toBeInTheDocument();
    expect(screen.getByText(/^000$/)).toBeInTheDocument();
  });

  it('should still correctly show placeholder tag if keyboard typed within it', async () => {
    const user = userEvent.setup();
    const WrapperComponent = () => {
      const [username, setUsername] = useState('');
      return (
        <UsernameInput
          username={username}
          placeholder="Username#0000"
          onChange={setUsername}
        />
      );
    };
    render(<WrapperComponent />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('Foo#1234{ArrowLeft>2/}Yikes');
    // Move 2 chars left and try to type 'Yikes' assuming 'Foo#12Yikes34'
    await user.keyboard('{ArrowLeft>2/}Yikes');

    expect(screen.getByText(/^foo#1234$/i)).toBeInTheDocument();
  });

  it('should stop any further input above 32 characters', async () => {
    const user = userEvent.setup();
    const WrapperComponent = () => {
      const [username, setUsername] = useState('');
      return (
        <UsernameInput
          username={username}
          placeholder="Username#0000"
          onChange={setUsername}
        />
      );
    };
    render(<WrapperComponent />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('123456789_123456789_123456789_12!StopHere');

    expect((screen.getByRole('textbox') as HTMLInputElement).value.length).toBe(
      32
    );
  });

  it('should still be able to type the tag if input has already reached 32 characters', async () => {
    const user = userEvent.setup();
    const WrapperComponent = () => {
      const [username, setUsername] = useState('');
      return (
        <UsernameInput
          username={username}
          placeholder="Username#0000"
          onChange={setUsername}
        />
      );
    };
    render(<WrapperComponent />);

    await user.click(screen.getByRole('textbox'));
    await user.keyboard('123456789_123456789_123456789_12!StopHere');
    await user.keyboard('123456789_123456789_123456789_12#9999');

    expect(screen.getByText(/#9999$/)).toBeInTheDocument();
  });
});
