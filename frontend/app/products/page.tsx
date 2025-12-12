type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "ALGONG Hoodie", price: 59000 },
  { id: 2, name: "ALGONG Cap", price: 29000 },
  { id: 3, name: "ALGONG Sticker Pack", price: 9000 },
];

export default function ProductsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Products</h1>
      <p className="mt-2 text-gray-600">더미 데이터로 목록 UI부터 만든다.</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.id} className="rounded-lg border p-4">
            <div className="font-semibold">{p.name}</div>
            <div className="mt-2 text-gray-700">{p.price.toLocaleString()}원</div>
            <button className="mt-4 w-full rounded-md bg-black py-2 text-white">
              장바구니 담기
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
