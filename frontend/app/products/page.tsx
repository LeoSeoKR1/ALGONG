"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE } from "@/app/lib/api";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">로딩 중...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id} className="rounded-lg border p-4">
            <Link href={`/products/${p.id}`} className="font-semibold hover:underline">
              {p.name}
            </Link>
            <div className="mt-2 text-gray-700">{p.price.toLocaleString()}원</div>
          </li>
        ))}
      </ul>
    </main>
  );
}