"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { API_BASE } from "@/app/lib/api";

type MeResponse = {
  loggedIn: boolean;
  email: string | null;
};

export default function Header() {
  const router = useRouter();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname()  ;

  const loadMe = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });
      const data = (await res.json()) as MeResponse;
      setMe(data);
    } catch {
      setMe({ loggedIn: false, email: null });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logout = async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setMe({ loggedIn: false, email: null });
    router.push("/login");
  };

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          ALGONG
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="text-gray-700 hover:underline">
            Products
          </Link>
          <Link href="/cart" className="text-gray-700 hover:underline">
            Cart
          </Link>
          <Link href="/checkout" className="text-gray-700 hover:underline">
            Checkout
          </Link>
          {!loading && me?.loggedIn && (
          <Link href="/orders" className="text-gray-700 hover:underline">
            My Orders
          </Link>
          )}
          {!loading && me?.loggedIn && (
          <Link href="/orders" className="text-gray-700 hover:underline">
            My Orders
          </Link>
          )}
          <div className="ml-2 flex items-center gap-3">
            {!loading && me?.loggedIn && (
              <span className="text-gray-500">{me.email}</span>
            )}

            {loading ? null : me?.loggedIn ? (
              <button onClick={logout} className="text-red-600 hover:underline">
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}