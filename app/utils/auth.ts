import * as jose from "jose";
import { cookies } from "next/headers";

export async function getUserId() {
  const token = cookies().get("hanko")?.value;
  if (!token) throw new Error("Token not found");
  const payload = jose.decodeJwt(token);
  return payload.sub as string;
}
