import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScreenModalProvider, { useScreenModal } from '../ScreenModalContext';

describe('ScreenModalContext', () => {
  it('should show the custom modal when opened', async () => {
    const user = userEvent.setup();
    const CustomModal = () => {
      return <div>Modal</div>;
    };
    const Component = () => {
      const [open] = useScreenModal();
      return <button onClick={() => open(<CustomModal />)}></button>;
    };
    render(
      <ScreenModalProvider>
        <Component />
      </ScreenModalProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/modal/i)).toBeInTheDocument();
  });

  it('should close the custom modal', async () => {
    const user = userEvent.setup();
    const CustomModal = ({ close }: { close(): void }) => {
      return (
        <>
          <div>Modal</div>
          <button onClick={close}>Close</button>
        </>
      );
    };
    const Component = () => {
      const [open, close] = useScreenModal();
      return (
        <button onClick={() => open(<CustomModal close={close} />)}>
          Open
        </button>
      );
    };
    render(
      <ScreenModalProvider>
        <Component />
      </ScreenModalProvider>
    );

    await user.click(screen.getByText(/open/i));
    await user.click(screen.getByText(/close/i));

    expect(screen.queryByText(/modal/i)).not.toBeInTheDocument();
  });
});
