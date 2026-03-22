import mongoose, { Schema, Document, models } from "mongoose";

export interface IVaccination extends Document {
  patientId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  vaccineName: string;
  dueDate: Date;
  status: "Completed" | "Pending";
  dateTaken?: Date;
  createdAt: Date;
}

const VaccinationSchema = new Schema<IVaccination>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vaccineName: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["Completed", "Pending"], default: "Pending" },
    dateTaken: { type: Date },
  },
  { timestamps: true }
);

export default models.Vaccination || mongoose.model<IVaccination>("Vaccination", VaccinationSchema);
