
export type UserRole = 'job_seeker' | 'recruiter' | 'admin';

export interface UserProfile {
  name: string;
  bio?: string;
  skills: string[];
  experience: string;
  resumeUrl?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: UserProfile;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  salary?: string;
  status: 'Open' | 'Closed';
  recruiterId: string;
  createdAt: string;
  keywords: string[];
  skills: string[];
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'Pending' | 'Reviewing' | 'Accepted' | 'Rejected';
  appliedAt: string;
  resumeUrl?: string;
  jobTitle?: string; // Denormalized for display
  company?: string; // Denormalized for display
}
