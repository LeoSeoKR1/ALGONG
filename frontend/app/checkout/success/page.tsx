"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId");

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">주문 완료 🎉</h1>
      <p className="mt-2 text-gray-600">주문번호: {orderId}</p>

      <div className="mt-6 flex gap-4">
        <Link href="/products" className="rounded-md bg-black px-4 py-2 text-white">
          상품 더 보기
        </Link>
        <Link href="/cart" className="rounded-md border px-4 py-2">
          장바구니 보기
        </Link>
      </div>
    </main>
  );
}
