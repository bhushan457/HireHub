
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { recruiterKeywordSuggester } from '@/ai/flows/recruiter-keyword-suggester-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function NewJobPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleGenerateAI = async () => {
    if (!title || !description) {
      toast({
        title: "Incomplete Details",
        description: "Please provide a job title and basic description first.",
        variant: "destructive"
      });
      return;
    }

    setAiLoading(true);
    try {
      const result = await recruiterKeywordSuggester({ jobTitle: title, jobDescription: description });
      setKeywords(result.keywords);
      setSkills(result.skills);
      toast({
        title: "AI Optimized!",
        description: "Keywords and essential skills have been generated based on your content.",
      });
    } catch (error) {
      toast({
        title: "AI Suggestion Failed",
        description: "Could not generate suggestions at this time.",
        variant: "destructive"
      });
    } finally {
      setAiLoading(false);
    }
  };

  const removeTag = (list: string[], setList: (v: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/recruiter/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Post a New Position</h1>
          <p className="text-muted-foreground">Fill out the details below to reach thousands of qualified candidates.</p>
        </header>

        <div className="grid gap-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Core information about the role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Senior Frontend Engineer" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA or Remote" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" placeholder="e.g. $120k - $150k" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Job Description</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:text-accent font-bold gap-2"
                    onClick={handleGenerateAI}
                    disabled={aiLoading}
                  >
                    {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    AI Keyword Tool
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  placeholder="Describe the responsibilities and requirements..." 
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions Card */}
          {(keywords.length > 0 || skills.length > 0) && (
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-accent flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Optimized Fields
                  </CardTitle>
                  <CardDescription>Based on your job description, we recommend these tags for better discoverability.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-xs uppercase font-bold tracking-wider opacity-60">Recommended Keywords</Label>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((tag, i) => (
                      <Badge key={i} className="px-3 py-1 bg-white text-accent hover:bg-white border-accent/20 gap-1 pr-1 cursor-default">
                        {tag}
                        <button onClick={() => removeTag(keywords, setKeywords, i)}>
                          <X className="h-3 w-3 hover:text-destructive transition-colors" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-7 text-xs border border-dashed"><Plus className="h-3 w-3 mr-1" /> Add</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs uppercase font-bold tracking-wider opacity-60">Essential Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((tag, i) => (
                      <Badge key={i} className="px-3 py-1 bg-white text-primary hover:bg-white border-primary/20 gap-1 pr-1 cursor-default">
                        {tag}
                        <button onClick={() => removeTag(skills, setSkills, i)}>
                          <X className="h-3 w-3 hover:text-destructive transition-colors" />
                        </button>
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-7 text-xs border border-dashed"><Plus className="h-3 w-3 mr-1" /> Add</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" size="lg" className="px-12">Cancel</Button>
            <Button size="lg" className="px-12 bg-primary hover:bg-primary/90">Publish Job</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
