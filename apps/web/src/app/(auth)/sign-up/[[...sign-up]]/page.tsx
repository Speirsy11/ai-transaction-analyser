import { SignUp } from "@finance/auth";

export default function SignUpPage() {
  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
        }}
      />
    </div>
  );
}
