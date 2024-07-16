import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { getUserId } from "../../../utils/auth";

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const userID = await getUserId();
  const { completed } = await req.json();

  if (userID) {
    await prisma.todo.update({
      where: { id },
      data: { complete: completed },
    });
    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const userID = await getUserId();

  if (userID) {
    await prisma.todo.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Deleted Item" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
}
