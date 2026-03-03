
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Search, Users, Sparkles, Building2, Globe } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                  <Sparkles className="h-4 w-4" />
                  <span>Empowering your career journey</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-[1.1] text-primary">
                  Find Your Dream Job <br />
                  <span className="text-accent">Faster with HireHub</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                  The professional platform connecting talented individuals with world-class opportunities. Simple, efficient, and AI-powered.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/jobs">
                    <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-lg">
                      Explore Jobs
                    </Button>
                  </Link>
                  <Link href="/register?role=recruiter">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-12 text-lg">
                      Hire Talent
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 relative w-full max-w-lg">
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&h=600&auto=format&fit=crop"
                    alt="Office workspace"
                    fill
                    className="object-cover"
                    data-ai-hint="office workspace"
                  />
                </div>
                {/* Float Cards */}
                <Card className="absolute -bottom-6 -left-6 hidden md:block w-48 shadow-xl animate-bounce-slow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold">1,200+</p>
                      <p className="text-muted-foreground">New Jobs</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="absolute -top-6 -right-6 hidden md:block w-48 shadow-xl">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="text-xs">
                      <p className="font-bold">45k+</p>
                      <p className="text-muted-foreground">Active Users</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </section>

        {/* Features Grid */}
        <section className="bg-white py-20 border-y">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Professionals Choose HireHub</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to streamline your job search or recruitment process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  title: "Smart Search",
                  desc: "Find relevant jobs instantly using our advanced filters for location, role, and salary."
                },
                {
                  icon: Building2,
                  title: "Direct Application",
                  desc: "Apply with a single click and track your application status in real-time."
                },
                {
                  icon: Sparkles,
                  title: "AI Keyword Tool",
                  desc: "Recruiters can optimize job postings using AI-suggested keywords to attract better talent."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to take the next step <br /> in your career?</h2>
                <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
                  Join thousands of professionals finding their place in the world's most innovative companies.
                </p>
                <div className="pt-4">
                  <Link href="/register">
                    <Button variant="secondary" size="lg" className="px-12 h-14 text-lg rounded-full">
                      Join Now
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-white">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold font-headline tracking-tighter text-primary">HireHub</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HireHub Inc. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
