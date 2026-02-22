import { Search, CalendarCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover Salons",
    description: "Browse curated salons and stylists near you with real ratings and reviews.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    description: "Pick your service, choose a time slot, and confirm your appointment in seconds.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Look Amazing",
    description: "Visit your salon, enjoy the experience, and shop recommended products to maintain your look.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 gradient-luxury">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold tracking-widest uppercase text-primary">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Your perfect salon experience is just three steps away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center relative"
            >
              <div className="relative mx-auto w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-lg">
                <step.icon className="w-9 h-9 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center font-body">
                  {step.step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/30" />
              )}
              <h3 className="text-xl font-display font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
