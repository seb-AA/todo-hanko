import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

const hankoApi = "https://901671a5-333e-4022-84d9-6ba3a4e1d8ea.hanko.io";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("hanko")?.value;

  const JWKS = jose.createRemoteJWKSet(new URL(`${hankoApi}/.well-known/jwks.json`));

  try {
    const verifiedJWT = await jose.jwtVerify(token, JWKS);
    console.log(verifiedJWT);
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/todo"],
};
