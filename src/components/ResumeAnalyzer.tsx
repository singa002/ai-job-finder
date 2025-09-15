import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, TrendingUp, Target, Sparkles, Brain, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

import { ResumeAnalysis } from '../App';

interface ResumeAnalyzerProps {
  onResumeUpload: (file: File) => void;
  analysis: ResumeAnalysis | null;
}

export default function ResumeAnalyzer({ onResumeUpload, analysis }: ResumeAnalyzerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setUploadedFile(file);
        setIsAnalyzing(true);
        onResumeUpload(file);
      }
    }
  }, [onResumeUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setUploadedFile(file);
      setIsAnalyzing(true);
      onResumeUpload(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            Resume Analysis
          </h1>
          <p className="text-gray-600">
            Upload your resume and get AI-powered insights about your career
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-8">
                <div
                  className={`
                    relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
                    ${dragActive 
                      ? 'border-blue-500 bg-blue-50/50' 
                      : 'border-gray-300 hover:border-blue-400'
                    }
                    ${isAnalyzing ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
                  `}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => !isAnalyzing && document.getElementById('file-upload')?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isAnalyzing}
                  />
                  
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center">
                        <Brain className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Analyzing Your Resume</h3>
                        <p className="text-gray-600 text-sm">Our AI is extracting skills and insights...</p>
                      </div>
                      <div className="w-full max-w-xs">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Drop your resume here</h3>
                        <p className="text-gray-600 text-sm">
                          Or click to browse your files
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-blue-100/50">
                          PDF
                        </Badge>
                        <Badge variant="secondary" className="backdrop-blur-sm bg-blue-100/50">
                          DOC
                        </Badge>
                        <Badge variant="secondary" className="backdrop-blur-sm bg-blue-100/50">
                          DOCX
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {uploadedFile && !isAnalyzing && (
                  <div className="mt-6 p-4 bg-green-50/50 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-green-900">{uploadedFile.name}</div>
                      <div className="text-sm text-green-700">Ready for analysis</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Career Level Card */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">Career Level</h3>
                </div>
                
                <div className="text-center py-8">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgb(229 231 235)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray={`${analysis.strengthScore}, 100`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient">
                          <stop offset="0%" stopColor="rgb(37 99 235)" />
                          <stop offset="100%" stopColor="rgb(16 185 129)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-medium text-gray-900">{analysis.strengthScore}%</div>
                        <div className="text-sm text-gray-600">Strength</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-medium text-gray-900 mb-2">{analysis.careerLevel}</div>
                  <Badge className="bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-800 border-0">
                    Career Assessment Complete
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Skills Detected Card */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900">Skills Detected</h3>
                  </div>
                  <Badge variant="secondary" className="backdrop-blur-sm bg-blue-100/50">
                    {analysis.skillsDetected.length} Skills
                  </Badge>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {analysis.skillsDetected.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                      <span className="font-medium text-gray-900">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          />
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Career Paths Card */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">Recommended Career Paths</h3>
                </div>
                
                <div className="space-y-3">
                  {analysis.careerPaths.map((path, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
                          <span className="font-medium text-gray-900">{path}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 30 + 70)}% Match
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Wins Card */}
            <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900">Quick Wins</h3>
                </div>
                
                <div className="space-y-3">
                  {analysis.quickWins.map((win, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-amber-50/50 border border-amber-200/50">
                      <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-amber-900">{win}</div>
                        <div className="text-sm text-amber-700">Complete this week for immediate impact</div>
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