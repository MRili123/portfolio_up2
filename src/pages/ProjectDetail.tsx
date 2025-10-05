import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export function ProjectDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching project:', error);
    } else if (data) {
      setProject(data);
      fetchRelatedProjects(data.category, data.id);
    }
    setLoading(false);
  };

  const fetchRelatedProjects = async (category: string, currentId: string) => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .neq('id', currentId)
      .limit(3);

    if (data) {
      setRelatedProjects(data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Project not found
          </h1>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700">
            {t('projects.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16 transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('projects.backToHome')}
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl transition-colors">
            <div className="relative h-96 overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full">
                {project.category}
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-8">
                {project.completion_date && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Calendar size={18} />
                    <span>{new Date(project.completion_date).toLocaleDateString()}</span>
                  </div>
                )}
                {project.client && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <User size={18} />
                    <span>{project.client}</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {t('projects.overview')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.full_description || project.description}
                </p>
              </div>

              {project.video_demo_url && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {t('projects.videoDemo')}
                  </h2>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={project.video_demo_url}
                      title={`${project.title} demo`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {t('projects.technologies')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-base font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.key_features && project.key_features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {t('projects.features')}
                  </h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {project.key_features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                      >
                        <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.challenges && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {t('projects.challenges')}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {t('projects.links')}
                </h2>
                <div className="flex flex-wrap gap-4">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      {t('projects.demo')}
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <Github size={20} />
                      {t('projects.code')}
                    </a>
                  )}
                  {project.live_url && project.live_url !== '#' && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                {t('projects.relatedProjects')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Link
                    key={relatedProject.id}
                    to={`/projects/${relatedProject.id}`}
                    className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedProject.image_url}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
