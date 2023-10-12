import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

const hankoApi = "https://d8db021b-5052-4b12-a0ed-a372e35a8c50.hanko.io";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("hanko")?.value;

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${hankoApi}/.well-known/jwks.json`)
  );

  try {
    const verifiedJWT = await jose.jwtVerify(token || "", JWKS);
    console.log(verifiedJWT);
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/todos"],
};
