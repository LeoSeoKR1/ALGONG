"use client";

import { useState } from "react";
import { API_BASE } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@algong.com");
  const [password, setPassword] = useState("1234");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ 세션 쿠키 받기/보내기
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${text}`);
      }

      router.push("/products");
      router.refresh;
    } catch (e: any) {
      setMsg(e?.message ?? "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="mt-6 space-y-3">
        <input
          className="w-full border rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="w-full border rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />

        <button
          onClick={onLogin}
          disabled={loading}
          className="w-full rounded-md bg-black text-white p-2 disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        {msg && <p className="text-red-600">{msg}</p>}
      </div>
    </main>
  );
}