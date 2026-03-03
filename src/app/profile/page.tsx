
"use client";

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Pencil, 
  Plus, 
  X, 
  FileText, 
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';
import { MOCK_USER } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { jobSeekerProfileOptimizer } from '@/ai/flows/job-seeker-profile-optimizer-flow';

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(MOCK_USER.profile!);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your professional profile has been successfully updated.",
      });
    }, 1000);
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  const optimizeWithAI = async () => {
    setLoading(true);
    try {
      const result = await jobSeekerProfileOptimizer({
        currentSkills: profile.skills,
        experience: profile.experience,
        desiredJobTypes: ['Frontend Engineer', 'Fullstack Developer']
      });
      
      toast({
        title: "AI Optimization Suggestions",
        description: "Review suggested keywords and profile improvements in the editor.",
      });
      // In a real app, we might display these or auto-apply some
    } catch (error) {
       toast({
        title: "AI Optimizer Failed",
        description: "Could not generate optimization tips.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="h-24 bg-primary relative">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg flex items-center justify-center">
                    <User className="h-12 w-12 text-primary/20" />
                  </div>
                </div>
              </div>
              <CardContent className="pt-16 pb-8 text-center px-6">
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-muted-foreground mb-6">Software Engineer</p>
                
                <div className="space-y-3 text-sm text-left border-t pt-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{MOCK_USER.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>London, United Kingdom</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>Available for work</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 px-6 py-4 border-t">
                <Button variant="outline" className="w-full gap-2 font-bold" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-accent text-white border-none shadow-lg overflow-hidden relative">
              <CardContent className="p-6">
                <Sparkles className="h-8 w-8 mb-4 opacity-50" />
                <h3 className="text-lg font-bold mb-2">AI Profile Strength</h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  Your profile matches 75% of job requirements in your field. Use our AI tool to reach 100%.
                </p>
                <Button variant="secondary" className="w-full font-bold" onClick={optimizeWithAI}>Optimize Profile</Button>
              </CardContent>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">About & Experience</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Professional Summary & Experience</Label>
                      <Textarea 
                        className="min-h-[150px]" 
                        value={profile.experience}
                        onChange={(e) => setProfile({...profile, experience: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-bold flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Career Background</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.experience}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-none">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-bold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Documents</h3>
                      <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">Resume_Standard_2024.pdf</p>
                            <p className="text-xs text-muted-foreground">Uploaded on Oct 12, 2024</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          View <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {isEditing && (
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Manage Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a skill (e.g. Docker)" 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button variant="secondary" onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} className="px-3 py-1 gap-2">
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X className="h-3 w-3 hover:text-red-300" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
