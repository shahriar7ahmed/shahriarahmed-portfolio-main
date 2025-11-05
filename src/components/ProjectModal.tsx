import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en';
  const title = useMemo(
    () => (project ? (isEnglish ? project.title_en : project.title_jp) : ''),
    [project, isEnglish]
  );
  const description = useMemo(
    () => (project ? (isEnglish ? project.description_en : project.description_jp) : ''),
    [project, isEnglish]
  );

  return (
    <AnimatePresence>
      {project ? (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            aria-hidden
          />

          {/* Modal */}
            {(() => {
            const normalizeLinks = (input: unknown, fallbackLabel: string) => {
              if (!input) return [];
              const list = Array.isArray(input) ? input : [input];
              return list
              .map((item, index) => {
                if (typeof item === 'string') {
                return { key: `${fallbackLabel}-${index}`, url: item, label: fallbackLabel };
                }
                if (typeof item === 'object' && item && 'url' in item) {
                const obj = item as { url?: string; label?: string; key?: string };
                return obj.url
                  ? {
                    key: obj.key ?? `${obj.url}-${index}`,
                    url: obj.url,
                    label: obj.label ?? fallbackLabel,
                  }
                  : null;
                }
                return null;
              })
              .filter(
                (value): value is { key: string; url: string; label: string } => Boolean(value)
              );
            };

            const liveLinks = normalizeLinks(project.liveUrl, t('projects.liveDemo'));
            const sourceLinks = normalizeLinks(project.sourceUrl, t('projects.sourceCode'));

            return (
              <motion.div
              key={`modal-${project.id ?? 'project'}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-4 md:inset-12 lg:inset-24 z-50 overflow-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              >
              <div className="panel-frame bg-card p-6 md:p-8 min-h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <h2 id="project-modal-title" className="text-3xl md:text-4xl font-display mb-2">
                  {title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                    key={tag}
                    className="px-2 py-1 text-xs uppercase font-bold bg-secondary border border-border rounded-sm"
                    >
                    {tag}
                    </span>
                  ))}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 hover:bg-secondary rounded-sm transition-colors focus-manga"
                  aria-label={t('projects.closeModal')}
                >
                  <X className="w-6 h-6" />
                </button>
                </div>

                {/* Image Placeholder */}
                <div className="relative h-64 md:h-96 mb-6 bg-secondary rounded-sm overflow-hidden border-4 border-primary">
                <div className="absolute inset-0 halftone-bg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl opacity-30">🎴</div>
                </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                <p className="text-lg leading-relaxed">{description}</p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                <h3 className="text-xl font-display mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  {t('projects.techStack')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                  <span key={tech} className="tag-manga">
                    {tech}
                  </span>
                  ))}
                </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-6 border-t-4 border-primary">
                {liveLinks.map(({ key, url, label }) => (
                  <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-manga-accent flex items-center gap-2"
                  >
                  <ExternalLink className="w-5 h-5" />
                  {label}
                  </a>
                ))}
                {sourceLinks.map(({ key, url, label }) => (
                  <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-manga-outline flex items-center gap-2"
                  >
                  <Github className="w-5 h-5" />
                  {label}
                  </a>
                ))}
                <button onClick={onClose} className="btn-manga">
                  {t('projects.closeModal')}
                </button>
                </div>
              </div>
              </motion.div>
            );
            })()}
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default React.memo(ProjectModal);
