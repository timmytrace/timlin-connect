import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'SecureCloud Platform',
    description: 'Enterprise-grade cloud security solution with real-time threat detection, automated incident response, and comprehensive compliance monitoring for modern businesses.',
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    status: 'Deployed',
    link: '#'
  },
  {
    id: 'proj-2',
    title: 'FinTech Dashboard',
    description: 'Advanced financial analytics and reporting platform featuring real-time market data visualization, portfolio management, and AI-powered investment insights.',
    technologies: ['TypeScript', 'Next.js', 'Python', 'TensorFlow', 'MongoDB'],
    status: 'Completed'
  },
  {
    id: 'proj-3',
    title: 'Network Security Suite',
    description: 'Comprehensive network security toolkit providing vulnerability scanning, penetration testing, and continuous monitoring with detailed audit trails.',
    technologies: ['Python', 'Kali Linux', 'Wireshark', 'Metasploit', 'Splunk'],
    status: 'In Progress',
    link: '#'
  },
  {
    id: 'proj-4',
    title: 'E-Commerce Platform',
    description: 'Full-featured online marketplace with secure payment processing, inventory management, customer analytics, and multi-vendor support.',
    technologies: ['React', 'Django', 'Redis', 'Stripe', 'Elasticsearch'],
    status: 'Deployed',
    link: '#'
  },
  {
    id: 'proj-5',
    title: 'Healthcare Management System',
    description: 'HIPAA-compliant healthcare platform for patient records management, appointment scheduling, telemedicine integration, and insurance processing.',
    technologies: ['Angular', 'Java', 'Spring Boot', 'MySQL', 'Kubernetes'],
    status: 'Completed'
  },
  {
    id: 'proj-6',
    title: 'Infrastructure Monitoring',
    description: 'Real-time IT infrastructure monitoring solution with predictive analytics, automated alerting, and performance optimization recommendations.',
    technologies: ['Go', 'Prometheus', 'Grafana', 'Terraform', 'Ansible'],
    status: 'Ongoing',
    link: '#'
  }
];

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  
  const allStatuses = ['All', 'Deployed', 'Completed', 'In Progress', 'Ongoing'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <section id="projects" className="section bg-slate-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-sky-400 tracking-wide uppercase">Our Portfolio</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
            Projects That Make an Impact
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
            Explore our diverse portfolio of successful projects spanning web development, cybersecurity, and IT infrastructure.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                filter === status
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-sky-400'
              }`}
              aria-label={`Filter projects by ${status}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-300 mb-6">
            Have a project in mind? Let's bring your vision to life.
          </p>
          <a
            href="#contact"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Start your project with us"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
