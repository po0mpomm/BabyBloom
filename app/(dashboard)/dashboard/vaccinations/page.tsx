"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft, Plus, X, Syringe, CheckCircle, Clock, Calendar, Edit3 } from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/shared/PageTransition";
import { SkeletonCard } from "@/components/shared/LoadingSpinner";
import Navbar from "@/components/layout/Navbar";

interface Vaccine {
  _id: string; vaccineName: string; dueDate: string;
  status: "Completed" | "Pending"; dateTaken?: string;
}

const vaccineSchedule = [
  { age: "Birth", vaccines: "BCG, OPV0, HepB" },
  { age: "6 weeks", vaccines: "DTwP/DTaP, IPV, HepB, Hib, PCV" },
  { age: "10 weeks", vaccines: "DTwP/DTaP, IPV, Hib, PCV" },
  { age: "14 weeks", vaccines: "DTwP/DTaP, IPV, Hib, PCV" },
  { age: "9 months", vaccines: "Measles, OPV3" },
  { age: "12–15 months", vaccines: "MMR, Varicella, PCV booster" },
  { age: "18 months", vaccines: "DTwP booster, IPV, Hib" },
  { age: "5 years", vaccines: "DTwP, OPV" },
];

export default function VaccinationsPage() {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVaccine, setEditVaccine] = useState<Vaccine | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<{
    vaccineName: string; dueDate: string; status: string; dateTaken: string;
  }>();

  const statusWatch = watch("status");

  useEffect(() => {
    axios.get("/api/vaccines").then((r) => {
      setVaccines(r.data.vaccines || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const openAddModal = () => {
    setEditVaccine(null);
    reset({ vaccineName: "", dueDate: "", status: "Pending", dateTaken: "" });
    setModalOpen(true);
  };
  const openEditModal = (v: Vaccine) => {
    setEditVaccine(v);
    reset({ vaccineName: v.vaccineName, dueDate: v.dueDate?.slice(0, 10), status: v.status, dateTaken: v.dateTaken?.slice(0, 10) || "" });
    setModalOpen(true);
  };

  const onSubmit = async (data: { vaccineName: string; dueDate: string; status: string; dateTaken: string }) => {
    try {
      if (editVaccine) {
        const res = await axios.put(`/api/vaccines/${editVaccine._id}`, data);
        setVaccines((prev) => prev.map((v) => v._id === editVaccine._id ? res.data.vaccine : v));
        toast.success("Vaccine updated!");
      } else {
        const res = await axios.post("/api/vaccines/add", data);
        setVaccines((prev) => [...prev, res.data.vaccine]);
        toast.success("Vaccine added!");
      }
      setModalOpen(false);
    } catch {
      toast.error("Failed to save vaccine");
    }
  };

  const deleteVaccine = async (id: string) => {
    try {
      await axios.delete(`/api/vaccines/${id}`);
      setVaccines((prev) => prev.filter((v) => v._id !== id));
      toast.success("Deleted");
    } catch { toast.error("Delete failed"); }
  };

  const filtered = vaccines.filter((v) => filter === "All" || v.status === filter);

  function getDays(dateStr: string) {
    const diff = new Date(dateStr).getTime() - Date.now();
    const d = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (d < 0) return <span className="text-red-500 text-xs font-medium">{Math.abs(d)}d overdue</span>;
    if (d === 0) return <span className="text-orange-500 text-xs font-medium">Today!</span>;
    return <span className="text-[#8C5A6E] text-xs">Due in {d}d</span>;
  }

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
                  Vaccination Records
                </h1>
                <p className="text-[#8C5A6E] text-sm">{vaccines.length} vaccines tracked</p>
              </div>
            </div>
            <motion.button
              onClick={openAddModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow-md"
              style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.22)" }}
            >
              <Plus className="w-4 h-4" /> Add Vaccine
            </motion.button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6">
            {(["All", "Completed", "Pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? "text-white shadow-md"
                    : "bg-white border border-pink-100 text-[#8C5A6E] hover:text-rose-500 shadow-sm"
                }`}
                style={filter === f ? { background: "var(--gradient-accent)" } : {}}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Vaccines grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center mx-auto mb-3">
                <Syringe className="w-8 h-8 text-fuchsia-400" />
              </div>
              <p className="text-[#8C5A6E]">No vaccines found. Add your first vaccine!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <AnimatePresence>
                {filtered.map((vaccine, i) => (
                  <motion.div
                    key={vaccine._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(194,24,91,0.10)" }}
                    className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl ${vaccine.status === "Completed" ? "bg-emerald-50" : "bg-orange-50"} flex items-center justify-center`}>
                          {vaccine.status === "Completed"
                            ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                            : <Clock className="w-5 h-5 text-orange-500" />
                          }
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                          vaccine.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-orange-50 text-orange-600 border-orange-200"
                        }`}>
                          {vaccine.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(vaccine)}
                          className="p-1.5 rounded-lg text-[#8C5A6E] hover:text-rose-500 hover:bg-rose-50 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteVaccine(vaccine._id)}
                          className="p-1.5 rounded-lg text-[#8C5A6E] hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-[#1A0A0D] font-semibold text-base mb-1">{vaccine.vaccineName}</h3>
                    <div className="flex items-center gap-1 text-[#8C5A6E] text-xs mb-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(vaccine.dueDate).toLocaleDateString()}
                    </div>
                    {vaccine.status === "Pending" && getDays(vaccine.dueDate)}
                    {vaccine.status === "Completed" && vaccine.dateTaken && (
                      <p className="text-emerald-600 text-xs font-medium">
                        Taken: {new Date(vaccine.dateTaken).toLocaleDateString()}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Schedule reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white border border-pink-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setScheduleOpen(!scheduleOpen)}
              className="w-full flex items-center justify-between p-5 text-[#1A0A0D] font-semibold hover:bg-rose-50/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-rose-500" />
                National Vaccine Schedule Reference
              </span>
              <motion.span
                animate={{ rotate: scheduleOpen ? 180 : 0 }}
                className="text-[#8C5A6E] text-sm"
              >▼</motion.span>
            </button>
            <AnimatePresence>
              {scheduleOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 border-t border-pink-100">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-pink-100">
                            <th className="text-left text-[#8C5A6E] py-2 pr-4 font-medium">Age</th>
                            <th className="text-left text-[#8C5A6E] py-2 font-medium">Vaccines</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vaccineSchedule.map((row, i) => (
                            <tr key={i} className="border-b border-pink-50 last:border-0">
                              <td className="text-rose-600 font-semibold py-2.5 pr-4 whitespace-nowrap">{row.age}</td>
                              <td className="text-[#4A1E2E] py-2.5">{row.vaccines}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </PageTransition>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md bg-white border border-pink-100 rounded-2xl p-6 shadow-2xl"
              style={{ boxShadow: "0 32px 80px rgba(194,24,91,0.12)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#1A0A0D] font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  {editVaccine ? "Edit Vaccine" : "Add Vaccine"}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-[#8C5A6E] hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {[
                  { label: "Vaccine Name", key: "vaccineName", type: "text", placeholder: "e.g. BCG, MMR..." },
                  { label: "Due Date", key: "dueDate", type: "date", placeholder: "" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-sm text-[#8C5A6E] font-medium block mb-1">{f.label}</label>
                    <input
                      {...register(f.key as "vaccineName" | "dueDate")}
                      type={f.type}
                      placeholder={f.placeholder}
                      className="w-full bg-[#FDF7F8] border border-pink-100 rounded-xl px-3 py-2.5 text-[#1A0A0D] text-sm outline-none focus:border-rose-300 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm text-[#8C5A6E] font-medium block mb-1">Status</label>
                  <select
                    {...register("status")}
                    className="w-full bg-[#FDF7F8] border border-pink-100 rounded-xl px-3 py-2.5 text-[#1A0A0D] text-sm outline-none focus:border-rose-300 transition-colors"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                {statusWatch === "Completed" && (
                  <div>
                    <label className="text-sm text-[#8C5A6E] font-medium block mb-1">Date Taken</label>
                    <input
                      {...register("dateTaken")}
                      type="date"
                      className="w-full bg-[#FDF7F8] border border-pink-100 rounded-xl px-3 py-2.5 text-[#1A0A0D] text-sm outline-none focus:border-rose-300 transition-colors"
                    />
                  </div>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm shadow-md"
                  style={{ background: "var(--gradient-accent)", boxShadow: "0 4px 16px rgba(194,24,91,0.22)" }}
                >
                  {editVaccine ? "Update Vaccine" : "Add Vaccine"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
