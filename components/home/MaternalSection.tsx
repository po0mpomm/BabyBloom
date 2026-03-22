"use client";
import { motion } from "framer-motion";
import { Heart, Salad, Stethoscope, Baby, Syringe, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import StaggerContainer, { staggerItem } from "@/components/shared/StaggerContainer";

const maternalCards = [
  {
    icon: Heart,
    title: "Pregnancy Care",
    description: "Track prenatal appointments, monitor maternal health metrics, and get personalised care reminders throughout your pregnancy journey.",
    gradient: "from-rose-500 to-pink-500",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    iconColor: "bg-rose-100 text-rose-600",
  },
  {
    icon: Salad,
    title: "Nutrition Guidance",
    description: "Evidence-based nutritional advice for expecting mothers and newborns, tailored to each trimester and growth stage.",
    gradient: "from-pink-500 to-fuchsia-400",
    bg: "from-pink-50 to-fuchsia-50",
    border: "border-pink-100",
    iconColor: "bg-pink-100 text-pink-600",
  },
  {
    icon: Stethoscope,
    title: "Regular Checkups",
    description: "Schedule and track all regular health checkups, lab tests, and specialist consultations from a single beautiful dashboard.",
    gradient: "from-fuchsia-500 to-rose-400",
    bg: "from-fuchsia-50 to-rose-50",
    border: "border-fuchsia-100",
    iconColor: "bg-fuchsia-100 text-fuchsia-600",
  },
];

const childcareCards = [
  {
    icon: Baby,
    title: "Child Nutrition",
    description: "Age-appropriate meal plans, feeding schedules, and nutritional milestones to support healthy development from birth to adolescence.",
    gradient: "from-rose-500 to-pink-400",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    iconColor: "bg-rose-100 text-rose-600",
  },
  {
    icon: Syringe,
    title: "Vaccination Importance",
    description: "Stay informed about the immunization schedule and understand why each vaccine is critical for your child's protection.",
    gradient: "from-pink-600 to-rose-500",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    iconColor: "bg-pink-100 text-pink-600",
  },
  {
    icon: TrendingUp,
    title: "Growth Monitoring",
    description: "Visual growth charts benchmarked against WHO standards help you understand your child's development trajectory at every stage.",
    gradient: "from-fuchsia-600 to-pink-500",
    bg: "from-fuchsia-50 to-pink-50",
    border: "border-fuchsia-100",
    iconColor: "bg-fuchsia-100 text-fuchsia-600",
  },
];

function InfoCards({
  cards,
  title,
  subtitle,
  tag,
  tagIcon: TagIcon,
}: {
  cards: typeof maternalCards;
  title: string;
  subtitle: string;
  tag: string;
  tagIcon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-24">
      <ScrollReveal className="text-center mb-14">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border"
          style={{ background: "rgba(252,228,236,0.8)", borderColor: "rgba(194,24,91,0.15)", color: "#C2185B" }}
        >
          <TagIcon className="w-3.5 h-3.5" />
          {tag}
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold text-[#1A0A0D] mb-3 text-heading-shadow"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <p className="text-[#4A1E2E] text-lg max-w-xl mx-auto">{subtitle}</p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            variants={staggerItem}
            whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(194,24,91,0.10)" }}
            className={`group p-7 rounded-3xl bg-gradient-to-br ${card.bg} border ${card.border} relative overflow-hidden transition-all duration-300`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
            <div className={`w-12 h-12 rounded-2xl ${card.iconColor} flex items-center justify-center shadow-sm mb-4`}>
              <card.icon className="w-6 h-6" />
            </div>
            <h3
              className="text-xl font-bold text-[#1A0A0D] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.title}
            </h3>
            <p className="text-[#4A1E2E] text-sm leading-relaxed">{card.description}</p>
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  );
}

export default function MaternalSection() {
  return (
    <section className="py-28 px-4 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(252,228,236,0.4) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <InfoCards
          cards={maternalCards}
          title="Maternal Healthcare"
          subtitle="Comprehensive support for expectant mothers throughout the pregnancy journey and beyond."
          tag="For Mothers"
          tagIcon={Heart}
        />
        <InfoCards
          cards={childcareCards}
          title="Childcare Excellence"
          subtitle="Everything you need to monitor, support, and celebrate your child's health milestones."
          tag="For Children"
          tagIcon={Baby}
        />
      </div>
    </section>
  );
}
