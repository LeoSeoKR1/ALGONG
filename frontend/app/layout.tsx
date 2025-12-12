import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ALGONG",
  description: "ALGONG Shopping Mall",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="text-lg font-bold">
              ALGONG
            </Link>

            <nav className="flex gap-4 text-sm">
              <Link href="/products" className="text-gray-700 hover:underline">
                Products
              </Link>
              <Link href="/cart" className="text-gray-700 hover:underline">
                Cart
              </Link>
              <Link href="/checkout" className="text-gray-700 hover:underline">
                Checkout
              </Link>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-5xl p-4">{children}</div>
      </body>
    </html>
  );
}
