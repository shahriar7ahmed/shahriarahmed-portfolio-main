import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Footer = memo(() => {
  const { t } = useTranslation('footer');

  return (
    <footer className="relative py-8 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center gap-2 text-sm">
          {t('madeWith')}
          <Heart className="h-4 w-4 fill-accent text-accent animate-pulse" />
          {t('and')} {t('manga')}
        </p>
        <p className="mt-2 text-xs opacity-70">
          © {currentYear} Shahriar. {t('rightsReserved')}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
