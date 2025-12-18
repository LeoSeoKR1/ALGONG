"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/app/lib/api";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  const placeOrder = async () => {
    if (items.length === 0) {
      setResult("장바구니가 비어 있습니다.");
      return;
    }
    if (!email || !address) {
      setResult("이메일과 주소를 입력해 주세요.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          buyer: { email, address },
          items: items.map((it) => ({
            productId: it.id,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`주문 실패: ${res.status} ${text}`);
      }

  const orderId = await res.json(); // ✅ 여기서 숫자 받아오기

  clear(); // 주문 성공 후 장바구니 비우기
  router.push(`/checkout/success?orderId=${orderId}`);

} catch (e: any) {
  setResult(`주문 중 오류: ${e?.message ?? String(e)}`);
} finally {
  setLoading(false);
}


  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="font-semibold">주문 요약</h2>

        {items.length === 0 ? (
          <p className="mt-3 text-gray-600">장바구니가 비어 있습니다.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {items.map((it) => (
              <li key={`${it.id}-${it.name}`} className="flex justify-between">
                <span>
                  {it.name} × {it.quantity}
                </span>
                <span>{(it.price * it.quantity).toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between border-t pt-4 font-semibold">
          <span>Total</span>
          <span>{total.toLocaleString()}원</span>
        </div>
      </section>

      <section className="mt-6 rounded-lg border p-4">
        <h2 className="font-semibold">배송 정보</h2>

        <label className="mt-4 block text-sm text-gray-700">Email</label>
        <input
          className="mt-1 w-full rounded-md border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className="mt-4 block text-sm text-gray-700">Address</label>
        <input
          className="mt-1 w-full rounded-md border p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="서울시 ..."
        />

        <button
          onClick={placeOrder}
          disabled={loading}
          className="mt-6 w-full rounded-md bg-black py-2 text-white disabled:opacity-50"
        >
          {loading ? "주문 처리 중..." : "주문하기"}
        </button>

        {result && <p className="mt-4 text-sm">{result}</p>}
      </section>
    </main>
  );
}
