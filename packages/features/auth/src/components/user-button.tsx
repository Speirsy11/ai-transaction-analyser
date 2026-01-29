"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: "h-10 w-10",
          userButtonPopoverCard: "shadow-xl",
          userButtonPopoverActionButton: "hover:bg-muted",
        },
      }}
      afterSignOutUrl="/"
    />
  );
}
