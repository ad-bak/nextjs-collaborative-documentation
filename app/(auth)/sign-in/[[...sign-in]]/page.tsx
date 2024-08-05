import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="auth-page max-w-sm max-h-min">
      <SignIn />
    </main>
  );
};

export default SignInPage;
