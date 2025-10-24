import { forwardRef, memo, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface PanelFrameProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

const ANIMATION = {
  initial: { opacity: 0, scale: 0.95 } as const,
  whileInView: { opacity: 1, scale: 1 } as const,
  viewport: { once: true, margin: '-100px' } as const,
  transition: { duration: 0.5, type: 'spring', stiffness: 100 } as const,
};

const PanelFrame = memo(
  forwardRef<HTMLDivElement, PanelFrameProps>(({ children, className = '', ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={ANIMATION.initial}
      whileInView={ANIMATION.whileInView}
      viewport={ANIMATION.viewport}
      transition={ANIMATION.transition}
      className={`panel-frame p-6 ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.div>
  ))
);

PanelFrame.displayName = 'PanelFrame';

export default PanelFrame;
