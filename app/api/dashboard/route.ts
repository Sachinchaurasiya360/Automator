import { prisma } from "@/lib/prisma";
import { createProject } from "@/lib/types/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const projects = await prisma.project.findMany({
      where: { userId: Number(session.user.id) },
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    console.log(body);
    const result = createProject.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    console.log("This is ", result);
    const project = await prisma.project.create({
      data: {
        ...result.data,
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
