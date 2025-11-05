import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import PanelFrame from './shared/PanelFrame';
import { skills } from '@/data/projects';
import { Sparkles } from 'lucide-react';

const VIEWPORT = { once: true };
const SHARED_IN_VIEW = { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT } as const;
const TIMELINE_SEGMENTS = [1, 2, 3] as const;

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
  const { t, i18n } = useTranslation();

  const content = useMemo(() => {
    const timeline = TIMELINE_SEGMENTS.map((id, index) => ({
      id,
      title: t(`about.timeline.chapter${id}`),
      desc: t(`about.timeline.chapter${id}Desc`),
      delay: (index + 1) * 0.05,
    }));

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
  }, [i18n.language, t]);

  return (
    <section id="about" className="relative py-20 bg-secondary/30">
      <div className="absolute inset-0 screen-tone" />

      <div className="relative container mx-auto px-4">
        <motion.div {...SHARED_IN_VIEW} variants={fadeUp} className="text-center mb-16">
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

            <motion.div className="flex flex-wrap gap-2" {...SHARED_IN_VIEW} variants={containerStagger}>
              {skills.map((skill) => (
                <motion.span key={skill} variants={tagVariant} className="tag-manga">
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </PanelFrame>
        </div>

        <motion.div {...SHARED_IN_VIEW} variants={fadeUp} className="mt-12 max-w-4xl mx-auto">
          <PanelFrame>
            <h3 className="text-2xl font-display mb-6 text-center">Journey Timeline 📖</h3>
            <div className="space-y-6">
              {content.timeline.map((item) => (
                <motion.div
                  key={item.id}
                  {...SHARED_IN_VIEW}
                  variants={slideInLeft}
                  transition={{ delay: item.delay }}
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
