import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'jp' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card border-3 border-primary rounded-sm shadow-panel hover:shadow-heavy transition-all focus-manga"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="font-bold text-sm uppercase">
        {i18n.language === 'en' ? 'JP' : 'EN'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
