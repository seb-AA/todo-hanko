import * as jose from "jose";
import { cookies } from "next/headers";

export async function getUserId() {
  const token = cookies().get("hanko")?.value;
  if (!token) throw new Error("Token not found");
  const payload = jose.decodeJwt(token ?? "");
  if (!payload.sub) throw new Error("User ID not found in token");
  return payload.sub as string;
}
