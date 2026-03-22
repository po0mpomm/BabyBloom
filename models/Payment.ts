import mongoose, { Schema, Document, models } from "mongoose";

export interface IPayment extends Document {
  patientId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  paymentDate: Date;
  paymentStatus: "Paid" | "Pending";
}

const PaymentSchema = new Schema<IPayment>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  },
  { timestamps: true }
);

export default models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
