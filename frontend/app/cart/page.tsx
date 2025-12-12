"use client";

import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  if (items.length === 0) {
    return <p className="p-6">장바구니가 비어 있습니다.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Cart</h1>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-600">
                {item.price.toLocaleString()}원 × {item.quantity}
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-sm text-red-600"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
