import React from 'react';
import { FileText, TrendingUp, Target, Brain, Users, ArrowRight, CheckCircle, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface HomepageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Homepage({ onLogin, onSignup }: HomepageProps) {
  const features = [
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "AI-powered skill extraction and career insights from your resume"
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Find missing skills for your dream role and get a personalized learning path"
    },
    {
      icon: Target,
      title: "Career Planning",
      description: "Personalized growth roadmap tailored to your career goals"
    }
  ];

  const stats = [
    { value: "25,000+", label: "Careers Transformed" },
    { value: "89%", label: "Skill Improvement Rate" },
    { value: "3.2x", label: "Faster Growth" },
    { value: "92%", label: "Goal Achievement" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp",
      content: "The AI Career Coach identified skill gaps I didn't even know I had. Got promoted to Senior in 6 months!",
      improvement: "Senior level"
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "StartupXYZ",
      content: "The personalized learning roadmap was perfect. Landed my dream PM role at a unicorn startup!",
      improvement: "2x salary"
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      company: "DesignStudio",
      content: "Resume analysis showed me exactly what recruiters look for. Interview requests increased 300%!",
      improvement: "3x interviews"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="backdrop-blur-sm bg-blue-100/50 text-blue-700 border-blue-200/50 mb-6">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Career Coaching
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-medium text-gray-900 mb-6 leading-tight">
              Transform Your Career
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                With AI Guidance
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Upload your resume and get personalized coaching. Discover skill gaps, receive targeted 
              recommendations, and accelerate your career growth with AI-powered insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onSignup}
                className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-4"
              >
                Analyze My Career
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onLogin}
                className="backdrop-blur-sm bg-white/40 border-white/40 hover:bg-white/60 px-8 py-4"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Cards Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-lg backdrop-blur-sm animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-r from-emerald-400/20 to-yellow-400/20 rounded-full backdrop-blur-sm animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-lg backdrop-blur-sm animate-pulse delay-700"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="backdrop-blur-md bg-white/40 border-white/30 shadow-xl">
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-medium text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Why Choose AI Career Coach?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology analyzes your career and provides personalized 
              guidance to accelerate your professional growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/30 border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/40">
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how AI Career Coach has transformed careers and accelerated professional growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/40 border-white/30 shadow-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="backdrop-blur-sm bg-green-100/50 text-green-700 text-xs">
                      {testimonial.improvement}
                    </Badge>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">"{testimonial.content}"</p>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-white/30 shadow-xl">
            <div className="p-12">
              <h2 className="text-3xl font-medium text-gray-900 mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of professionals who have accelerated their growth with AI Career Coach
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={onSignup}
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="backdrop-blur-sm bg-white/40 border-white/40 hover:bg-white/60"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free career analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Personalized roadmap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI-powered insights</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}