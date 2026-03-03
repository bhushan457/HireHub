
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Building2, Clock, Filter, Briefcase, ChevronRight } from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mock-data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'All' || job.type === activeType;
    return matchesSearch && matchesType;
  });

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Search and Filters */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search job title, keywords or company..." 
                  className="pl-10 h-12 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Find Jobs
              </Button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex items-center gap-2 text-sm font-medium mr-4 text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filters:
              </div>
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    activeType === type 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-white border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Showing {filteredJobs.length} Jobs</h2>
                <div className="text-sm text-muted-foreground">
                  Sorted by: <span className="font-medium text-primary cursor-pointer">Newest</span>
                </div>
              </div>

              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="group hover:border-primary/50 transition-all hover:shadow-md cursor-pointer overflow-hidden border-l-4 border-l-transparent hover:border-l-accent">
                    <Link href={`/jobs/${job.id}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-primary flex-shrink-0">
                            <Building2 className="h-8 w-8 opacity-40" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                  {job.company}
                                </p>
                              </div>
                              <Badge variant="secondary" className="bg-primary/5 text-primary border-none">{job.type}</Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 2 days ago</span>
                              <span className="font-medium text-foreground">{job.salary}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              {job.skills.map((skill, i) => (
                                <Badge key={i} variant="outline" className="font-normal text-[11px] h-5">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="hidden md:flex flex-col items-end justify-center h-full self-center">
                             <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                <ChevronRight className="h-5 w-5" />
                             </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <h3 className="text-xl font-bold">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(''); setActiveType('All'); }}>Clear All Filters</Button>
                </div>
              )}
            </div>

            {/* Sidebar Suggestions */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-primary text-primary-foreground overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Profile Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-primary-foreground/80 leading-relaxed">
                    Based on your skills in <b>React, TypeScript and Tailwind</b>, we found 12 jobs that match your profile perfectly.
                  </p>
                  <Button variant="secondary" className="w-full">Improve My Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Companies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Google', 'Netflix', 'TechCorp', 'Meta'].map((name) => (
                    <div key={name} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-muted" />
                        <span className="text-sm font-medium group-hover:text-primary">{name}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px]">10+ jobs</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
