"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  UserRound,
  Building2,
  ShoppingBag,
  Scissors,
  CalendarHeart,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChevronLeft,
  Phone,
  MapPin,
  User,
  Star,
  ChevronRight,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth, type Role } from "@/context/auth";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Mullaitivu", "Vavuniya", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

const testimonials = [
  {
    name: "Nimesha K.",
    handle: "@nimeshastyle",
    quote:
      "BUFF SALON transformed how I manage my salon bookings. The AI features are incredible!",
    avatar: "NK",
  },
  {
    name: "Ravindu S.",
    handle: "@ravinducuts",
    quote:
      "As a solo stylist, this platform doubled my client base in just 2 months!",
    avatar: "RS",
  },
  {
    name: "Amaya D.",
    handle: "@amayadesigns",
    quote:
      "The virtual try-on feature is a game changer for my bridal clients.",
    avatar: "AD",
  },
];

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

type RoleCard = {
  label: string;
  desc: string;
  icon: any;
  path: string;
  gradient: string;
  authRole: Role;
};

export default function AuthScreen({
  defaultMode = "signin",
}: {
  defaultMode?: "signin" | "signup";
}) {
  const router = useRouter();
  const { login } = useAuth();

  const roles: RoleCard[] = useMemo(
    () => [
      {
        label: "Customer",
        desc: "Try hairstyles, book salons & shop",
        icon: UserRound,
        path: "/home",
        gradient: "from-accent-gold/20 to-accent-gold/5",
        authRole: "customer",
      },
      {
        label: "Salon Owner",
        desc: "Manage your salon, staff & bookings",
        icon: Building2,
        path: "/salon",
        gradient: "from-accent-gold/15 to-accent-gold/5",
        authRole: "salon",
      },
      {
        label: "Solo Stylist",
        desc: "Home visits, schedule & portfolio",
        icon: Scissors,
        path: "/stylist",
        gradient: "from-accent-gold/20 to-accent-gold/5",
        authRole: "stylist",
      },
      {
        label: "Event Stylist",
        desc: "Weddings, VIP & bridal packages",
        icon: CalendarHeart,
        path: "/event-stylist",
        gradient: "from-accent/20 to-accent/5",
        authRole: "event-stylist",
      },
      {
        label: "Vendor",
        desc: "Products, orders & inventory",
        icon: ShoppingBag,
        path: "/vendor",
        gradient: "from-accent-gold/15 to-accent-gold/5",
        authRole: "vendor",
      },
      {
        label: "Admin",
        desc: "Platform management & analytics",
        icon: Sparkles,
        path: "/admin",
        gradient: "from-accent-gold/15 to-accent-gold/5",
        authRole: "admin",
      },
    ],
    []
  );

  const [selectedRole, setSelectedRole] = useState<RoleCard | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(defaultMode === "signup");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && !agreedTerms) {
      toast.error("Please agree to the Terms & Privacy Policy");
      return;
    }
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    login({ email: email || "user@buff.com", role: selectedRole.authRole });
    toast.success(`Welcome to BUFF SALON · ${selectedRole.label}`);
    router.push(selectedRole.path);
  };

  const currentTestimonial = testimonials[testimonialIdx];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden">
      {/* LEFT */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-0 relative">
        <FloatingParticles />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="roles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-7"
              >
                {/* Mobile header */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-3 md:hidden"
                >
                  <div className="relative mx-auto w-fit">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent-gold to-accent-gold/70 flex items-center justify-center shadow-lg shadow-accent-gold/20">
                      <Scissors className="h-8 w-8 text-background" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">BUFF SALON</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI-Powered Beauty Platform
                    </p>
                  </div>
                </motion.div>

                <div className="hidden md:block">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold bg-gradient-to-r from-accent-gold to-accent-gold/70 bg-clip-text text-transparent"
                  >
                    Sign In
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-muted-foreground mt-2"
                  >
                    Choose your role to continue
                  </motion.p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    Continue as
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <motion.button
                        key={role.path}
                        variants={item}
                        whileHover={{ scale: 1.015, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left rounded-2xl border border-border/60 bg-gradient-to-br ${role.gradient} p-4 transition-all hover:border-accent-gold/30`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-11 w-11 rounded-xl bg-background/60 border border-border/50 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-accent-gold" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">{role.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {role.desc}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <div className="text-center text-xs text-muted-foreground">
                  By continuing you agree to our Terms & Privacy Policy
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    setIsSignUp(defaultMode === "signup");
                  }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-gold to-accent-gold/70 bg-clip-text text-transparent">
                    {isSignUp ? "Create Account" : "Sign In"}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedRole.label} · BUFF SALON
                  </p>
                </motion.div>

                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {isSignUp && (
                    <>
                      <FieldBlock label="Full Name" icon={<User className="h-4 w-4" />}>
                        <Input
                          placeholder="Your full name"
                          className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                        />
                      </FieldBlock>

                      <FieldBlock label="Phone Number" icon={<Phone className="h-4 w-4" />}>
                        <Input
                          type="tel"
                          placeholder="+94 7X XXX XXXX"
                          className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                        />
                      </FieldBlock>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          District
                        </label>
                        <Select>
                          <SelectTrigger className="bg-secondary/50 border-border/60 h-11 focus:border-accent-gold/40 rounded-xl">
                            <SelectValue placeholder="Select your district" />
                          </SelectTrigger>
                          <SelectContent className="max-h-52">
                            {districts.map((d) => (
                              <SelectItem key={d} value={d.toLowerCase()}>
                                {d}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          Gender
                        </label>
                        <Select>
                          <SelectTrigger className="bg-secondary/50 border-border/60 h-11 focus:border-accent-gold/40 rounded-xl">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedRole.label === "Salon Owner" && (
                        <>
                          <FieldBlock
                            label="Salon Name"
                            icon={<Building2 className="h-4 w-4" />}
                          >
                            <Input
                              placeholder="Your salon name"
                              className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                            />
                          </FieldBlock>
                          <FieldBlock
                            label="Salon Address"
                            icon={<MapPin className="h-4 w-4" />}
                          >
                            <Input
                              placeholder="Full address"
                              className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                            />
                          </FieldBlock>
                        </>
                      )}

                      {(selectedRole.label === "Solo Stylist" ||
                        selectedRole.label === "Event Stylist") && (
                        <FieldBlock
                          label="Years of Experience"
                          icon={<Sparkles className="h-4 w-4" />}
                        >
                          <Input
                            type="number"
                            placeholder="e.g. 5"
                            className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                          />
                        </FieldBlock>
                      )}

                      {selectedRole.label === "Vendor" && (
                        <FieldBlock
                          label="Store / Brand Name"
                          icon={<ShoppingBag className="h-4 w-4" />}
                        >
                          <Input
                            placeholder="Your store name"
                            className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                          />
                        </FieldBlock>
                      )}
                    </>
                  )}

                  <FieldBlock label="Email Address" icon={<Mail className="h-4 w-4" />}>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                    />
                  </FieldBlock>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-secondary/50 border-border/60 focus:border-accent-gold/40 h-11 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="keep-signed"
                          checked={keepSignedIn}
                          onCheckedChange={(v) => setKeepSignedIn(v === true)}
                        />
                        <label
                          htmlFor="keep-signed"
                          className="text-xs text-muted-foreground cursor-pointer"
                        >
                          Keep me signed in
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => toast.info("Password reset link sent!")}
                        className="text-xs text-accent-gold hover:text-accent-gold/80 transition-colors"
                      >
                        Reset password
                      </button>
                    </div>
                  )}

                  {isSignUp && (
                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox
                        id="terms"
                        checked={agreedTerms}
                        onCheckedChange={(v) => setAgreedTerms(v === true)}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => toast.info("Terms of Service")}
                          className="text-accent-gold hover:underline"
                        >
                          Terms
                        </button>
                        {" & "}
                        <button
                          type="button"
                          onClick={() => toast.info("Privacy Policy")}
                          className="text-accent-gold hover:underline"
                        >
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-background font-semibold hover:from-accent-gold/90 hover:to-accent-gold/70 shadow-lg shadow-accent-gold/20 transition-all rounded-xl text-sm"
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </motion.form>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-[11px] text-muted-foreground/50">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    toast.success("Welcome to BUFF SALON");
                    login({
                      email: email || "google@buff.com",
                      role: selectedRole.authRole,
                    });
                    router.push(selectedRole.path);
                  }}
                  className="w-full h-11 bg-secondary/30 border-border/60 hover:border-accent-gold/30 text-sm rounded-xl"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isSignUp ? "Already have an account?" : "New to our platform?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-accent-gold font-medium hover:text-accent-gold/80 transition-colors"
                  >
                    {isSignUp ? "Sign In" : "Create Account"}
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex relative w-1/2 min-h-screen items-center justify-center overflow-hidden bg-card/50">
        <FloatingParticles />
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-accent-gold/8 blur-[120px]" />
        <div className="absolute bottom-[15%] right-[10%] w-72 h-72 rounded-full bg-accent-gold/5 blur-[100px]" />

        <div className="relative z-10 text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2
              className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-accent-gold via-accent-gold/80 to-accent-gold/60 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              BUFF SALON
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your AI-powered beauty ecosystem for bookings, try-ons, and shopping.
            </motion.p>

            <div className="mt-8 rounded-2xl border border-border/60 bg-background/40 backdrop-blur p-5 text-left">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold font-bold">
                  {currentTestimonial.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{currentTestimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentTestimonial.handle}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-accent-gold" /> 5.0
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    “{currentTestimonial.quote}”
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() =>
                        setTestimonialIdx(
                          (i) => (i - 1 + testimonials.length) % testimonials.length
                        )
                      }
                      className="h-8 w-8 rounded-lg bg-secondary/50 border border-border/60 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() =>
                        setTestimonialIdx((i) => (i + 1) % testimonials.length)
                      }
                      className="h-8 w-8 rounded-lg bg-secondary/50 border border-border/60 flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex justify-center gap-1.5 mt-3">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === testimonialIdx ? "w-5 bg-accent-gold" : "w-1.5 bg-border"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-gold" />
                AI Try-On
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-2">
                <Scissors className="h-4 w-4 text-accent-gold" />
                Smart Booking
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-accent-gold" />
                Marketplace
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FieldBlock({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
