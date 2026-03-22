import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Patient from "@/models/Patient";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const patient = await Patient.findOne({ userId: session.user.id });
  if (!patient) return NextResponse.json({ payments: [] });

  const payments = await Payment.find({ patientId: patient._id }).sort({ paymentDate: -1 });
  return NextResponse.json({ payments });
}
