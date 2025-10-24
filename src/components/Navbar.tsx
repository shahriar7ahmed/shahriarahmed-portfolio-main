import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FileText, Mail } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: t('nav.home'), icon: Home },
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'projects', label: t('nav.projects'), icon: Briefcase },
    { id: 'cv', label: t('nav.cv'), icon: FileText },
    { id: 'contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b-4 border-primary shadow-panel"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 md:gap-6 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 px-3 py-2 text-sm md:text-base font-semibold hover:text-accent transition-colors focus-manga"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
