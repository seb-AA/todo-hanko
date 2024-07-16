import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { getUserId } from "../../utils/auth";

export async function POST(req: Request) {
  const userID = await getUserId();
  const { email, id } = await req.json();

  if (userID) {
    if (await prisma.user.findFirst({ where: { id } })) return;

    if (
      typeof email !== "string" ||
      email.length === 0 ||
      typeof id !== "string" ||
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
