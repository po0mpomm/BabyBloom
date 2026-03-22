import mongoose, { Schema, Document, models } from "mongoose";

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  childName: string;
  age: number;
  gender: string;
  dob: Date;
  weight: number;
  height: number;
  bloodType: string;
  healthIssue: string;
  guardianName: string;
  phoneNumber: string;
  physicianName: string;
  physicianPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    childName: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    dob: { type: Date },
    weight: { type: Number },
    height: { type: Number },
    bloodType: { type: String },
    healthIssue: { type: String },
    guardianName: { type: String },
    phoneNumber: { type: String },
    physicianName: { type: String },
    physicianPhone: { type: String },
  },
  { timestamps: true }
);

export default models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);
