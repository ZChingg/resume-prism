export interface ResumeData {
  resumeName?: string;
  createAt?: string;
  lastEdited?: string;
  selectedTemplate?: string;
  selectedColor?: string;
  
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  profile: string;  
  education: Education[];
  job: Job[];
  skill: Skill[];  
  photoURL: string;
  sectionOrder: string[];

  language?: Language[];
  certification?: Certification[];
  hobby?: string[] | string;
  award?: Award[]; 
  [key: string]: any;
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
  proficiency: string;
  certificate: string;
  level: string;
}

export interface Certification {
  name: string;
  date: string;
}

export interface Hobby {
  name: string;
}

export interface Award {
  name: string;
  date: string;
  description: string;
}