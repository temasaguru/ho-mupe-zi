import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <div>
      <button onClick={() => signOut()}>サインアウト</button>
    </div>
  );
};

export default SignOutButton;
