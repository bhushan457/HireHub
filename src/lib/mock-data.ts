
import { JobPosting, User } from './types';

export const MOCK_USER: User = {
  id: 'user_1',
  email: 'john@example.com',
  role: 'job_seeker',
  profile: {
    name: 'John Doe',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    experience: '3 years as a Frontend Developer specializing in React ecosystems.',
    resumeUrl: 'https://example.com/resume.pdf'
  }
};

export const MOCK_RECRUITER: User = {
  id: 'recruiter_1',
  email: 'hr@techcorp.com',
  role: 'recruiter',
};

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'job_1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'We are looking for a senior frontend engineer with deep React expertise...',
    salary: '$140k - $180k',
    status: 'Open',
    recruiterId: 'recruiter_1',
    createdAt: new Date().toISOString(),
    keywords: ['React', 'TypeScript', 'Frontend'],
    skills: ['React', 'Next.js', 'Testing Library']
  },
  {
    id: 'job_2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Remote',
    description: 'Join our design team to build world-class user interfaces...',
    salary: '$100k - $130k',
    status: 'Open',
    recruiterId: 'recruiter_2',
    createdAt: new Date().toISOString(),
    keywords: ['UI', 'UX', 'Figma'],
    skills: ['Figma', 'Prototyping', 'User Research']
  },
  {
    id: 'job_3',
    title: 'Backend Developer (Node.js)',
    company: 'Fintech Solutions',
    location: 'London, UK',
    type: 'Contract',
    description: 'Develop secure and scalable APIs for our financial platform...',
    salary: '£500 - £700 / day',
    status: 'Open',
    recruiterId: 'recruiter_1',
    createdAt: new Date().toISOString(),
    keywords: ['Node.js', 'MongoDB', 'Backend'],
    skills: ['Node.js', 'Express', 'Redis']
  }
];
