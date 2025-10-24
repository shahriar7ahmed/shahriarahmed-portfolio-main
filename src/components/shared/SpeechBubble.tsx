import React, { forwardRef, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const INITIAL = { opacity: 0, scale: 0.8, y: 10 } as const;
const ANIMATE = { opacity: 1, scale: 1, y: 0 } as const;
const transitionFactory = (delay = 0) => ({
  delay,
  type: 'spring' as const,
  stiffness: 200,
  damping: 15,
});

const SpeechBubble = forwardRef<HTMLDivElement, SpeechBubbleProps>(
  ({ children, className = '', delay = 0 }, ref) => {
    const transition = useMemo(() => transitionFactory(delay), [delay]);
    const classes = ['speech-bubble', className].filter(Boolean).join(' ');

    return (
      <motion.div
        ref={ref}
        initial={INITIAL}
        animate={ANIMATE}
        transition={transition}
        className={classes}
      >
        {children}
      </motion.div>
    );
  }
);

SpeechBubble.displayName = 'SpeechBubble';

export default memo(SpeechBubble);
