import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import PanelFrame from './shared/PanelFrame';
import SpeechBubble from './shared/SpeechBubble';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  'w-full px-4 py-3 bg-background border-3 border-primary rounded-sm focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2';

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-secondary border-2 border-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all"
    aria-label={label}
  >
    {children}
  </a>
);

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const validateEmail = useCallback((email: string) => {
    // simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: t('contact.errors.missing') ?? 'Missing fields',
          description: t('contact.errors.fillAll') ?? 'Please fill in all fields.',
          variant: 'destructive',
        });
        return;
      }
      if (!validateEmail(formData.email)) {
        toast({
          title: t('contact.errors.invalidEmail') ?? 'Invalid email',
          description: t('contact.errors.validEmail') ?? 'Please enter a valid email address.',
          variant: 'destructive',
        });
        return;
      }

      setIsSubmitting(true);
      try {
        // simulate async submit
        await new Promise<void>((res) => {
          timeoutRef.current = window.setTimeout(() => res(), 1000);
        });

        toast({
          title: t('contact.success') ?? 'Message sent',
          description: t('contact.successDescription') ?? "I'll get back to you soon!",
        });

        setFormData({ name: '', email: '', message: '' });
      } catch {
        toast({
          title: t('contact.errors.submitFailed') ?? 'Submission failed',
          description: t('contact.errors.tryAgain') ?? 'Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
        timeoutRef.current = null;
      }
    },
    [formData, t, toast, validateEmail]
  );

  return (
    <section id="contact" className="relative py-20 bg-background">
      <div className="absolute inset-0 halftone-bg opacity-50" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-card border-4 border-primary rounded-sm shadow-panel">
              <Mail className="w-6 h-6" />
              <h2 className="text-4xl md:text-5xl font-display">{t('contact.title')}</h2>
              <span className="text-2xl font-jp">{t('contact.subtitle')}</span>
            </div>
          </div>

          <SpeechBubble className="inline-block mt-6" delay={0.3}>
            <p className="text-lg">{t('contact.intro')}</p>
          </SpeechBubble>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <PanelFrame>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-manga-accent w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⏳
                    </motion.div>
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-8 border-t-4 border-primary text-center">
              <p className="text-sm font-semibold mb-4">{t('contact.socialLabel')}</p>
              <div className="flex justify-center gap-4">
                <SocialLink href="https://github.com/shahriar7ahmed" label="GitHub">
                  <Github className="w-6 h-6" />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/shahriar-ahmed-405261347/" label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </SocialLink>
                <SocialLink href="mailto:shahriar@example.com" label="Email">
                  <Mail className="w-6 h-6" />
                </SocialLink>
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
