"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ArrowLeft, CreditCard, CheckCircle, Clock, TrendingUp, X, IndianRupee, Copy, Check } from "lucide-react";
import Link from "next/link";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import PageTransition from "@/components/shared/PageTransition";
import { SkeletonCard } from "@/components/shared/LoadingSpinner";
import Navbar from "@/components/layout/Navbar";

interface Payment {
  _id: string; amount: number; description: string;
  paymentDate: string; paymentStatus: "Paid" | "Pending";
}

function getMonthlyData(payments: Payment[]) {
  const months: Record<string, { month: string; paid: number; pending: number }> = {};
  payments.forEach((p) => {
    const m = new Date(p.paymentDate).toLocaleString("default", { month: "short" });
    if (!months[m]) months[m] = { month: m, paid: 0, pending: 0 };
    if (p.paymentStatus === "Paid") months[m].paid += p.amount;
    else months[m].pending += p.amount;
  });
  return Object.values(months).slice(-6);
}

function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Payment>("paymentDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [upiId, setUpiId] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const PER_PAGE = 8;
  const CLINIC_UPI = "babybloom@upi";

  useEffect(() => {
    axios.get("/api/payments").then((r) => {
      setPayments(r.data.payments || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalPaid = payments.filter((p) => p.paymentStatus === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter((p) => p.paymentStatus === "Pending").reduce((s, p) => s + p.amount, 0);
  const lastPayment = payments.find((p) => p.paymentStatus === "Paid");

  const sorted = [...payments].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];
    if (av === undefined || bv === undefined) return 0;
    if (sortDir === "asc") return av > bv ? 1 : -1;
    return av < bv ? 1 : -1;
  });

  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(payments.length / PER_PAGE);
  const monthlyData = getMonthlyData(payments);

  const toggleSort = (field: keyof Payment) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const openPayModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setUpiId("");
    setUtrNumber("");
    setSubmitted(false);
    setShowPayModal(true);
  };

  const handleCopyUpi = async () => {
    await navigator.clipboard.writeText(CLINIC_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitPayment = async () => {
    if (!upiId.trim() || !utrNumber.trim()) return;
    setSubmitting(true);
    // Simulate API call for payment verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const summaryCards = [
    {
      label: "Total Paid", value: formatRupee(totalPaid),
      icon: CheckCircle, text: "text-emerald-600",
      soft: "from-emerald-50 to-teal-50", border: "border-emerald-100",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      label: "Total Pending", value: formatRupee(totalPending),
      icon: Clock, text: totalPending > 0 ? "text-orange-600" : "text-rose-600",
      soft: "from-orange-50 to-amber-50", border: "border-orange-100",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      label: "Last Payment", value: lastPayment ? new Date(lastPayment.paymentDate).toLocaleDateString() : "--",
      icon: CreditCard, text: "text-rose-600",
      soft: "from-rose-50 to-fuchsia-50", border: "border-rose-100",
      gradient: "from-rose-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDF7F8]">
      <Navbar />
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
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
                Payment Status
              </h1>
              <p className="text-[#8C5A6E] text-sm">{payments.length} transactions</p>
            </div>
          </div>

          {/* Summary cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {summaryCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(194,24,91,0.10)" }}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${card.soft} border ${card.border} shadow-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#8C5A6E] text-xs font-medium mb-1">{card.label}</p>
                  <p className={`text-2xl font-bold ${card.text}`} style={{ fontFamily: "var(--font-display)" }}>
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bar chart */}
          {monthlyData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                <h3 className="text-[#1A0A0D] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  Monthly Payment History
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(194,24,91,0.06)" />
                  <XAxis dataKey="month" stroke="#B08090" tick={{ fill: "#B08090", fontSize: 12 }} />
                  <YAxis stroke="#B08090" tick={{ fill: "#B08090", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#fff", border: "1px solid rgba(194,24,91,0.12)",
                      borderRadius: "12px", color: "#1A0A0D", boxShadow: "0 8px 24px rgba(194,24,91,0.10)",
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={((value: any) => [formatRupee(Number(value))]) as any}
                  />
                  <Bar dataKey="paid" name="Paid" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((_, i) => <Cell key={i} fill="#10b981" opacity={0.85} />)}
                  </Bar>
                  <Bar dataKey="pending" name="Pending" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((_, i) => <Cell key={i} fill="#f59e0b" opacity={0.85} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-white border border-pink-100 shadow-sm overflow-hidden"
          >
            {loading ? (
              <div className="p-6 space-y-3">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-10 bg-pink-50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-8 h-8 text-rose-400" />
                </div>
                <p className="text-[#8C5A6E]">No payment records found.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-pink-100">
                        {[
                          { label: "Payment ID", key: "_id" },
                          { label: "Description", key: "description" },
                          { label: "Amount", key: "amount" },
                          { label: "Date", key: "paymentDate" },
                          { label: "Status", key: "paymentStatus" },
                        ].map((col) => (
                          <th
                            key={col.key}
                            className="text-left text-[#8C5A6E] font-medium py-3 px-4 cursor-pointer hover:text-rose-500 transition-colors"
                            onClick={() => toggleSort(col.key as keyof Payment)}
                          >
                            {col.label} {sortField === col.key && (sortDir === "desc" ? "v" : "^")}
                          </th>
                        ))}
                        <th className="text-left text-[#8C5A6E] font-medium py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((p, i) => (
                        <motion.tr
                          key={p._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-pink-50 hover:bg-rose-50/40 transition-colors last:border-0"
                        >
                          <td className="py-3 px-4 text-[#8C5A6E] font-mono text-xs">#{p._id.slice(-8)}</td>
                          <td className="py-3 px-4 text-[#4A1E2E]">{p.description || "--"}</td>
                          <td className="py-3 px-4 text-[#1A0A0D] font-semibold">{formatRupee(p.amount)}</td>
                          <td className="py-3 px-4 text-[#8C5A6E]">{new Date(p.paymentDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                              p.paymentStatus === "Paid"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-orange-50 text-orange-600 border-orange-200"
                            }`}>
                              {p.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {p.paymentStatus === "Pending" ? (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openPayModal(p)}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-medium shadow-sm hover:shadow-md transition-shadow"
                              >
                                Pay Now
                              </motion.button>
                            ) : (
                              <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Done
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-pink-100">
                    <p className="text-[#8C5A6E] text-sm">Page {page} of {totalPages}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 rounded-lg bg-white border border-pink-100 text-sm text-[#8C5A6E] hover:text-rose-500 disabled:opacity-40 transition-all shadow-sm"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 rounded-lg bg-white border border-pink-100 text-sm text-[#8C5A6E] hover:text-rose-500 disabled:opacity-40 transition-all shadow-sm"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </PageTransition>

      {/* UPI Payment Modal */}
      <AnimatePresence>
        {showPayModal && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => !submitting && setShowPayModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-pink-100"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                      UPI Payment
                    </h2>
                    <p className="text-white/80 text-xs">Verify your payment details</p>
                  </div>
                </div>
                <button
                  onClick={() => !submitting && setShowPayModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {!submitted ? (
                  <>
                    {/* Payment Amount */}
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 mb-5 border border-rose-100">
                      <p className="text-[#8C5A6E] text-xs font-medium mb-1">Amount to Pay</p>
                      <p className="text-3xl font-bold text-[#1A0A0D]" style={{ fontFamily: "var(--font-display)" }}>
                        {formatRupee(selectedPayment.amount)}
                      </p>
                      <p className="text-[#8C5A6E] text-xs mt-1">{selectedPayment.description || "Payment"}</p>
                    </div>

                    {/* Clinic UPI ID */}
                    <div className="mb-5">
                      <label className="block text-[#4A1E2E] text-sm font-medium mb-2">Pay to UPI ID</label>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-pink-100">
                        <span className="text-[#1A0A0D] font-mono text-sm flex-1">{CLINIC_UPI}</span>
                        <button
                          onClick={handleCopyUpi}
                          className="text-rose-500 hover:text-rose-600 transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* UPI ID Input */}
                    <div className="mb-4">
                      <label className="block text-[#4A1E2E] text-sm font-medium mb-2">Your UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@paytm / yourname@upi"
                        className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-[#1A0A0D] text-sm placeholder-[#B08090] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all"
                      />
                    </div>

                    {/* UTR Number Input */}
                    <div className="mb-4">
                      <label className="block text-[#4A1E2E] text-sm font-medium mb-2">UPI Transaction ID (UTR Number)</label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="Enter 12-digit UTR number"
                        className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white text-[#1A0A0D] text-sm placeholder-[#B08090] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all"
                      />
                      <p className="text-[#8C5A6E] text-xs mt-1.5">You can find this in your UPI app payment history</p>
                    </div>

                    {/* UPI Number Input */}
                    <div className="mb-6">
                      <label className="block text-[#4A1E2E] text-sm font-medium mb-2">Registered Mobile Number</label>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-3 rounded-xl border border-pink-200 bg-gray-50 text-[#4A1E2E] text-sm">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter mobile number"
                          className="flex-1 px-4 py-3 rounded-xl border border-pink-200 bg-white text-[#1A0A0D] text-sm placeholder-[#B08090] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 transition-all"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitPayment}
                      disabled={!upiId.trim() || !utrNumber.trim() || submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Submit for Verification
                        </>
                      )}
                    </motion.button>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-[#1A0A0D] font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>
                      Payment Submitted
                    </h3>
                    <p className="text-[#8C5A6E] text-sm mb-1">
                      Your payment of {formatRupee(selectedPayment.amount)} is under verification.
                    </p>
                    <p className="text-[#8C5A6E] text-xs mb-6">
                      UTR: {utrNumber} | UPI: {upiId}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPayModal(false)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium shadow-md"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
