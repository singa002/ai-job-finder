import React, { useState } from "react";
import {
  Bell,
  LogOut,
  FileText,
  Target,
  Brain,
  BarChart3,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

// Import components
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import SkillGapAnalysis from "./components/SkillGapAnalysis";
import CoachDashboard from "./components/CoachDashboard";

// Types
export interface AppUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  experience: string;
}

export interface ResumeAnalysis {
  careerLevel: string;
  skillsDetected: string[];
  careerPaths: string[];
  quickWins: string[];
  strengthScore: number;
}

export interface SkillGap {
  currentSkills: string[];
  missingSkills: string[];
  targetRole: string;
  learningPath: LearningStep[];
}

export interface LearningStep {
  title: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

type AppView =
  | "homepage"
  | "login"
  | "signup"
  | "resume-analyzer"
  | "skill-gap"
  | "coach-dashboard";

// Mock data
const mockResumeAnalysis: ResumeAnalysis = {
  careerLevel: "Senior Developer",
  skillsDetected: [
    "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", 
    "GraphQL", "MongoDB", "Git", "Agile", "Team Leadership"
  ],
  careerPaths: [
    "Senior Full Stack Developer",
    "Tech Lead",
    "Engineering Manager", 
    "Solution Architect",
    "Principal Engineer"
  ],
  quickWins: [
    "Update LinkedIn profile",
    "Add portfolio projects",
    "Get AWS certification"
  ],
  strengthScore: 85
};

const mockSkillGap: SkillGap = {
  currentSkills: ["React", "JavaScript", "CSS", "HTML", "Git"],
  missingSkills: ["TypeScript", "Node.js", "Database Design", "System Design", "DevOps"],
  targetRole: "Senior Full Stack Developer",
  learningPath: [
    { title: "Learn TypeScript", duration: "2-3 weeks", priority: "High", completed: false },
    { title: "Master Node.js", duration: "4-6 weeks", priority: "High", completed: false },
    { title: "Database Design", duration: "3-4 weeks", priority: "Medium", completed: false },
    { title: "System Design Principles", duration: "6-8 weeks", priority: "Medium", completed: false }
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("homepage");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGap | null>(null);

  const handleLogin = (email: string, password: string) => {
    setCurrentUser({
      firstName: "John",
      lastName: "Doe",
      email: email,
      role: "Frontend Developer",
      experience: "Mid-level",
    });
    setIsAuthenticated(true);
    setCurrentView("coach-dashboard");
  };

  const handleSignup = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    experience: string;
  }) => {
    setCurrentUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      experience: userData.experience,
    });
    setIsAuthenticated(true);
    setCurrentView("resume-analyzer");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView("homepage");
    setResumeAnalysis(null);
    setSkillGap(null);
  };

  const handleResumeUpload = (file: File) => {
    setTimeout(() => {
      setResumeAnalysis(mockResumeAnalysis);
      setCurrentView("skill-gap");
    }, 2000);
  };

  const handleSkillGapAnalysis = (targetRole: string) => {
    setSkillGap({ ...mockSkillGap, targetRole });
    setCurrentView("coach-dashboard");
  };

  // Render unauthenticated views
  if (!isAuthenticated) {
    if (currentView === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onSignup={() => setCurrentView("signup")}
          onBack={() => setCurrentView("homepage")}
        />
      );
    }

    if (currentView === "signup") {
      return (
        <Signup
          onSignup={handleSignup}
          onLogin={() => setCurrentView("login")}
          onBack={() => setCurrentView("homepage")}
        />
      );
    }

    return (
      <Homepage
        onLogin={() => setCurrentView("login")}
        onSignup={() => setCurrentView("signup")}
      />
    );
  }

  // Render authenticated app
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-medium text-gray-900">
                  AI Career Coach
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("resume-analyzer")}
                className={`backdrop-blur-sm ${currentView === "resume-analyzer" ? "bg-white/40" : "hover:bg-white/20"}`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("skill-gap")}
                className={`backdrop-blur-sm ${currentView === "skill-gap" ? "bg-white/40" : "hover:bg-white/20"}`}
              >
                <Target className="w-4 h-4 mr-2" />
                Skills
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("coach-dashboard")}
                className={`backdrop-blur-sm ${currentView === "coach-dashboard" ? "bg-white/40" : "hover:bg-white/20"}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="backdrop-blur-sm hover:bg-white/20"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm">
                    {currentUser?.firstName?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="backdrop-blur-sm hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {currentView === "resume-analyzer" && (
        <ResumeAnalyzer
          onResumeUpload={handleResumeUpload}
          analysis={resumeAnalysis}
        />
      )}
      
      {currentView === "skill-gap" && (
        <SkillGapAnalysis
          resumeAnalysis={resumeAnalysis}
          onAnalysisComplete={handleSkillGapAnalysis}
          skillGap={skillGap}
        />
      )}
      
      {currentView === "coach-dashboard" && (
        <CoachDashboard
          user={currentUser}
          resumeAnalysis={resumeAnalysis}
          skillGap={skillGap}
        />
      )}
    </div>
  );
}