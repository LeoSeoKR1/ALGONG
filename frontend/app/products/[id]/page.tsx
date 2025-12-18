"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { API_BASE } from "@/app/lib/api";

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
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
  if (!idStr) return;

  fetch(`${API_BASE}/products/${idStr}`)
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
      if (data) setProduct(data);
    })
    .catch((e) => {
      setError(e?.message ?? "상품 조회 중 오류");
    });
}, [idStr]);


  if (notFound) {
  return <p className="p-6">상품이 없습니다.</p>;
  }

  if (error) {
    return <p className="p-6">오류: {error}</p>;
  }

  if (!product) {
    return <p className="p-6">로딩 중...</p>;
  }


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
