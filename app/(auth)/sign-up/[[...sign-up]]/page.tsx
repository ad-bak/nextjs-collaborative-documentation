import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="auth-page max-w-sm max-h-min">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
