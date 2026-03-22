import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  await connectDB();

  const existing = await Patient.findOne({ userId: session.user.id });
  if (existing) return NextResponse.json({ error: "Profile already exists" }, { status: 409 });

  const patient = await Patient.create({ ...data, userId: session.user.id });
  return NextResponse.json({ patient }, { status: 201 });
}
