import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Patient from "@/models/Patient";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const patient = await Patient.findOne({ userId: session.user.id });
  return NextResponse.json({ patient });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  await connectDB();

  const patient = await Patient.findOneAndUpdate(
    { userId: session.user.id },
    { ...data },
    { new: true }
  );
  return NextResponse.json({ patient });
}
