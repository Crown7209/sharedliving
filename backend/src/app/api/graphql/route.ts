import { NextRequest, NextResponse } from "next/server";

import { handler } from "../../../handler";
import cors from "../../../utils/cors";

export const dynamic = "force-dynamic";

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return cors(request, new NextResponse(null, { status: 204 }));
}

// Handle GET requests
export async function GET(request: NextRequest) {
  const response = await handler(request);
  const nextResponse =
    response instanceof NextResponse
      ? response
      : new NextResponse(await response.text(), {
          status: response.status,
          headers: response.headers,
        });
  return cors(request, nextResponse);
}

// Handle POST requests
export async function POST(request: NextRequest) {
  const response = await handler(request);
  const nextResponse =
    response instanceof NextResponse
      ? response
      : new NextResponse(await response.text(), {
          status: response.status,
          headers: response.headers,
        });
  return cors(request, nextResponse);
}
