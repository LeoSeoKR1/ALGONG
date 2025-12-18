"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/${id}`, {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${res.status} ${text}`);
        }

        const data = (await res.json()) as Order;
        setOrder(data);
      } catch (e: any) {
        setError(e?.message ?? "주문 조회 중 오류");
      }
    };

    run();
  }, [id, router]);

  if (notFound) return <p className="p-6">주문을 찾을 수 없습니다.</p>;
  if (error) return <p className="p-6">오류: {error}</p>;
  if (!order) return <p className="p-6">주문 정보를 불러오는 중...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">주문 상세</h1>
      <p className="mt-2 text-gray-600">주문번호: {order.id}</p>

      <ul className="mt-6 space-y-2">
        {order.items?.map((it) => (
          <li key={`${it.productId}-${it.name}`} className="flex justify-between">
            <span>
              {it.name} × {it.quantity}
            </span>
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