import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import MedDocument from "@/models/MedDocument";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectDB();
  const doc = await MedDocument.findOne({ _id: id, userId: session.user.id });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (doc.publicId) {
    await cloudinary.uploader.destroy(doc.publicId);
  }

  await MedDocument.deleteOne({ _id: id });
  return NextResponse.json({ message: "Deleted" });
}
