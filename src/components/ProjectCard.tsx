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
  const title = i18n.language === 'en' ? project.title_en : project.title_jp;
  const description = i18n.language === 'en' ? project.description_en : project.description_jp;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5, rotateZ: -0.5 }}
      whileTap={{ scale: 0.98 }}
      className="panel-frame p-6 cursor-pointer group h-full flex flex-col"
    >
      {/* Placeholder Image Area with Halftone */}
      <div className="relative h-48 mb-4 bg-secondary rounded-sm overflow-hidden border-2 border-primary">
        <div className="absolute inset-0 halftone-bg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-50">🎴</div>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-display mb-2 line-clamp-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
        {description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground border border-primary rounded-sm"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      {/* Quick Links */}
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

export default ProjectCard;
