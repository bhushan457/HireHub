
"use client";

import { use, useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Building2, 
  Clock, 
  ArrowLeft, 
  Briefcase, 
  Globe, 
  DollarSign, 
  Calendar,
  ChevronRight,
  Share2,
  Bookmark,
  Users,
  Loader2
} from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mock-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);
  
  const firestore = useFirestore();
  const jobRef = useMemoFirebase(() => doc(firestore, 'jobs', id), [firestore, id]);
  const { data: firestoreJob, isLoading } = useDoc(jobRef);
  
  // Use firestore job if found, else fallback to mock for prototype
  const job = firestoreJob || MOCK_JOBS.find(j => j.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary opacity-20" />
          <p className="mt-4 text-muted-foreground font-medium">Loading job details...</p>
        </main>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold">Job not found</h2>
          <p className="text-muted-foreground mt-2">The position you are looking for may have been removed.</p>
          <Link href="/jobs">
            <Button className="mt-8">Browse Other Jobs</Button>
          </Link>
        </main>
      </div>
    );
  }

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      toast({
        title: "Application Sent!",
        description: `You have successfully applied for ${job.title} at ${job.company}.`,
      });
      router.push('/applications');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to all jobs
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Job Info */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary flex-shrink-0 border">
                      <Building2 className="h-8 w-8 opacity-40" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold font-headline text-primary mb-1">{job.title}</h1>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="font-semibold text-foreground">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-muted/30 border">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Salary Range</p>
                    <p className="font-bold text-primary flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> {job.salary}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Job Type</p>
                    <p className="font-bold text-primary flex items-center gap-1">
                      <Briefcase className="h-4 w-4" /> {job.type}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Posted</p>
                    <p className="font-bold text-primary flex items-center gap-1">
                      <Clock className="h-4 w-4" /> 2 days ago
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Work Setting</p>
                    <p className="font-bold text-primary flex items-center gap-1">
                      <Globe className="h-4 w-4" /> {job.type === 'Remote' ? 'Fully Remote' : 'On-site'}
                    </p>
                  </div>
                </div>

                <div className="mt-12 prose prose-indigo max-w-none">
                  <h3 className="text-xl font-bold mb-4">Job Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                  
                  {job.requirements && job.requirements.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mt-8 mb-4">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </>
                  )}

                  <h3 className="text-xl font-bold mt-8 mb-4">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 font-medium bg-primary/10 text-primary border-none">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none shadow-lg bg-white overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Application closes in 14 days</p>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-2/3"></div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full h-12 text-lg font-bold" 
                    onClick={handleApply}
                    disabled={applying}
                  >
                    {applying ? "Applying..." : "Apply Now"}
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-lg font-bold">
                    Save for Later
                  </Button>
                  
                  <div className="pt-4 border-t text-center">
                    <p className="text-xs text-muted-foreground">
                      By applying, you agree to HireHub's <Link href="#" className="underline">Terms of Service</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About {job.company}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.company} is a leading global technology company focused on digital transformation and innovative software solutions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>500-1,000 Employees</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded in 2012</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full justify-start text-accent hover:text-accent font-semibold p-0">
                    View Company Profile <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
