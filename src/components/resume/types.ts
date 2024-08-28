export interface ResumeData {
  resumeName?: string;
  createAt?: string;
  lastEdited?: string;
  selectedTemplate?: string;
  
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  profile: string;  
  education: Education[];
  job: Job[];
  skill: Skill[];
  language: Language[];
  certification:Certification[];
  photoURL: string;
  sectionOrder: string[];
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Job {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Certification {
  name: string;
  date: string;
}