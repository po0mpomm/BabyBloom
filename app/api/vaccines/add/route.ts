import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Vaccination from "@/models/Vaccination";
import Patient from "@/models/Patient";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  await connectDB();

  const patient = await Patient.findOne({ userId: session.user.id });
  if (!patient) return NextResponse.json({ error: "No patient profile" }, { status: 404 });

  const vaccine = await Vaccination.create({
    ...data,
    patientId: patient._id,
    userId: session.user.id,
  });
  return NextResponse.json({ vaccine }, { status: 201 });
}
