import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SpeechBubble from './shared/SpeechBubble';
import heroNinjaDev from '@/assets/hero-ninja-dev.png';
import mangaBgTexture from '@/assets/manga-bg-texture.png';

const HERO_ANIM = {
  enterLeft: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' as const } },
  enterRight: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4, type: 'spring' as const } },
  fadeIn: (delay = 0) => ({ opacity: 1, transition: { delay, duration: 0.6 } }),
  float: {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const }
  },
  pulseGlow: {
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.4, 0.2],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
  },
  chevron: { y: [0, 5, 0], transition: { duration: 1.5, repeat: Infinity } }
};

const HeroSectionComponent = () => {
  const { t } = useTranslation();

  const heroCopy = useMemo(
    () => ({
      greeting: t('hero.greeting'),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      scrollPrompt: t('hero.scrollPrompt'),
      ctaProjects: t('hero.ctaProjects'),
      ctaCV: t('hero.ctaCV'),
      ctaContact: t('hero.ctaContact')
    }),
    [t]
  );

  const scrollToId = useCallback((id?: string) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToAbout = useCallback(() => scrollToId('about'), [scrollToId]);

  const ctas = useMemo(
    () => [
      { id: 'projects', label: heroCopy.ctaProjects, className: 'btn-manga', onClick: () => scrollToId('projects') },
      { id: 'cv', label: heroCopy.ctaCV, className: 'btn-manga-outline', onClick: () => scrollToId('cv') },
      { id: 'contact', label: heroCopy.ctaContact, className: 'btn-manga-accent', onClick: () => scrollToId('contact') }
    ],
    [heroCopy.ctaProjects, heroCopy.ctaCV, heroCopy.ctaContact, scrollToId]
  );

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <img src={mangaBgTexture} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
      <div className="absolute inset-0 speed-lines pointer-events-none" />
      <div className="absolute inset-0 halftone-bg pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="text-center lg:text-left" initial={{ opacity: 0, x: -30 }} animate={HERO_ANIM.enterLeft}>
            <SpeechBubble className="inline-block mb-8" delay={0.3}>
              <p className="text-lg font-semibold">{heroCopy.greeting}</p>
            </SpeechBubble>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display mb-4 text-balance"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            >
              {heroCopy.title}
            </motion.h1>

            <motion.div className="relative inline-block mb-12" initial={{ opacity: 0 }} animate={HERO_ANIM.fadeIn(0.8)}>
              <div className="absolute inset-0 bg-accent opacity-10 blur-xl" />
              <h2 className="relative text-2xl md:text-4xl font-display px-6 py-2 border-4 border-primary bg-card inline-block">
                {heroCopy.subtitle}
              </h2>
            </motion.div>

            <motion.div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12" initial={{ opacity: 0, y: 20 }} animate={HERO_ANIM.fadeIn(1)}>
              {ctas.map(({ id, label, className, onClick }) => (
                <button key={id} onClick={onClick} className={className} type="button">
                  {label}
                </button>
              ))}
            </motion.div>

            <motion.div className="inline-block" initial={{ opacity: 0 }} animate={HERO_ANIM.fadeIn(1.5)}>
              <SpeechBubble delay={1.5}>
                <button
                  onClick={scrollToAbout}
                  className="flex items-center gap-2 text-base font-semibold hover:text-accent transition-colors"
                  aria-label={heroCopy.scrollPrompt}
                  type="button"
                >
                  {heroCopy.scrollPrompt}
                  <motion.span animate={HERO_ANIM.chevron}>
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                  </motion.span>
                </button>
              </SpeechBubble>
            </motion.div>
          </motion.div>

          <motion.div className="relative hidden lg:block" initial={{ opacity: 0, x: 30 }} animate={HERO_ANIM.enterRight}>
            <motion.div className="relative" animate={HERO_ANIM.float}>
              <motion.div
                className="absolute inset-0 blur-2xl opacity-30"
                animate={HERO_ANIM.pulseGlow}
                style={{ background: 'radial-gradient(circle, #E11D48 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <img
                src={heroNinjaDev}
                alt="Developer ninja illustration"
                className="w-full h-auto max-w-2xl mx-auto drop-shadow-2xl relative z-10"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary" aria-hidden="true" />
    </section>
  );
};

export default memo(HeroSectionComponent);
