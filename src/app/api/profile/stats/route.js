import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    verifyToken(request);

    return NextResponse.json({
      totalTrades: 120,
      profit: 5400,
      winRate: "68%"
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
