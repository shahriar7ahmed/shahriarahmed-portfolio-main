import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const title = useMemo(
    () => (language === 'en' ? project.title_en : project.title_jp),
    [language, project.title_en, project.title_jp],
  );

  const description = useMemo(
    () => (language === 'en' ? project.description_en : project.description_jp),
    [language, project.description_en, project.description_jp],
  );

  const { techTags, extraCount } = useMemo(() => {
    const techTags = project.tech.slice(0, 3);
    const extraCount = Math.max(project.tech.length - techTags.length, 0);
    return { techTags, extraCount };
  }, [project.tech]);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5, rotateZ: -0.5 }}
      whileTap={{ scale: 0.98 }}
      className="panel-frame p-6 cursor-pointer group h-full flex flex-col"
    >
      <div className="relative h-48 mb-4 bg-secondary rounded-sm overflow-hidden border-2 border-primary">
        <div className="absolute inset-0 halftone-bg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-50">🎴</div>
        </div>
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="text-2xl font-display mb-2 line-clamp-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {techTags.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground border border-primary rounded-sm"
          >
            {tech}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="px-2 py-1 text-xs font-semibold text-muted-foreground">+{extraCount}</span>
        )}
      </div>

      <div className="flex gap-3 pt-3 border-t-2 border-border">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live</span>
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default memo(ProjectCard);
