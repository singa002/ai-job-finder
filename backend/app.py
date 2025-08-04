from flask import Flask, jsonify, request
from flask_cors import CORS
import re
import logging

# Import our job scraper
from services.job_scraper import JobScraper

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIReadyTextAnalyzer:
    """Text analyzer designed for easy AI integration later"""
    
    def __init__(self):
        self.known_job_patterns = {
            'Software Developer': ['developer', 'programming', 'coding', 'software engineer'],
            'Data Scientist': ['data scientist', 'data', 'analytics', 'machine learning', 'ml'],
            'Frontend Developer': ['frontend', 'front-end', 'react', 'javascript', 'css', 'html', 'ui'],
            'Backend Developer': ['backend', 'back-end', 'api', 'server', 'database'],
            'DevOps Engineer': ['devops', 'docker', 'kubernetes', 'aws', 'infrastructure'],
            'Full Stack Developer': ['full stack', 'fullstack', 'full-stack'],
            'Nurse': ['nurse', 'nursing', 'healthcare', 'medical', 'rn'],
            'Teacher': ['teacher', 'education', 'instructor', 'professor', 'tutor'],
            'Accountant': ['accountant', 'accounting', 'finance', 'bookkeeper'],
            'Chef': ['chef', 'cook', 'culinary', 'kitchen', 'restaurant'],
            'Sales Representative': ['sales', 'salesperson', 'selling', 'sales rep'],
            'Marketing Manager': ['marketing', 'marketing manager', 'digital marketing'],
            'Graphic Designer': ['graphic designer', 'designer', 'design', 'photoshop'],
            'Project Manager': ['project manager', 'pm', 'project management'],
        }
        
        self.skill_patterns = [
            'python', 'javascript', 'react', 'java', 'c++', 'sql',
            'aws', 'docker', 'kubernetes', 'git', 'linux', 'html', 'css'
        ]
        
        self.ai_service = None
        self.confidence_threshold = 0.7
        
    def analyze_text(self, search_text):
        search_text = search_text.strip()
        original_text = search_text
        search_text_lower = search_text.lower()
        
        simple_result = self._simple_pattern_analysis(search_text_lower)
        
        if simple_result['confidence'] < self.confidence_threshold:
            if self.ai_service:
                pass
            else:
                enhanced_result = self._fallback_analysis(search_text_lower)
                if enhanced_result.get('predicted_roles'):
                    simple_result['predicted_roles'] = enhanced_result['predicted_roles']
                    simple_result['confidence'] = max(simple_result['confidence'], 0.6)
                    simple_result['fallback_used'] = True
                    simple_result['analysis_method'] = 'fallback_patterns'
        
        if 'analysis_method' not in simple_result:
            simple_result['analysis_method'] = 'pattern_matching'
        
        simple_result.update({
            'original_query': original_text,
            'search_type': 'text_search',
            'ai_ready': True,
            'can_enhance_with_ai': simple_result['confidence'] < self.confidence_threshold
        })
        
        return simple_result
    
    def _simple_pattern_analysis(self, search_text):
        found_roles = []
        confidence_score = 0.5
        
        for role, keywords in self.known_job_patterns.items():
            matches = sum(1 for keyword in keywords if keyword in search_text)
            if matches > 0:
                found_roles.append({
                    'role': role,
                    'confidence': min(0.9, 0.5 + (matches * 0.2)),
                    'matched_keywords': [kw for kw in keywords if kw in search_text]
                })
        
        found_roles = sorted(found_roles, key=lambda x: x['confidence'], reverse=True)[:3]
        role_names = [role['role'] for role in found_roles]
        
        found_skills = []
        for skill in self.skill_patterns:
            if skill in search_text:
                found_skills.append(skill.title())
        
        preferences = self._extract_preferences(search_text)
        
        if found_roles:
            confidence_score = max(role['confidence'] for role in found_roles)
        elif found_skills:
            confidence_score = 0.6
        elif any(word in search_text for word in ['job', 'position', 'work', 'career']):
            confidence_score = 0.4
        
        return {
            'predicted_roles': role_names,
            'mentioned_skills': found_skills,
            'work_preferences': preferences,
            'confidence': confidence_score,
            'role_details': found_roles
        }
    
    def _fallback_analysis(self, search_text):
        job_title = self._extract_job_title_patterns(search_text)
        return {
            'predicted_roles': [job_title] if job_title else ['General Position'],
            'extracted_job_title': job_title
        }
    
    def _extract_job_title_patterns(self, search_text):
        stop_words = ['looking', 'for', 'job', 'position', 'work', 'career', 'remote', 'part', 'time', 'full', 'flexible', 'schedule']
        words = [word for word in search_text.split() if word not in stop_words and len(word) > 2]
        
        if words:
            return ' '.join(words[:2]).title()
        
        return None
    
    def _extract_preferences(self, search_text):
        return {
            'remote_preferred': any(term in search_text for term in ['remote', 'work from home', 'wfh']),
            'part_time': 'part time' in search_text or 'part-time' in search_text,
            'freelance': 'freelance' in search_text or 'contract' in search_text,
            'senior_level': any(term in search_text for term in ['senior', 'lead', 'principal']),
            'junior_level': any(term in search_text for term in ['junior', 'entry', 'new grad'])
        }

