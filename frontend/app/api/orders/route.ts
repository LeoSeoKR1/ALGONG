import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // 여기서는 "주문이 들어왔다"만 확인하는 임시 API
  return NextResponse.json({
    ok: true,
    orderId: Math.floor(Math.random() * 1_000_000),
    received: body,
  });
}
