'use server';

/**
 * @fileOverview An AI agent that recommends past projects based on customer input.
 *
 * - recommendProjects - A function that recommends past projects.
 * - RecommendProjectsInput - The input type for the recommendProjects function.
 * - RecommendProjectsOutput - The return type for the recommendProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProjectsInputSchema = z.object({
  projectRequirements: z
    .string()
    .describe('The customer project requirements and preferences.'),
});
export type RecommendProjectsInput = z.infer<typeof RecommendProjectsInputSchema>;

const RecommendProjectsOutputSchema = z.object({
  recommendedProjects: z
    .array(z.string())
    .describe('An array of recommended past projects based on the input requirements.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the project recommendations.'),
});
export type RecommendProjectsOutput = z.infer<typeof RecommendProjectsOutputSchema>;

export async function recommendProjects(input: RecommendProjectsInput): Promise<RecommendProjectsOutput> {
  return recommendProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProjectsPrompt',
  input: {schema: RecommendProjectsInputSchema},
  output: {schema: RecommendProjectsOutputSchema},
  prompt: `You are an expert design consultant specializing in recommending past projects based on customer requirements.

You will use the customer's project requirements to recommend relevant past projects.
Explain the reasoning behind your recommendations in the reasoning output field.

Customer Requirements: {{{projectRequirements}}}`,
});

const recommendProjectsFlow = ai.defineFlow(
  {
    name: 'recommendProjectsFlow',
    inputSchema: RecommendProjectsInputSchema,
    outputSchema: RecommendProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
