'use server';
/**
 * @fileOverview Provides a Genkit flow to generate a concise summary of a job description,
 * highlighting key responsibilities and required qualifications.
 *
 * - jobDescriptionQuickSummary - A function that handles the job description summarization process.
 * - JobDescriptionQuickSummaryInput - The input type for the jobDescriptionQuickSummary function.
 * - JobDescriptionQuickSummaryOutput - The return type for the jobDescriptionQuickSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JobDescriptionQuickSummaryInputSchema = z.object({
  jobDescription: z.string().describe('The full job description text.'),
});
export type JobDescriptionQuickSummaryInput = z.infer<typeof JobDescriptionQuickSummaryInputSchema>;

const JobDescriptionQuickSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the job description.'),
  responsibilities: z.array(z.string()).describe('A list of key responsibilities for the role.'),
  qualifications: z.array(z.string()).describe('A list of required qualifications for the role.'),
});
export type JobDescriptionQuickSummaryOutput = z.infer<typeof JobDescriptionQuickSummaryOutputSchema>;

export async function jobDescriptionQuickSummary(input: JobDescriptionQuickSummaryInput): Promise<JobDescriptionQuickSummaryOutput> {
  return jobDescriptionQuickSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobDescriptionQuickSummaryPrompt',
  input: { schema: JobDescriptionQuickSummaryInputSchema },
  output: { schema: JobDescriptionQuickSummaryOutputSchema },
  prompt: `You are an AI assistant specialized in analyzing job descriptions.

Your task is to provide a concise summary of the given job description, and extract the key responsibilities and required qualifications.

Job Description:
{{{jobDescription}}}`,
});

const jobDescriptionQuickSummaryFlow = ai.defineFlow(
  {
    name: 'jobDescriptionQuickSummaryFlow',
    inputSchema: JobDescriptionQuickSummaryInputSchema,
    outputSchema: JobDescriptionQuickSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
