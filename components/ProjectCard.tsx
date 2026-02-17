import React, { useState } from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusColors = {
    'Completed': 'bg-green-500/20 text-green-400 border-green-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Ongoing': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    'Deployed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  };

  return (
    <div 
      className={`relative p-6 rounded-lg shadow-xl transition-all duration-300 transform h-full flex flex-col group border border-[#30363D] ${
        isHovered ? 'glass-effect hover:border-[#00D1FF] -translate-y-1' : 'bg-[#161B22]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Base State: Always visible */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-[#E6EDF3] flex-1">{project.title}</h3>
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-12 h-12 rounded object-cover ml-3 opacity-50"
            />
          )}
        </div>
        
        {/* Hover Reveal: Description, Tech Stack, Status, CTA */}
        <div className={`transition-all duration-300 ${
          isHovered ? 'opacity-100 max-h-[600px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          <p className="text-[#8B949E] text-sm leading-relaxed mb-4">{project.description}</p>
          
          {/* Technology Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2.5 py-1 bg-[#0B0E14] text-[#00D1FF] rounded-md text-xs font-medium border border-[#30363D]"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Status Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          
          {/* CTA Button */}
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF] text-sm"
            >
              View Project 
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
