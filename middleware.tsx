import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("hanko")?.value;

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/.well-known/jwks.json`)
  );

  try {
    /** only allow access to sign-in page */
    if (
      !req.nextUrl.pathname.startsWith(
        `${process.env.NEXT_PUBLIC_HANKO_SIGN_IN_URL}`
      )
    ) {
      const verifiedJWT = await jose.jwtVerify(token || "", JWKS);
      console.log(verifiedJWT);
    }
  } catch {
    /** redirect to sign-in page upon unauthenticated access on guarded routes */
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_HANKO_SIGN_IN_URL}`, req.url)
    );
  }
}

export const config = {
  /** guarded routes */
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
