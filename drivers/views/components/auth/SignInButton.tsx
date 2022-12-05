import { signIn } from 'next-auth/react';

/**
 * ミドルウェアが非認証ユーザをはねるから、結局NextAuthのログイン画面に飛ぶ
 * これが表示されることはないが、一応作っておく
 */
const SignInButton = () => {
  return (
    <div>
      <button onClick={() => signIn()}>サインイン</button>
    </div>
  );
};

export default SignInButton;
