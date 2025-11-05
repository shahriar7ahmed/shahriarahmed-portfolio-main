import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const nextLanguage = useMemo(
    () => (currentLanguage === 'en' ? 'jp' : 'en'),
    [currentLanguage],
  );

  const handleToggle = useCallback(() => {
    void i18n.changeLanguage(nextLanguage);
  }, [i18n, nextLanguage]);

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card border-3 border-primary rounded-sm shadow-panel hover:shadow-heavy transition-all focus-manga"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="font-bold text-sm uppercase">{nextLanguage}</span>
    </motion.button>
  );
};

export default memo(LanguageToggle);
