"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/app/lib/api";

type MeResponse = {
  loggedIn: boolean;
  email: string | null;
};

export function useAuthGuard() {
  const router = useRouter();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });
        const data = (await res.json()) as MeResponse;

        if (!data.loggedIn) {
          router.push("/login");
          return;
        }

        setMe(data);
      } catch {
        router.push("/login");
      } finally {
        setChecking(false);
      }
    };

    run();
  }, [router]);

  return { me, checking };
}