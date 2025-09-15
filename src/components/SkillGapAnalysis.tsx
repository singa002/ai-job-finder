import React, { useState } from 'react';
import { Target, Search, CheckCircle, Clock, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ResumeAnalysis, SkillGap } from '../App';

interface SkillGapAnalysisProps {
  resumeAnalysis: ResumeAnalysis | null;
  onAnalysisComplete: (targetRole: string) => void;
  skillGap: SkillGap | null;
}

export default function SkillGapAnalysis({ resumeAnalysis, onAnalysisComplete, skillGap }: SkillGapAnalysisProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const popularRoles = [
    'Senior Full Stack Developer',
    'Tech Lead',
    'Engineering Manager',
    'Principal Engineer',
    'Solution Architect',
    'Product Manager',
    'Data Scientist',
    'DevOps Engineer',
    'UX Designer',
    'Frontend Architect'
  ];

  const handleAnalyze = () => {
    const targetRole = selectedRole === 'custom' ? customRole : selectedRole;
    if (targetRole) {
      setIsAnalyzing(true);
      setTimeout(() => {
        onAnalysisComplete(targetRole);
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (!resumeAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg p-8 text-center max-w-md">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Resume Analysis Required</h2>
          <p className="text-gray-600">Please upload and analyze your resume first to proceed with skill gap analysis.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Skill Gap Analysis
          </h1>
          <p className="text-gray-600">
            Compare your skills with your target role and get a personalized learning roadmap
          </p>
        </div>

        {!skillGap ? (
          <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">What's your dream role?</h3>
                  <p className="text-gray-600 text-sm">
                    Select a target role to see what skills you need to develop
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-900">
                      Select Target Role
                    </label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="backdrop-blur-sm bg-white/50 border-white/30">
                        <SelectValue placeholder="Choose your target role" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Custom Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRole === 'custom' && (
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        Enter Custom Role
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          placeholder="e.g., Senior Cloud Architect"
                          value={customRole}
                          onChange={(e) => setCustomRole(e.target.value)}
                          className="pl-10 backdrop-blur-sm bg-white/50 border-white/30"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedRole || (selectedRole === 'custom' && !customRole) || isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Analyzing Skills...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Analyze Skill Gap
                      </>
                    )}
                  </Button>
                </div>

                {resumeAnalysis && (
                  <div className="mt-6 p-4 bg-blue-50/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-blue-900">Current Level: {resumeAnalysis.careerLevel}</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      We detected {resumeAnalysis.skillsDetected.length} skills from your resume
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Target Role Header */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-medium text-gray-900">{skillGap.targetRole}</h2>
                      <p className="text-gray-600">Skills analysis complete</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800">
                    Gap Analysis Ready
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Skills Comparison */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Skills */}
              <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <h3 className="font-medium text-gray-900">Your Skills</h3>
                    <Badge variant="secondary" className="backdrop-blur-sm bg-green-100/50 text-green-700">
                      {skillGap.currentSkills.length} Skills
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {skillGap.currentSkills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-green-50/50 border border-green-200/50">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-green-900">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Missing Skills */}
              <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <h3 className="font-medium text-gray-900">Missing Skills</h3>
                    <Badge variant="secondary" className="backdrop-blur-sm bg-red-100/50 text-red-700">
                      {skillGap.missingSkills.length} Skills
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {skillGap.missingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50/50 border border-red-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-red-500 rounded-full" />
                          <span className="font-medium text-red-900">{skill}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          High Priority
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Learning Roadmap */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Learning Roadmap</h3>
                    <p className="text-gray-600 text-sm">Personalized path to reach your goal</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {skillGap.learningPath.map((step, index) => (
                    <div key={index} className="relative">
                      {index < skillGap.learningPath.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200" />
                      )}
                      
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                        <div className="flex-shrink-0">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center border-2
                            ${step.completed 
                              ? 'bg-green-100 border-green-500' 
                              : 'bg-white border-gray-300'
                            }
                          `}>
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <span className="font-medium text-gray-600">{index + 1}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{step.title}</h4>
                            <Badge className={getPriorityColor(step.priority)}>
                              {step.priority} Priority
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                            {!step.completed && (
                              <Button variant="outline" size="sm" className="ml-auto">
                                Start Learning
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}