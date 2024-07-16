import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

if (!hankoApi) {
  throw new Error("HANKO_API_URL is not defined");
}

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("hanko")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

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
