import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Grid3x3 } from 'lucide-react';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filters = useMemo(
    () => [
      { id: 'all', label: t('projects.filterAll') },
      { id: 'web', label: t('projects.filterWeb') },
      { id: 'ui', label: t('projects.filterUI') },
      { id: 'open-source', label: t('projects.filterOpen') },
    ],
    [t],
  );

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((project) => project.tags.includes(filter));
  }, [filter]);

  const hasResults = filteredProjects.length > 0;

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section id="projects" className="relative py-20 bg-background">
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
              <Grid3x3 className="w-6 h-6" />
              <h2 className="text-4xl md:text-5xl font-display">
                {t('projects.title')}
              </h2>
              <span className="text-2xl font-jp">{t('projects.subtitle')}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {filters.map((filterItem) => {
              const isActive = filter === filterItem.id;
              return (
                <motion.button
                  key={filterItem.id}
                  onClick={() => setFilter(filterItem.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 font-bold border-3 rounded-sm transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {filterItem.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} onClick={() => handleProjectSelect(project)} />
            </motion.div>
          ))}
        </motion.div>

        {!hasResults && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-xl text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={handleModalClose} />
    </section>
  );
};

export default ProjectsSection;