# Initialize components
text_analyzer = AIReadyTextAnalyzer()
job_scraper = JobScraper()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "AI Job Finder API is running",
        "version": "1.0.0",
        "ai_ready": True,
        "job_scraper_ready": True
    })

@app.route('/api/analyze-text', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        
        if not data or 'search_text' not in data:
            return jsonify({"error": "search_text is required"}), 400
        
        search_text = data['search_text'].strip()
        if not search_text:
            return jsonify({"error": "search_text cannot be empty"}), 400
        
        analysis = text_analyzer.analyze_text(search_text)
        
        return jsonify({
            "success": True,
            "analysis": analysis
        })
    
    except Exception as e:
        logging.error(f"Error in text analysis: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/search-jobs', methods=['POST'])
def search_jobs():
    """NEW: Search for jobs using our job scraper"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request data is required"}), 400
        
        # Extract search parameters
        keywords = data.get('keywords', '')
        location = data.get('location', '')
        analysis_data = data.get('analysis', {})
        
        # If we have analysis data, use it to generate better keywords
        if analysis_data and not keywords:
            if analysis_data.get('search_type') == 'text_search':
                predicted_roles = analysis_data.get('predicted_roles', [])
                keywords = predicted_roles[0] if predicted_roles else analysis_data.get('original_query', 'developer')
            else:
                keywords = 'software developer'
        
        if not keywords:
            keywords = 'developer'  # Fallback
        
        # Search for jobs using our scraper
        logger.info(f"Searching for jobs with keywords: '{keywords}', location: '{location}'")
        jobs = job_scraper.search_jobs(keywords, location)
        
        return jsonify({
            "success": True,
            "jobs": jobs,
            "total_found": len(jobs),
            "search_keywords": keywords,
            "message": f"Found {len(jobs)} job opportunities"
        })
    
    except Exception as e:
        logger.error(f"Error searching jobs: {str(e)}")
        return jsonify({
            "error": f"Job search failed: {str(e)}"
        }), 500

@app.route('/api/search-jobs-simple', methods=['POST'])
def search_jobs_simple():
    """Simple job search endpoint for direct keyword searches"""
    try:
        data = request.get_json()
        
        if not data or 'keywords' not in data:
            return jsonify({"error": "keywords are required"}), 400
        
        keywords = data['keywords'].strip()
        location = data.get('location', '').strip()
        
        if not keywords:
            return jsonify({"error": "keywords cannot be empty"}), 400
        
        # Search for jobs
        jobs = job_scraper.search_jobs(keywords, location)
        
        return jsonify({
            "success": True,
            "jobs": jobs,
            "total_found": len(jobs),
            "search_keywords": keywords,
            "search_location": location
        })
    
    except Exception as e:
        logger.error(f"Error in simple job search: {str(e)}")
        return jsonify({
            "error": f"Job search failed: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
