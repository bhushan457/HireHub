'use server';
/**
 * @fileOverview An AI tool for recruiters to suggest relevant keywords and skills based on the job title and description.
 *
 * - recruiterKeywordSuggester - A function that handles the keyword and skill suggestion process.
 * - RecruiterKeywordSuggesterInput - The input type for the recruiterKeywordSuggester function.
 * - RecruiterKeywordSuggesterOutput - The return type for the recruiterKeywordSuggester function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecruiterKeywordSuggesterInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job posting.'),
  jobDescription: z.string().describe('The detailed description of the job posting.'),
});
export type RecruiterKeywordSuggesterInput = z.infer<typeof RecruiterKeywordSuggesterInputSchema>;

const RecruiterKeywordSuggesterOutputSchema = z.object({
  keywords: z.array(z.string()).describe('A list of suggested keywords for the job posting to improve discoverability.'),
  skills: z.array(z.string()).describe('A list of suggested essential skills required for the job position.'),
});
export type RecruiterKeywordSuggesterOutput = z.infer<typeof RecruiterKeywordSuggesterOutputSchema>;

export async function recruiterKeywordSuggester(input: RecruiterKeywordSuggesterInput): Promise<RecruiterKeywordSuggesterOutput> {
  return recruiterKeywordSuggesterFlow(input);
}

const recruiterKeywordSuggesterPrompt = ai.definePrompt({
  name: 'recruiterKeywordSuggesterPrompt',
  input: {schema: RecruiterKeywordSuggesterInputSchema},
  output: {schema: RecruiterKeywordSuggesterOutputSchema},
  prompt: `You are an expert HR and recruitment assistant. Your task is to analyze a given job title and job description and extract highly relevant keywords and skills that would help the job posting be more discoverable by suitable candidates.

Provide the output in JSON format with two arrays: 'keywords' and 'skills'.

Job Title: {{{jobTitle}}}
Job Description: {{{jobDescription}}}`,
});

const recruiterKeywordSuggesterFlow = ai.defineFlow(
  {
    name: 'recruiterKeywordSuggesterFlow',
    inputSchema: RecruiterKeywordSuggesterInputSchema,
    outputSchema: RecruiterKeywordSuggesterOutputSchema,
  },
  async input => {
    const {output} = await recruiterKeywordSuggesterPrompt(input);
    return output!;
  }
);
