import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative py-8 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm">
          {t('footer.madeWith')}
          <Heart className="w-4 h-4 fill-accent text-accent animate-pulse" />
          {t('footer.and')} {t('footer.manga')}
        </p>
        <p className="mt-2 text-xs opacity-70">
          © {new Date().getFullYear()} Shahriar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
