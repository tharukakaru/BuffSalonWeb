"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Shield,
  Camera,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Sun,
  Palette,
  Scissors,
  MapPin,
  Heart,
} from "lucide-react";

const steps = ["consent", "camera", "preferences", "complete"] as const;
type Step = (typeof steps)[number];

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Mullaitivu", "Vavuniya", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];
const skinTones = ["Fair", "Light", "Medium", "Olive", "Tan", "Deep"];
const budgets = ["Under LKR 2,000", "LKR 2,000–5,000", "LKR 5,000–10,000", "LKR 10,000+"];
const interests = ["Haircuts", "Hair Color", "Bridal", "Skincare", "Makeup", "Nails", "Spa", "Beard/Grooming"];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("consent");
  const [consents, setConsents] = useState({ terms: false, selfie: false, marketing: false });
  const [cameraGranted, setCameraGranted] = useState(false);
  const [prefs, setPrefs] = useState({
    hairType: "",
    skinTone: "",
    budget: "",
    district: "",
    interests: new Set<string>(),
  });

  const stepIndex = steps.indexOf(currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const next = () => {
    const i = steps.indexOf(currentStep);
    if (i < steps.length - 1) setCurrentStep(steps[i + 1]);
  };
  const back = () => {
    const i = steps.indexOf(currentStep);
    if (i > 0) setCurrentStep(steps[i - 1]);
  };

  const toggleInterest = (i: string) => {
    setPrefs((p) => {
      const nxt = new Set(p.interests);
      nxt.has(i) ? nxt.delete(i) : nxt.add(i);
      return { ...p, interests: nxt };
    });
  };

  const toggleConsent = (key: keyof typeof consents) =>
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));

  const anim = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Step {stepIndex + 1} of {steps.length}
          </span>
          {stepIndex > 0 && (
            <button onClick={back} className="text-xs text-accent-gold flex items-center gap-1">
              <ChevronLeft className="h-3 w-3" /> Back
            </button>
          )}
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent-gold rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* CONSENT */}
          {currentStep === "consent" && (
            <motion.div key="consent" {...anim} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-2xl bg-accent-gold/15 flex items-center justify-center mx-auto">
                  <Shield className="h-7 w-7 text-accent-gold" />
                </div>
                <h1 className="text-xl font-bold">Privacy & Consent</h1>
                <p className="text-sm text-muted-foreground">
                  We take your privacy seriously. Please review and accept the following.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: "terms" as const, label: "Terms of Service & Privacy Policy", desc: "Required to use BUFF", required: true },
                  { key: "selfie" as const, label: "Selfie Processing Consent", desc: "Allow AI try-on with your photos. You can delete anytime.", required: false },
                  { key: "marketing" as const, label: "Marketing Communications", desc: "Get personalised beauty tips and offers", required: false },
                ].map((c) => (
                  <button
                    key={c.key}
                    onClick={() => toggleConsent(c.key)}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      consents[c.key] ? "border-accent-gold bg-accent-gold/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          consents[c.key] ? "bg-accent-gold border-accent-gold" : "border-muted-foreground/40"
                        }`}
                      >
                        {consents[c.key] && <Check className="h-3 w-3 text-accent-gold-foreground" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {c.label}{" "}
                          {c.required && <span className="text-accent text-[10px]">Required</span>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Button className="w-full h-11" disabled={!consents.terms} onClick={next}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* CAMERA */}
          {currentStep === "camera" && (
            <motion.div key="camera" {...anim} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-2xl bg-accent-gold/15 flex items-center justify-center mx-auto">
                  <Camera className="h-7 w-7 text-accent-gold" />
                </div>
                <h1 className="text-xl font-bold">Camera Access</h1>
                <p className="text-sm text-muted-foreground">
                  Enable your camera for AR try-on and virtual styling experiences.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 text-center space-y-4">
                <div className="h-32 rounded-lg bg-secondary flex items-center justify-center">
                  {cameraGranted ? (
                    <div className="text-center space-y-2">
                      <Check className="h-8 w-8 text-accent-gold mx-auto" />
                      <p className="text-sm font-medium text-accent-gold">Camera enabled</p>
                    </div>
                  ) : (
                    <Camera className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                {!cameraGranted && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setCameraGranted(true);
                      toast.success("Camera access granted");
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" /> Enable Camera
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Button className="w-full h-11" onClick={next}>
                  {cameraGranted ? "Continue" : "Skip for now"}{" "}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                {!cameraGranted && (
                  <p className="text-[11px] text-muted-foreground text-center">
                    You can enable this later in settings
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* PREFERENCES */}
          {currentStep === "preferences" && (
            <motion.div key="prefs" {...anim} className="space-y-5">
              <div className="text-center space-y-2">
                <div className="h-14 w-14 rounded-2xl bg-accent-gold/15 flex items-center justify-center mx-auto">
                  <Sparkles className="h-7 w-7 text-accent-gold" />
                </div>
                <h1 className="text-xl font-bold">Your Preferences</h1>
                <p className="text-sm text-muted-foreground">Help us personalise your experience.</p>
              </div>

              {/* Hair Type */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Scissors className="h-3 w-3" /> Hair Type
                </label>
                <div className="flex gap-2 flex-wrap">
                  {hairTypes.map((h) => (
                    <button
                      key={h}
                      onClick={() => setPrefs((p) => ({ ...p, hairType: h }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        prefs.hairType === h
                          ? "bg-accent-gold text-accent-gold-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Tone */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Palette className="h-3 w-3" /> Skin Tone
                </label>
                <div className="flex gap-2 flex-wrap">
                  {skinTones.map((s) => (
                    <button
                      key={s}
                      onClick={() => setPrefs((p) => ({ ...p, skinTone: s }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        prefs.skinTone === s
                          ? "bg-accent-gold text-accent-gold-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Sun className="h-3 w-3" /> Budget Range
                </label>
                <div className="flex gap-2 flex-wrap">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      onClick={() => setPrefs((p) => ({ ...p, budget: b }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        prefs.budget === b
                          ? "bg-accent-gold text-accent-gold-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* District */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> District
                </label>
                <select
                  value={prefs.district}
                  onChange={(e) => setPrefs((p) => ({ ...p, district: e.target.value }))}
                  className="w-full h-11 rounded-xl bg-secondary border border-border px-4 text-sm"
                >
                  <option value="" disabled>
                    Select your district
                  </option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Heart className="h-3 w-3" /> Interests
                </label>
                <div className="flex gap-2 flex-wrap">
                  {interests.map((i) => (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        prefs.interests.has(i)
                          ? "bg-accent-gold text-accent-gold-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full h-11" onClick={next}>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* COMPLETE */}
          {currentStep === "complete" && (
            <motion.div key="complete" {...anim} className="space-y-6 text-center">
              <div className="h-16 w-16 rounded-2xl bg-accent-gold/15 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-accent-gold" />
              </div>
              <h1 className="text-2xl font-bold">You’re all set!</h1>
              <p className="text-sm text-muted-foreground">
                Your BUFF experience is now personalised. Let’s get you booked.
              </p>
              <Button
                className="w-full h-11"
                onClick={() => {
                  toast.success("Welcome to BUFF!");
                  router.push("/home");
                }}
              >
                Go to Home <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
