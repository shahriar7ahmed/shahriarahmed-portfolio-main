import { memo } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import spiralLoading from '@/assets/spiral-loading.png';

const containerProps = {
  initial: { opacity: 1 },
  exit: { opacity: 0 },
  className: 'fixed inset-0 z-50 flex items-center justify-center bg-background',
};

const spinnerProps = {
  animate: { rotate: 360, scale: [1, 1.05, 1] },
  transition: {
    rotate: { duration: 3, repeat: Infinity, ease: 'linear' as const },
    scale: { duration: 2, repeat: Infinity, ease: easeInOut },
  },
  className: 'mb-8 relative',
};

const haloProps = {
  animate: { opacity: [0.5, 1, 0.5] },
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  className: 'absolute inset-0 blur-xl bg-accent/20 rounded-full',
};

const headingProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.3 },
};

const dotAnimation = {
  animate: { opacity: [0.3, 1, 0.3] },
  transition: { duration: 1.5, repeat: Infinity } as const,
  className: 'w-2 h-2 rounded-full bg-accent',
};

const LoadingScreen = memo(() => {
  const { t } = useTranslation();

  return (
    <motion.div {...containerProps}>
      <div className="text-center">
        <motion.div {...spinnerProps}>
          <motion.div {...haloProps} />
          <img src={spiralLoading} alt={t('loading.alt', { defaultValue: 'Loading' })} className="w-32 h-32 mx-auto relative z-10" />
        </motion.div>

        <motion.div {...headingProps}>
          <h2 className="text-3xl font-display mb-2">{t('loading.page')}</h2>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                {...dotAnimation}
                transition={{ ...dotAnimation.transition, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default LoadingScreen;
