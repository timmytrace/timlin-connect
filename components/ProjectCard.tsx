import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusColors = {
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Ongoing': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'Deployed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div className="relative bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-sky-500/30 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col group border border-transparent hover:border-sky-500 focus-within:border-sky-400">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-slate-100 flex-1">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]} ml-2 whitespace-nowrap`}>
            {project.status}
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-slate-700/50 text-sky-300 rounded text-xs font-medium border border-slate-600/50"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sky-400 hover:text-sky-300 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
            >
              View Project 
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
