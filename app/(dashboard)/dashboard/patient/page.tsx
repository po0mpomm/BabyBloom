"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, Edit3, Save, X, User, Heart, Stethoscope, Phone } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/shared/PageTransition";
import { SkeletonCard } from "@/components/shared/LoadingSpinner";
import Navbar from "@/components/layout/Navbar";

interface PatientData {
  childName: string; age: number; gender: string; dob: string;
  weight: number; height: number; bloodType: string; healthIssue: string;
  guardianName: string; phoneNumber: string; physicianName: string; physicianPhone: string;
}

const sectionDefs = [
  { section: "Personal", icon: User, color: "from-rose-500 to-pink-500", soft: "bg-rose-50", iconColor: "bg-rose-100 text-rose-600", items: [
    { label: "Child Name", key: "childName", type: "text" },
    { label: "Date of Birth", key: "dob", type: "date" },
    { label: "Age", key: "age", type: "number" },
    { label: "Gender", key: "gender", type: "text" },
  ]},
  { section: "Physical", icon: Heart, color: "from-fuchsia-500 to-pink-500", soft: "bg-fuchsia-50", iconColor: "bg-fuchsia-100 text-fuchsia-600", items: [
    { label: "Weight (kg)", key: "weight", type: "number" },
    { label: "Height (cm)", key: "height", type: "number" },
    { label: "Blood Type", key: "bloodType", type: "text" },
    { label: "Health Issues", key: "healthIssue", type: "text" },
  ]},
  { section: "Guardian", icon: Phone, color: "from-pink-500 to-rose-400", soft: "bg-pink-50", iconColor: "bg-pink-100 text-pink-600", items: [
    { label: "Guardian Name", key: "guardianName", type: "text" },
    { label: "Phone Number", key: "phoneNumber", type: "text" },
  ]},
  { section: "Physician", icon: Stethoscope, color: "from-rose-600 to-fuchsia-500", soft: "bg-rose-50", iconColor: "bg-rose-100 text-rose-700", items: [
    { label: "Doctor Name", key: "physicianName", type: "text" },
    { label: "Doctor Phone", key: "physicianPhone", type: "text" },
  ]},
];

export default function PatientPage() {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const { register, handleSubmit, reset } = useForm<PatientData>();

  useEffect(() => {
    axios.get("/api/patient").then((r) => {
      if (r.data.patient) {
        setPatient(r.data.patient);
        reset(r.data.patient);
      } else {
        setIsNew(true);
        setEditMode(true);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: PatientData) => {
    setSaving(true);
    try {
      if (isNew) {
        const res = await axios.post("/api/patient/create", data);
        setPatient(res.data.patient);
        setIsNew(false);
        toast.success("Profile created!");
      } else {
        const res = await axios.put("/api/patient", data);
        setPatient(res.data.patient);
        toast.success("Profile updated!");
      }
      setEditMode(false);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF7F8]">
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#fff", color: "#1A0A0D", border: "1px solid rgba(194,24,91,0.12)", boxShadow: "0 8px 24px rgba(194,24,91,0.08)" },
        }}
      />
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-xl bg-white border border-pink-100 text-[#8C5A6E] hover:text-rose-500 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#1A0A0D] text-heading-shadow" style={{ fontFamily: "var(--font-display)" }}>
                  Child Health Profile
                </h1>
                <p className="text-[#8C5A6E] text-sm">
                  {isNew ? "Create your child's profile" : "View & update health information"}
                </p>
              </div>
            </div>
            {!editMode && patient && (
              <motion.button
                onClick={() => setEditMode(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow-md"
                style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.22)" }}
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </motion.button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Profile hero card */}
              {patient && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 mb-6 flex items-center gap-5 shadow-sm"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    style={{ background: "var(--gradient-accent)", boxShadow: "0 8px 24px rgba(194,24,91,0.25)" }}
                  >
                    {patient.childName?.[0] || "?"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A0A0D]" style={{ fontFamily: "var(--font-display)" }}>
                      {patient.childName}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[#8C5A6E] text-sm">{patient.age} years old</span>
                      {patient.bloodType && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-medium border border-rose-200">
                          {patient.bloodType}
                        </span>
                      )}
                      {patient.gender && (
                        <span className="px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-600 text-xs font-medium border border-fuchsia-200">
                          {patient.gender}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sectionDefs.map((section, si) => (
                  <motion.div
                    key={section.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: si * 0.08 }}
                    className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center shadow-sm`}>
                        <section.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-[#1A0A0D] font-semibold">{section.section}</h3>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div key={item.key}>
                          <p className="text-[#8C5A6E] text-xs mb-1 font-medium">{item.label}</p>
                          {editMode ? (
                            <input
                              {...register(item.key as keyof PatientData)}
                              type={item.type}
                              className="w-full bg-[#FDF7F8] border border-pink-100 rounded-xl px-3 py-2 text-[#1A0A0D] text-sm outline-none focus:border-rose-300 transition-colors"
                            />
                          ) : (
                            <p className="text-[#1A0A0D] text-sm font-medium">
                              {patient?.[item.key as keyof PatientData] || (
                                <span className="text-[#8C5A6E]">Not set</span>
                              )}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Save / Cancel */}
              {editMode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mt-6"
                >
                  <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium text-sm shadow-md disabled:opacity-60"
                    style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.22)" }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : isNew ? "Create Profile" : "Save Changes"}
                  </motion.button>
                  {!isNew && (
                    <motion.button
                      type="button"
                      onClick={() => { setEditMode(false); reset(patient!); }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-pink-100 text-[#8C5A6E] hover:text-rose-500 font-medium text-sm transition-colors shadow-sm"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </motion.button>
                  )}
                </motion.div>
              )}
            </form>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
