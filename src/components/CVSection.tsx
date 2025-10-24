import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import PanelFrame from './shared/PanelFrame';

const CVSection = () => {
  const { t } = useTranslation();

  // Mock CV download - in production, replace with actual PDF links
  const handleDownload = (lang: 'en' | 'jp') => {
    alert(`Downloading ${lang.toUpperCase()} CV... (This is a demo)`);
  };

  return (
    <section id="cv" className="relative py-20 bg-secondary/30">
      <div className="absolute inset-0 screen-tone" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
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
              <span className="text-2xl font-jp">
                {t('cv.subtitle')}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <PanelFrame>
            {/* CV Preview Area */}
            <div className="relative h-96 mb-8 bg-secondary rounded-sm overflow-hidden border-4 border-primary">
              <div className="absolute inset-0 halftone-bg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl mb-4 opacity-30">📄</div>
                  <p className="text-xl font-display">{t('cv.preview')}</p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="text-center">
              <p className="text-lg font-semibold mb-6">
                {t('cv.selectLanguage')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  onClick={() => handleDownload('en')}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-manga flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('cv.download')} (EN)
                </motion.button>
                <motion.button
                  onClick={() => handleDownload('jp')}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-manga-accent flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('cv.download')} (日本語)
                </motion.button>
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>
    </section>
  );
};

export default CVSection;
