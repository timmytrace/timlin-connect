
export interface ServiceItem {
  id: string;
  icon?: React.ReactNode; // Allow for SVG icons or similar
  title: string;
  description: string;
}

// Define and export the Creature interface
export interface Creature {
  name: string;
  description: string;
  habitat: string;
  abilities: string;
  imageUrl?: string; // Optional, as it's generated in a separate step
}

// Define and export the Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Ongoing' | 'Deployed';
  link?: string;
  imageUrl?: string;
}
