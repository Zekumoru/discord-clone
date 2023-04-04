import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScreenModalToolbar from '../ScreenModalToolbar';

describe('ScreenModalToolbar', () => {
  it('should show left element', () => {
    const LeftComponent = () => <div>Left</div>;
    render(<ScreenModalToolbar leftElement={<LeftComponent />} />);

    expect(screen.getByText(/left/i)).toBeInTheDocument();
  });

  it('should show right element', () => {
    const RightComponent = () => <div>Right</div>;
    render(<ScreenModalToolbar rightElement={<RightComponent />} />);

    expect(screen.getByText(/right/i)).toBeInTheDocument();
  });

  it('should show center element', () => {
    render(<ScreenModalToolbar>Center</ScreenModalToolbar>);

    expect(screen.getByText(/center/i)).toBeInTheDocument();
  });
});
