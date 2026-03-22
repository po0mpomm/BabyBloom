"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowLeft, Upload, FileText, File, Image as ImageIcon, Trash2,
  Download, Eye, Search, X,
} from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/shared/PageTransition";
import { SkeletonCard } from "@/components/shared/LoadingSpinner";
import Navbar from "@/components/layout/Navbar";

interface Doc {
  _id: string; documentName: string; fileUrl: string;
  fileType: string; fileSize: number; uploadDate: string; publicId?: string;
}

function FileIcon({ type }: { type: string }) {
  if (type.includes("image")) return <ImageIcon className="w-6 h-6 text-fuchsia-500" />;
  if (type.includes("pdf")) return <FileText className="w-6 h-6 text-rose-500" />;
  return <File className="w-6 h-6 text-pink-500" />;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [dragOver, setDragOver] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Doc | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios.get("/api/documents").then((r) => {
      setDocs(r.data.documents || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/api/documents/upload", formData, {
        onUploadProgress: (e) => {
          if (e.total) setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      setDocs((prev) => [res.data.document, ...prev]);
      toast.success("Document uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const deleteDoc = async (id: string) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocs((prev) => prev.filter((d) => d._id !== id));
      toast.success("Deleted");
    } catch { toast.error("Delete failed"); }
  };

  const filtered = docs.filter((d) => {
    const matchSearch = d.documentName.toLowerCase().includes(search.toLowerCase());
    const matchType =
      filterType === "All" ||
      (filterType === "PDF" && d.fileType?.includes("pdf")) ||
      (filterType === "Image" && d.fileType?.includes("image")) ||
      (filterType === "Other" && !d.fileType?.includes("pdf") && !d.fileType?.includes("image"));
    return matchSearch && matchType;
  });

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
                  Medical Documents
                </h1>
                <p className="text-[#8C5A6E] text-sm">{docs.length} documents stored</p>
              </div>
            </div>
          </div>

          {/* Upload zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 mb-6 text-center transition-all ${
              dragOver
                ? "border-rose-400 bg-rose-50"
                : "border-pink-200 hover:border-rose-300 hover:bg-rose-50/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }}
            />
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: "var(--gradient-accent)" }}
              >
                <Upload className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-[#1A0A0D] font-semibold">Drop files here or click to upload</p>
                <p className="text-[#8C5A6E] text-sm mt-1">Supports PDF, JPG, PNG, DOC files</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#8C5A6E]">
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-rose-500" /> PDF</span>
                <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-fuchsia-500" /> JPG/PNG</span>
                <span className="flex items-center gap-1"><File className="w-3.5 h-3.5 text-pink-500" /> DOC</span>
              </div>
            </div>

            {/* Upload progress */}
            {uploading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3">
                <p className="text-[#1A0A0D] font-medium">Uploading... {progress}%</p>
                <div className="w-48 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-accent)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C5A6E]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="w-full bg-white border border-pink-100 rounded-xl pl-10 pr-4 py-2.5 text-[#1A0A0D] text-sm placeholder-[#8C5A6E] outline-none focus:border-rose-300 transition-colors shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              {["All", "PDF", "Image", "Other"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    filterType === t
                      ? "text-white shadow-md"
                      : "bg-white border border-pink-100 text-[#8C5A6E] hover:text-rose-500 shadow-sm"
                  }`}
                  style={filterType === t ? { background: "var(--gradient-accent)" } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Documents grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-pink-400" />
              </div>
              <p className="text-[#8C5A6E]">No documents found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((doc, i) => (
                  <motion.div
                    key={doc._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(194,24,91,0.10)" }}
                    className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF7F8] border border-pink-100 flex items-center justify-center">
                        <FileIcon type={doc.fileType || ""} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A0A0D] text-sm font-medium truncate">{doc.documentName}</p>
                        <p className="text-[#8C5A6E] text-xs">{formatSize(doc.fileSize || 0)}</p>
                      </div>
                    </div>
                    <p className="text-[#8C5A6E] text-xs mb-3">
                      {new Date(doc.uploadDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <div className="flex items-center gap-2">
                      {doc.fileType?.includes("image") ? (
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDF7F8] border border-pink-100 text-[#8C5A6E] hover:text-rose-500 text-xs transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> Preview
                        </button>
                      ) : (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDF7F8] border border-pink-100 text-[#8C5A6E] hover:text-rose-500 text-xs transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" /> Open
                        </a>
                      )}
                      <a
                        href={doc.fileUrl}
                        download={doc.documentName}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDF7F8] border border-pink-100 text-[#8C5A6E] hover:text-rose-500 text-xs transition-all"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                      <button
                        onClick={() => deleteDoc(doc._id)}
                        className="ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[#8C5A6E] hover:text-red-500 hover:bg-red-50 text-xs transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </PageTransition>

      {/* Image preview modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewDoc(null)}
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white border border-pink-100 shadow-md flex items-center justify-center text-[#8C5A6E] hover:text-rose-500 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={previewDoc.fileUrl}
                alt={previewDoc.documentName}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white/80 text-sm mt-3">{previewDoc.documentName}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
