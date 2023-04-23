import { render, screen } from '@testing-library/react';
import ModalToolbar from '../ModalToolbar';

describe('ScreenModalToolbar', () => {
  it('should show left element', () => {
    const LeftComponent = () => <div>Left</div>;
    render(<ModalToolbar leftElement={<LeftComponent />} />);

    expect(screen.getByText(/left/i)).toBeInTheDocument();
  });

  it('should show right element', () => {
    const RightComponent = () => <div>Right</div>;
    render(<ModalToolbar rightElement={<RightComponent />} />);

    expect(screen.getByText(/right/i)).toBeInTheDocument();
  });

  it('should show center element', () => {
    render(<ModalToolbar>Center</ModalToolbar>);

    expect(screen.getByText(/center/i)).toBeInTheDocument();
  });
});
