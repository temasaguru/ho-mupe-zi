import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

const UserInfoContent = ({ user }: { user: Session['user'] }) => {
  return (
    <div>
      <div>
        {user?.name} /{user?.email}
      </div>
      <SignOutButton />
    </div>
  );
};

const UserInfoSmall = () => {
  const session = useSession();
  switch (session.status) {
    case 'authenticated':
      return <UserInfoContent user={session.data.user} />;
    case 'loading':
      return <div>Loading...</div>;
    case 'unauthenticated':
      return <SignInButton />;
    default:
      return null;
  }
};

export default UserInfoSmall;
