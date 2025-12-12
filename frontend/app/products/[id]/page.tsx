type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const id = params.id;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <p className="mt-2 text-gray-600">상품 ID: {id}</p>

      <div className="mt-6 rounded-lg border p-4">
        <div className="font-semibold">ALGONG Product #{id}</div>
        <div className="mt-2 text-gray-700">가격: (나중에 API로 표시)</div>
        <button className="mt-4 rounded-md bg-black px-4 py-2 text-white">
          장바구니 담기
        </button>
      </div>
    </main>
  );
}
