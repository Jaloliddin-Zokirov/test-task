"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/utils/token";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const accessToken = tokenStorage.getAccess();

    if (!accessToken) {
      router.replace("/login");
    } else {
      setIsAuthed(true);
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return null;
  }

  return isAuthed ? <>{children}</> : null;
}