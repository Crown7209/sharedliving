import { NextRequest, NextResponse } from "next/server";

// Allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  // Add your production frontend URL here
  process.env.FRONTEND_URL || "",
  process.env.ADMIN_URL || "",
].filter(Boolean);

export default function cors(
  req: NextRequest,
  res: NextResponse
): NextResponse {
  const origin = req.headers.get("origin") || "";

  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (isAllowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
  }

  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.headers.set("Access-Control-Max-Age", "86400");

  return res;
}
