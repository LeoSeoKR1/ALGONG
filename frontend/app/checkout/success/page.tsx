"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE } from "@/app/lib/api";

type Order = {
  id: number;
  email: string;
  address: string;
  totalAmount: number;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function CheckoutSuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!orderId) return;

  const url = `${API_BASE}/orders/${orderId}`;

  fetch(url, { credentials: "include" })
    .then(async (res) => {
      if (res.status === 404) {
        setNotFound(true);
        return null;
      }
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${text}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data) setOrder(data);
    })
    .catch((e) => {
      setError(e?.message ?? "주문 조회 중 오류");
    });
}, [orderId]);

  // 렌더링 분기
  if (notFound) return <p className="p-6">주문을 찾을 수 없습니다.</p>;
  if (error) return <p className="p-6">오류: {error}</p>;
  if (!order) return <p className="p-6">주문 정보를 불러오는 중...</p>;

  // 정상 렌더링
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">주문 완료 🎉</h1>
      <p className="mt-2 text-gray-600">주문번호: {order.id}</p>

      <ul className="mt-6 space-y-2">
        {order.items?.map((it) => (
            <li key={`${it.productId}-${it.name}`} className="flex justify-between">
                <span>{it.name} × {it.quantity}</span>
                <span>{(it.price * it.quantity).toLocaleString()}원</span>
            </li>
        ))}
      </ul>

      <div className="mt-4 font-semibold">
        총 결제금액: {order.totalAmount.toLocaleString()}원
      </div>
    </main>
  );
}
