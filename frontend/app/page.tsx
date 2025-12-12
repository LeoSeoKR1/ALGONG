import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">ALGONG</h1>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white"
      >
        상품 보러가기
      </Link>
    </main>
  );
}
