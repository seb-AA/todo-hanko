import { NextResponse } from "next/server";
import { prisma } from "@/db";
import * as jose from "jose";
import { cookies } from "next/headers";

async function getUserId() {
  const token = cookies().get("hanko")?.value;
  if (!token) throw new Error("Token not found");
  const payload = jose.decodeJwt(token);
  return payload.sub as string;
}

export async function POST(req: Request) {
  const userID = await getUserId();
  const { title } = await req.json();

  if (userID) {
    if (typeof title !== "string" || title.length === 0) {
      throw new Error("That can't be a title");
    }
    await prisma.todo.create({
      data: { title, complete: false, userId: userID },
    });

    return NextResponse.json({ message: "Created Todo" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
