import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MedDocument from "@/models/MedDocument";
import Patient from "@/models/Patient";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const patient = await Patient.findOne({ userId: session.user.id });
  if (!patient) return NextResponse.json({ error: "No patient profile" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "babybloom", resource_type: "auto" },
      (err, res) => {
        if (err) reject(err);
        else resolve(res as { secure_url: string; public_id: string });
      }
    ).end(buffer);
  });

  const doc = await MedDocument.create({
    patientId: patient._id,
    userId: session.user.id,
    documentName: file.name,
    fileUrl: result.secure_url,
    fileType: file.type,
    fileSize: file.size,
    publicId: result.public_id,
    uploadDate: new Date(),
  });

  return NextResponse.json({ document: doc }, { status: 201 });
}
