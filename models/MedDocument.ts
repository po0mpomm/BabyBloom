import mongoose, { Schema, Document, models } from "mongoose";

export interface IMedDocument extends Document {
  patientId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  documentName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  publicId: string;
  uploadDate: Date;
}

const MedDocumentSchema = new Schema<IMedDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    documentName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String },
    fileSize: { type: Number },
    publicId: { type: String },
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.MedDocument || mongoose.model<IMedDocument>("MedDocument", MedDocumentSchema);
