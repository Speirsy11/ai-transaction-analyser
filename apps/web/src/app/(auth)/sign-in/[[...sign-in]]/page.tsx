import { SignIn } from "@finance/auth";

export default function SignInPage() {
  return (
    <div className="bg-muted/30 flex min-h-screen items-center justify-center">
      <SignIn
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
