import "./globals.css";
import Header from "./components/Header";

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
        <Header />
        <div className="mx-auto max-w-5xl p-4">{children}</div>
      </body>
    </html>
  );
}