import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, MotionProps } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import PanelFrame from './shared/PanelFrame';

type LangCode = 'en' | 'jp';

const BUTTONS: Array<{
  code: LangCode;
  label: string;
  className: string;
}> = [
  { code: 'en', label: '(EN)', className: 'btn-manga' },
  { code: 'jp', label: '(日本語)', className: 'btn-manga-accent' },
];

const buttonMotion: MotionProps = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.95 },
};

const CVSection = () => {
  const { t } = useTranslation();

  const handleDownload = useCallback((lang: LangCode) => {
    alert(`Downloading ${lang.toUpperCase()} CV... (This is a demo)`);
  }, []);

  return (
    <section id="cv" className="relative py-20 bg-secondary/30">
      <div className="absolute inset-0 screen-tone" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-card border-4 border-primary rounded-sm shadow-panel">
              <FileText className="w-6 h-6" />
              <h2 className="text-4xl md:text-5xl font-display">
                {t('cv.title')}
              </h2>
              <span className="text-2xl font-jp">{t('cv.subtitle')}</span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <PanelFrame>
            <div className="relative h-96 mb-8 bg-secondary rounded-sm overflow-hidden border-4 border-primary">
              <div className="absolute inset-0 halftone-bg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-4 opacity-30">📄</div>
                  <p className="text-xl font-display">{t('cv.preview')}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold mb-6">
                {t('cv.selectLanguage')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {BUTTONS.map(({ code, label, className }) => (
                  <motion.button
                    key={code}
                    {...buttonMotion}
                    onClick={() => handleDownload(code)}
                    className={`${className} flex items-center gap-2`}
                  >
                    <Download className="w-5 h-5" />
                    {t('cv.download')} {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>
    </section>
  );
};

export default CVSection;
