"use client";

import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function PageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto space-y-6">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-1">
        <motion.h1 variants={item} className="text-xl font-semibold">
          {title}
        </motion.h1>
        {description ? (
          <motion.p variants={item} className="text-sm text-muted-foreground">
            {description}
          </motion.p>
        ) : null}
      </motion.div>

      {children}
    </div>
  );
}
