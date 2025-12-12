"use client";

import { useParams } from "next/navigation";
import { useCartStore } from "../../store/cartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const raw = params?.id;

  const idStr = Array.isArray(raw) ? raw[0] : raw; // string | undefined
  const idNum = Number(idStr);

  const addItem = useCartStore((s) => s.addItem);

  if (!idStr || Number.isNaN(idNum)) {
    return (
      <main className="p-6">
        <p className="text-red-600">잘못된 상품 ID 입니다.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <p className="mt-2 text-gray-600">상품 ID: {idStr}</p>

      <button
        onClick={() =>
          addItem({
            id: idNum,
            name: `ALGONG Product #${idStr}`,
            price: 59000,
          })
        }
        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
      >
        장바구니 담기
      </button>
    </main>
  );
}
