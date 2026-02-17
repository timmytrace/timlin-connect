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
  },
  {
    id: 'proj-7',
    title: 'Identity Management Portal',
    description: 'Enterprise identity and access management system with SSO, multi-factor authentication, and comprehensive audit logging for compliance.',
    technologies: ['React', 'OAuth2', 'LDAP', 'PostgreSQL', 'Redis'],
    status: 'Deployed',
    link: '#'
  },
  {
    id: 'proj-8',
    title: 'AI-Powered Chatbot',
    description: 'Intelligent customer service chatbot with natural language processing, sentiment analysis, and seamless CRM integration for enhanced support.',
    technologies: ['Python', 'TensorFlow', 'Node.js', 'WebSocket', 'MongoDB'],
    status: 'Completed',
    link: '#'
  },
  {
    id: 'proj-9',
    title: 'DevOps Pipeline Suite',
    description: 'Complete CI/CD pipeline solution with automated testing, deployment, rollback capabilities, and infrastructure as code management.',
    technologies: ['Jenkins', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
    status: 'Ongoing',
    link: '#'
  },
  {
    id: 'proj-10',
    title: 'Blockchain Supply Chain',
    description: 'Blockchain-based supply chain tracking system ensuring transparency, authenticity verification, and real-time shipment monitoring.',
    technologies: ['Ethereum', 'Solidity', 'React', 'Node.js', 'IPFS'],
    status: 'In Progress',
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
    <section id="projects" className="section bg-[#0B0E14] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-[#00D1FF] tracking-wide uppercase">Our Portfolio</h2>
          <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EDF3]">
            Projects That Make an Impact
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#8B949E]">
            Explore our diverse portfolio of successful projects spanning web development, cybersecurity, and IT infrastructure.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF] ${
                filter === status
                  ? 'bg-[#2E5BFF] text-white shadow-lg shadow-[#2E5BFF]/50'
                  : 'bg-[#161B22] text-[#8B949E] hover:bg-[#161B22]/80 hover:text-[#00D1FF] border border-[#30363D]'
              }`}
              aria-label={`Filter projects by ${status}`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-[#8B949E] mb-6">
            Have a project in mind? Let's bring your vision to life.
          </p>
          <a
            href="#contact"
            className="inline-block bg-[#2E5BFF] hover:bg-[#2E5BFF]/80 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#2E5BFF]/50 transform hover:scale-105 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D1FF]"
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
