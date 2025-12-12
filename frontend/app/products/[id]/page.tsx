"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductDetailPage() {
  const params = useParams();
  const raw = params?.id;
  const idStr = Array.isArray(raw) ? raw[0] : raw;

  const [product, setProduct] = useState<Product | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!idStr) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${idStr}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [idStr]);

  if (!product) return <p className="p-6">로딩 중...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.price.toLocaleString()}원</p>

      <button
        onClick={() =>
          addItem({ id: product.id, name: product.name, price: product.price })
        }
        className="mt-6 rounded-md bg-black px-4 py-2 text-white"
      >
        장바구니 담기
      </button>
    </main>
  );
}
