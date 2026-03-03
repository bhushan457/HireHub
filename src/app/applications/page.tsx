
"use client";

import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LayoutDashboard, Clock, CheckCircle2, XCircle, AlertCircle, Building2, Loader2 } from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function ApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'jobApplications'), where('jobSeekerId', '==', user.uid));
  }, [firestore, user]);

  const { data: firestoreApplications, isLoading } = useCollection(applicationsQuery);

  const mockApplications = [
    { id: 'app_1', jobId: 'job_1', status: 'Reviewing', appliedAt: '2 days ago' },
    { id: 'app_2', jobId: 'job_2', status: 'Accepted', appliedAt: '1 week ago' },
    { id: 'app_3', jobId: 'job_3', status: 'Pending', appliedAt: 'Today' }
  ];

  const applications = firestoreApplications && firestoreApplications.length > 0 ? firestoreApplications : mockApplications;

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'Accepted': return { icon: CheckCircle2, class: 'text-green-600 bg-green-50' };
      case 'Rejected': return { icon: XCircle, class: 'text-red-600 bg-red-50' };
      case 'Reviewing': return { icon: AlertCircle, class: 'text-blue-600 bg-blue-50' };
      default: return { icon: Clock, class: 'text-orange-600 bg-orange-50' };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Application Tracking</h1>
          <p className="text-muted-foreground">Keep track of your journey and professional growth.</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Stats Summary */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Applied</p>
                    <p className="text-3xl font-bold">{applications.length}</p>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full">
                    <div className="h-full bg-primary w-3/4 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Active</p>
                      <p className="text-lg font-bold">5</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rejected</p>
                      <p className="text-lg font-bold">2</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold">Next Step Recommendation</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Your resume has high engagement from tech companies. Consider adding "System Design" keywords.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="bg-white border p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg px-8">All Applications</TabsTrigger>
                <TabsTrigger value="active" className="rounded-lg px-8">Active</TabsTrigger>
                <TabsTrigger value="closed" className="rounded-lg px-8">Archive</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {isLoading ? (
                  <div className="py-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary opacity-20" />
                    <p className="mt-4 text-muted-foreground">Loading applications...</p>
                  </div>
                ) : applications.map((app) => {
                  const job = MOCK_JOBS.find(j => j.id === app.jobId);
                  const statusInfo = getStatusInfo(app.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <Card key={app.id} className="hover:shadow-md transition-all overflow-hidden border-none shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-primary flex-shrink-0">
                              <Building2 className="h-6 w-6 opacity-30" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">{job?.title || 'Unknown Position'}</h3>
                              <p className="text-sm text-muted-foreground">{job?.company || 'Company'} • Applied {app.appliedAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                              statusInfo.class
                            )}>
                              <StatusIcon className="h-4 w-4" />
                              {app.status}
                            </div>
                            <button className="text-primary text-sm font-bold hover:underline">
                              View Details
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
