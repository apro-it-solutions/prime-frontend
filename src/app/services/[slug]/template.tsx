"use client";

import { motion, useReducedMotion } from "framer-motion";

/** The site's shared ease-out curve. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Next re-mounts a `template` on every navigation within the segment, which is
 * exactly the hook the service rail needs: switching services fades the new
 * content in over the persistent header, footer and scroll position instead of
 * cutting to it. Honors prefers-reduced-motion by rendering the content plainly.
 */
export default function ServiceDetailTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
