"use client";

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import type { ReactNode } from "react";

interface SignUpButtonProps {
  children?: ReactNode;
  mode?: "modal" | "redirect";
  redirectUrl?: string;
}

export function SignUpButton({
  children,
  mode = "modal",
  redirectUrl = "/dashboard",
}: SignUpButtonProps) {
  return (
    <ClerkSignUpButton mode={mode} forceRedirectUrl={redirectUrl}>
      {children}
    </ClerkSignUpButton>
  );
}
