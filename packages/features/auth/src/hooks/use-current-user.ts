"use client";

import { useUser } from "@clerk/nextjs";

export function useCurrentUser() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
        }
      : null,
    isLoaded,
    isSignedIn,
  };
}
