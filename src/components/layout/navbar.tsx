
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { MOCK_USER, MOCK_RECRUITER } from '@/lib/mock-data';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock auth state for UI demo
  const user = MOCK_USER; 
  const isRecruiter = user.role === 'recruiter';

  const navItems = isRecruiter 
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Jobs', href: '/my-jobs', icon: Briefcase },
      ]
    : [
        { name: 'Browse Jobs', href: '/jobs', icon: Briefcase },
        { name: 'My Applications', href: '/applications', icon: LayoutDashboard },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg group-hover:bg-accent transition-colors">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-headline tracking-tighter text-primary">HireHub</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md transition-colors",
                  pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t flex flex-col gap-2">
            <Link href="/profile" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" /> Profile
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
