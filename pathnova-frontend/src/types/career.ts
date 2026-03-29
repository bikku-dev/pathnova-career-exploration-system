export interface Career {
  id: number;
  title: string;
  description: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  demandLevel: string;
  difficulty: string;
  technologies: string[];
}