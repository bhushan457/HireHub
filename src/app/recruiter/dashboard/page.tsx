
"use client";

import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Briefcase, Eye, MoreHorizontal, CheckCircle2, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MOCK_JOBS } from '@/lib/mock-data';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

export default function RecruiterDashboard() {
  // Mock analytics
  const stats = [
    { title: 'Active Jobs', value: '8', icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
    { title: 'Total Applicants', value: '142', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'New Today', value: '12', icon: Plus, color: 'text-green-600 bg-green-50' },
    { title: 'Avg. Views', value: '840', icon: Eye, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Recruiter Workspace</h1>
            <p className="text-muted-foreground">Manage your job postings and evaluate potential candidates.</p>
          </div>
          <Link href="/recruiter/jobs/new">
            <Button size="lg" className="h-12 px-8 gap-2 shadow-lg">
              <Plus className="h-5 w-5" />
              Post New Job
            </Button>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Jobs Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Job Postings</CardTitle>
                <CardDescription>A list of your most recent job listings and their current status.</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-8 font-bold text-primary">Job Title</TableHead>
                  <TableHead className="font-bold text-primary">Status</TableHead>
                  <TableHead className="font-bold text-primary">Applicants</TableHead>
                  <TableHead className="font-bold text-primary">Posted Date</TableHead>
                  <TableHead className="px-8 text-right font-bold text-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_JOBS.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/10 transition-colors">
                    <TableCell className="px-8 py-5">
                      <div className="font-bold text-base">{job.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Briefcase className="h-3 w-3" /> {job.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.status === 'Open' ? 'default' : 'secondary'} className={cn(
                        "rounded-full px-3",
                        job.status === 'Open' ? "bg-green-100 text-green-700 hover:bg-green-100 border-none" : "bg-muted text-muted-foreground"
                      )}>
                        {job.status === 'Open' ? (
                          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" /> Open</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><XCircle className="h-3 w-3" /> Closed</span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">24</span>
                        <span className="text-xs text-muted-foreground">Applicants</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Oct 24, 2024
                    </TableCell>
                    <TableCell className="px-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link href={`/recruiter/jobs/${job.id}/applicants`} className="cursor-pointer">
                              View Applicants
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Edit Listing</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">Delete Job</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
