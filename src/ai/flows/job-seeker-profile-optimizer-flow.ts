'use server';
/**
 * @fileOverview An AI tool for job seekers to optimize their profile based on desired job types.
 *
 * - jobSeekerProfileOptimizer - A function that handles the profile optimization process.
 * - JobSeekerProfileOptimizerInput - The input type for the jobSeekerProfileOptimizer function.
 * - JobSeekerProfileOptimizerOutput - The return type for the jobSeekerProfileOptimizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSeekerProfileOptimizerInputSchema = z.object({
  currentSkills: z
    .array(z.string())
    .describe('A list of the job seeker\'s current skills.'),
  experience: z
    .string()
    .describe('A detailed description of the job seeker\'s work experience and accomplishments.'),
  desiredJobTypes: z
    .array(z.string())
    .describe('A list of job types or roles the job seeker is interested in.'),
});
export type JobSeekerProfileOptimizerInput = z.infer<
  typeof JobSeekerProfileOptimizerInputSchema
>;

const JobSeekerProfileOptimizerOutputSchema = z.object({
  suggestedKeywords: z
    .array(z.string())
    .describe(
      'A list of keywords and phrases relevant to the desired job types that the job seeker should include in their profile.'
    ),
  profileImprovements: z
    .string()
    .describe(
      'Specific suggestions for improving the job seeker\'s profile, focusing on experience and how to articulate skills better.'
    ),
  mostRelevantSkills: z
    .array(z.string())
    .describe(
      'A prioritized list of skills from the current profile that are most relevant to the desired job types.'
    ),
});
export type JobSeekerProfileOptimizerOutput = z.infer<
  typeof JobSeekerProfileOptimizerOutputSchema
>;

export async function jobSeekerProfileOptimizer(
  input: JobSeekerProfileOptimizerInput
): Promise<JobSeekerProfileOptimizerOutput> {
  return jobSeekerProfileOptimizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobSeekerProfileOptimizerPrompt',
  input: {schema: JobSeekerProfileOptimizerInputSchema},
  output: {schema: JobSeekerProfileOptimizerOutputSchema},
  prompt: `You are an AI assistant specialized in career coaching and resume optimization.
Your task is to analyze a job seeker's current profile, including their skills and experience, and compare it against their desired job types. Based on this analysis, provide concrete suggestions for improving their profile and identify key skills and keywords they should highlight to increase their visibility to recruiters.

Current Skills: {{{currentSkills}}}

Experience: {{{experience}}}

Desired Job Types: {{{desiredJobTypes}}}

Carefully review the provided information and generate:
1. A list of suggested keywords that are highly relevant to the desired job types and should be incorporated into the job seeker's profile.
2. Specific, actionable advice on how to improve the profile description, particularly regarding the experience section, to better match the desired roles.
3. A prioritized list of skills from their *current* skills that are most crucial for the desired job types.
`,
});

const jobSeekerProfileOptimizerFlow = ai.defineFlow(
  {
    name: 'jobSeekerProfileOptimizerFlow',
    inputSchema: JobSeekerProfileOptimizerInputSchema,
    outputSchema: JobSeekerProfileOptimizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
