import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <SignIn />
    </div>
  );
}

export default SignInPage;
