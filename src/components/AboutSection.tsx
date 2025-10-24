import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import PanelFrame from './shared/PanelFrame';
import { skills } from '@/data/projects';
import { Sparkles } from 'lucide-react';

const VIEWPORT = { once: true };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const tagVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  // Batch translations to avoid repeated t() calls on each render/map
  const content = useMemo(() => {
    const timeline = Array.from({ length: 3 }, (_, i) => {
      const id = i + 1;
      return {
        title: t(`about.timeline.chapter${id}`),
        desc: t(`about.timeline.chapter${id}Desc`),
      };
    });

    return {
      title: t('about.title'),
      subtitle: t('about.subtitle'),
      heading: t('about.heading'),
      role: t('about.role'),
      roleJP: t('about.roleJP'),
      intro: t('about.intro'),
      abilitiesTitle: t('about.abilitiesTitle'),
      timeline,
    };
  }, [t]);

  return (
    <section id="about" className="relative py-20 bg-secondary/30">
      <div className="absolute inset-0 screen-tone" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-card border-4 border-primary rounded-sm shadow-panel">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-4xl md:text-5xl font-display">{content.title}</h2>
              <span className="text-2xl font-jp">{content.subtitle}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <PanelFrame>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center rounded-full text-2xl">
                👋
              </div>
              <div>
                <h3 className="text-2xl font-display">{content.heading}</h3>
                <p className="text-sm text-muted-foreground">
                  {content.role} | {content.roleJP}
                </p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">{content.intro}</p>
          </PanelFrame>

          <PanelFrame>
            <h3 className="text-2xl font-display mb-4 flex items-center gap-2">
              <span>✨</span>
              {content.abilitiesTitle}
            </h3>

            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={containerStagger}
            >
              {skills.map((skill) => (
                <motion.span key={skill} variants={tagVariant} className="tag-manga">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </PanelFrame>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mt-12 max-w-4xl mx-auto"
        >
          <PanelFrame>
            <h3 className="text-2xl font-display mb-6 text-center">Journey Timeline 📖</h3>
            <div className="space-y-6">
              {content.timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  variants={slideInLeft}
                  transition={{ delay: (idx + 1) * 0.05 }}
                  className="border-l-4 border-primary pl-6 py-2"
                >
                  <h4 className="text-xl font-display mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </PanelFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(AboutSection);
