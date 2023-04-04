import { render, screen } from '@testing-library/react';
import ProfilePicture from '../ProfilePicture';
import IUser from '../../../../types/user/User';

describe('ProfilePicture', () => {
  it('should display the acronyms of the username if they did not set a profile picture', () => {
    render(
      <ProfilePicture
        user={
          {
            username: 'Testing user',
            pictureUrl: null,
          } as IUser
        }
      />
    );

    expect(screen.getByText('Tu')).toBeInTheDocument();
  });
});
