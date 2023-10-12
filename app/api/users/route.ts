import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/db";

export async function POST(req: Request) {
  const userID = await userId();
  const { email, id } = await req.json();

  if (userID) {
    if (await prisma.user.findFirst({ where: { id } })) return;

    if (
      typeof email !== "string" &&
      email.length === 0 &&
      typeof id !== "string" &&
      id.length !== 36
    ) {
      throw new Error("No valid values for email and id");
    }
    await prisma.user.create({
      data: { id, email },
    });

    return NextResponse.json(
      { message: "New user registered" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}

export async function userId() {
  const token = cookies().get("hanko")?.value;
  const payload = jose.decodeJwt(token ?? "");

  return payload.sub;
}
