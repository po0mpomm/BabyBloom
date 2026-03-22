import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import MaternalSection from "@/components/home/MaternalSection";
import ChatbotWidget from "@/components/home/ChatbotWidget";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <MaternalSection />
      <Footer />
      <ChatbotWidget />
    </main>
  );
}
