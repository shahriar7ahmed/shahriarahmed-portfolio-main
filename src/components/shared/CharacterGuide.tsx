import React, { ReactNode, useMemo, memo } from 'react';
import { motion, Variants } from 'framer-motion';

interface CharacterGuideProps {
  side: 'left' | 'right';
  children?: ReactNode;
  className?: string;
}

const ENTRY_TRANSITION = { type: 'spring' as const, stiffness: 140, damping: 16, delay: 0.12 };
const FLOAT_ANIMATION = { y: [0, -10, 0] };
const FLOAT_TRANSITION = { duration: 3, repeat: Infinity, ease: 'easeInOut' } as const;

const CharacterGuide: React.FC<CharacterGuideProps> = ({ side, children, className = '' }) => {
  const variants = useMemo<Variants>(
    () => ({
      hidden: { x: side === 'left' ? -60 : 60, opacity: 0 },
      show: { x: 0, opacity: 1, transition: ENTRY_TRANSITION },
    }),
    [side]
  );

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className={`fixed ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-30 hidden lg:block ${className}`}
    >
      <motion.div animate={FLOAT_ANIMATION} transition={FLOAT_TRANSITION}>
        {children}
      </motion.div>
    </motion.div>
  );
};

CharacterGuide.displayName = 'CharacterGuide';
export default memo(CharacterGuide);
