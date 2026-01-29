"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import type { ReactNode } from "react";

interface SignInButtonProps {
  children?: ReactNode;
  mode?: "modal" | "redirect";
  redirectUrl?: string;
}

export function SignInButton({
  children,
  mode = "modal",
  redirectUrl = "/dashboard",
}: SignInButtonProps) {
  return (
    <ClerkSignInButton mode={mode} forceRedirectUrl={redirectUrl}>
      {children}
    </ClerkSignInButton>
  );
}
