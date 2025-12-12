"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  useEffect(() => {
    if (!orderId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${orderId}`)
        .then(async (res) => {
            if (!res.ok) throw new Error("조회 실패");
            return res.json();
        })
        .then(setOrder)
        .catch(() => setOrder(null));
  }, [orderId]);

  if (!order) {
    return <p className="p-6">주문 정보를 불러오는 중...</p>;
  }

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
