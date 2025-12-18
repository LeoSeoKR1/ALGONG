"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE } from "@/app/lib/api";
import { useAuthGuard } from "@/app/lib/useAuthGuard";

type Order = {
  id: number;
  totalAmount: number;
};

export default function MyOrdersPage() {
  const { checking } = useAuthGuard();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (checking) return; // ✅ 로그인 체크 끝난 뒤에만 호출

    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/my`, {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${res.status} ${text}`);
        }

        const data = (await res.json()) as Order[];
        setOrders(data);
      } catch (e: any) {
        setError(e?.message ?? "조회 실패");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [checking]);

  if (checking) return <p className="p-6">확인 중...</p>;
  if (loading) return <p className="p-6">불러오는 중...</p>;
  if (error) return <p className="p-6">오류: {error}</p>;

  if (orders.length === 0) {
    return <p className="p-6">주문 내역이 없습니다.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <Link href={`/orders/${o.id}`} className="font-semibold hover:underline">
                주문 #{o.id}
              </Link>
              <span className="text-gray-700">{o.totalAmount.toLocaleString()}원</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}