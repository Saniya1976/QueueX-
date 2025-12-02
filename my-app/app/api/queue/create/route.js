import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const queue = await prisma.queue.create({
      data: {
        title: body.title,
        desc: body.desc,
        createdBy: body.userId,
      },
    });

    return NextResponse.json(queue);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
