import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <SignUp />
    </div>
  );
}

export default SignUpPage;
