import React from 'react';
import { Brain, TrendingUp, Target, BookOpen, Calendar, CheckCircle, Clock, AlertCircle, Award, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

import { AppUser, ResumeAnalysis, SkillGap } from '../App';

interface CoachDashboardProps {
  user: AppUser | null;
  resumeAnalysis: ResumeAnalysis | null;
  skillGap: SkillGap | null;
}

export default function CoachDashboard({ user, resumeAnalysis, skillGap }: CoachDashboardProps) {
  const actionCards = [
    {
      title: "Learn TypeScript",
      priority: "High" as const,
      duration: "2-3 weeks",
      description: "Master TypeScript to enhance your development skills",
      progress: 0,
      dueDate: "Next week"
    },
    {
      title: "Build Portfolio Project",
      priority: "Medium" as const,
      duration: "4-6 weeks", 
      description: "Create a full-stack application showcasing your skills",
      progress: 25,
      dueDate: "Next month"
    },
    {
      title: "Update LinkedIn Profile",
      priority: "Low" as const,
      duration: "30 mins",
      description: "Optimize your LinkedIn with latest skills and achievements",
      progress: 75,
      dueDate: "This week"
    }
  ];

  const progressMetrics = [
    { label: "Skills Learned", value: 8, total: 15, color: "from-blue-500 to-emerald-500" },
    { label: "Courses Completed", value: 5, total: 8, color: "from-emerald-500 to-yellow-500" },
    { label: "Career Level", value: 2, total: 3, color: "from-purple-500 to-blue-500" }
  ];

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriorityIcon = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return <AlertCircle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'Low': return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Here's your personalized career coaching dashboard
          </p>
        </div>

        {/* AI Coach Message */}
        <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg mb-8">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900">AI Career Coach</h3>
                  <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 text-xs">
                    Active
                  </Badge>
                </div>
                <p className="text-gray-700 mb-4">
                  Great progress this week! Based on your current trajectory, you're on track to reach 
                  <span className="font-medium text-blue-600"> {skillGap?.targetRole || 'your career goals'} </span>
                  within the next 6 months. Here are your top 3 priorities for this week:
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Career momentum: Strong</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>Goal alignment: 89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Action Cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Priority Actions</h2>
              <Badge variant="secondary" className="backdrop-blur-sm bg-blue-100/50">
                3 Active Tasks
              </Badge>
            </div>
            
            <div className="space-y-4">
              {actionCards.map((card, index) => (
                <Card key={index} className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{card.title}</h3>
                          <Badge className={getPriorityColor(card.priority)}>
                            {getPriorityIcon(card.priority)}
                            <span className="ml-1">{card.priority}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{card.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due {card.dueDate}</span>
                          </div>
                        </div>
                        
                        {card.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{card.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: `${card.progress}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/20">
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white"
                      >
                        {card.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Progress Tracking */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Progress Overview</h2>
            
            <div className="space-y-6">
              {progressMetrics.map((metric, index) => (
                <Card key={index} className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">{metric.label}</h3>
                      <span className="text-2xl font-medium text-gray-900">
                        {metric.value}/{metric.total}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full transition-all duration-300" style={{ width: `${(metric.value / metric.total) * 100}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {Math.round((metric.value / metric.total) * 100)}% Complete
                      </span>
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>On track</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Achievement Badge */}
              <Card className="backdrop-blur-md bg-gradient-to-r from-yellow-100/50 to-orange-100/50 border-yellow-200/50 shadow-lg">
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-yellow-900 mb-1">Achievement Unlocked!</h3>
                  <p className="text-sm text-yellow-800">Skill Collector - Learned 5+ new skills</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Skills & Goals Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Skills */}
          {resumeAnalysis && (
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">Skill Portfolio</h3>
                </div>
                
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {resumeAnalysis.skillsDetected.slice(0, 6).map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-white/20 backdrop-blur-sm">
                      <span className="text-gray-900">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          />
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 backdrop-blur-sm bg-white/20">
                  View All Skills ({resumeAnalysis.skillsDetected.length})
                </Button>
              </div>
            </Card>
          )}

          {/* Learning Path */}
          {skillGap && (
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Learning Journey</h3>
                    <p className="text-sm text-gray-600">Path to {skillGap.targetRole}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {skillGap.learningPath.slice(0, 3).map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded bg-white/20 backdrop-blur-sm">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${step.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                        }
                      `}>
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-900 text-sm">{step.title}</div>
                        <div className="text-xs text-gray-600">{step.duration}</div>
                      </div>
                      <Badge className={getPriorityColor(step.priority)}>
                        {step.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 backdrop-blur-sm bg-white/20">
                  View Full Roadmap
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}