
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
