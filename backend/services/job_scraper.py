import requests
import time
import random
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

class JobScraper:
    """
    Job scraper that works with real APIs and generates mock data
    Designed to handle ANY job search query
    """
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        
        # Job sources configuration
        self.sources = {
            'remoteok': {
                'enabled': True,
                'api_url': 'https://remoteok.io/api',
                'max_jobs': 10
            },
            'mock': {
                'enabled': True,
                'max_jobs': 5
            }
        }
    
    def search_jobs(self, keywords: str, location: str = "") -> List[Dict]:
        """
        Main job search method - works with ANY keywords
        """
        logger.info(f"Searching jobs for: '{keywords}' in '{location}'")
        
        all_jobs = []
        
        # Source 1: RemoteOK API (real remote jobs)
        if self.sources['remoteok']['enabled']:
            remote_jobs = self._scrape_remoteok(keywords)
            all_jobs.extend(remote_jobs)
            logger.info(f"Found {len(remote_jobs)} jobs from RemoteOK")
        
        # Source 2: Mock jobs (for any job type testing)
        if self.sources['mock']['enabled']:
            mock_jobs = self._generate_smart_mock_jobs(keywords, location)
            all_jobs.extend(mock_jobs)
            logger.info(f"Generated {len(mock_jobs)} mock jobs")
        
        # Remove duplicates and return
        unique_jobs = self._remove_duplicates(all_jobs)
        logger.info(f"Total unique jobs found: {len(unique_jobs)}")
        
        return unique_jobs
    
    def _scrape_remoteok(self, keywords: str) -> List[Dict]:
        """Scrape RemoteOK API for real remote jobs"""
        try:
            url = "https://remoteok.io/api"
            response = self.session.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                jobs = []
                
                # Filter jobs by keywords (case insensitive)
                keywords_lower = keywords.lower()
                
                for job in data[1:21]:  # Skip first item (metadata), limit to 20
                    if isinstance(job, dict) and self._job_matches_keywords(job, keywords_lower):
                        processed_job = {
                            'title': job.get('position', 'Unknown Title'),
                            'company': job.get('company', 'Unknown Company'),
                            'location': 'Remote',
                            'salary': self._format_salary(job),
                            'description': self._clean_description(job.get('description', '')),
                            'url': f"https://remoteok.io/remote-jobs/{job.get('id', '')}",
                            'source': 'RemoteOK',
                            'posted_date': 'Recently',
                            'tags': job.get('tags', [])
                        }
                        jobs.append(processed_job)
                
                return jobs[:self.sources['remoteok']['max_jobs']]
                
        except Exception as e:
            logger.error(f"Error scraping RemoteOK: {str(e)}")
        
        return []
    
    def _job_matches_keywords(self, job: Dict, keywords: str) -> bool:
        """Check if job matches search keywords"""
        searchable_text = f"{job.get('position', '')} {job.get('description', '')} {' '.join(job.get('tags', []))}".lower()
        
        # Split keywords and check if any match
        keyword_list = keywords.split()
        for keyword in keyword_list:
            if len(keyword) > 2 and keyword in searchable_text:
                return True
        return False
    
    def _format_salary(self, job: Dict) -> str:
        """Format salary information"""
        salary_min = job.get('salary_min')
        salary_max = job.get('salary_max')
        
        if salary_min and salary_max:
            return f"${salary_min:,} - ${salary_max:,}"
        elif salary_min:
            return f"${salary_min:,}+"
        return "Salary not specified"
    
    def _clean_description(self, description: str) -> str:
        """Clean and truncate job description"""
        if not description:
            return "No description available"
        
        # Remove HTML tags if present
        import re
        clean_desc = re.sub(r'<[^>]+>', '', description)
        
        # Truncate to reasonable length
        if len(clean_desc) > 300:
            clean_desc = clean_desc[:297] + "..."
        
        return clean_desc.strip()
    
    def _generate_smart_mock_jobs(self, keywords: str, location: str) -> List[Dict]:
        """
        Generate realistic mock jobs for ANY job type
        This ensures we always have results for testing
        """
        # Extract main job concept
        main_concept = self._extract_job_concept(keywords)
        location = location or "Various Locations"
        
        # Smart mock job templates
        mock_templates = [
            {
                'title': f'{main_concept}',
                'company': 'TechCorp Solutions',
                'salary_range': (50000, 80000),
                'description_template': f'Join our team as a {main_concept}. We offer competitive salary, great benefits, and growth opportunities.'
            },
            {
                'title': f'Senior {main_concept}',
                'company': 'Innovation Labs',
                'salary_range': (70000, 120000),
                'description_template': f'Experienced {main_concept} needed for exciting projects. Remote work available with flexible schedule.'
            },
            {
                'title': f'{main_concept} - Entry Level',
                'company': 'StartupXYZ',
                'salary_range': (40000, 65000),
                'description_template': f'Great opportunity for new {main_concept} to learn and grow with our dynamic team.'
            },
            {
                'title': f'Freelance {main_concept}',
                'company': 'Freelance Network',
                'salary_range': (30, 80),  # Hourly rates
                'description_template': f'Flexible {main_concept} position. Work on your own schedule with multiple clients.',
                'is_hourly': True
            },
            {
                'title': f'{main_concept} Specialist',
                'company': 'MegaCorp Industries',
                'salary_range': (60000, 100000),
                'description_template': f'Specialized {main_concept} role in established company. Excellent benefits package included.'
            }
        ]
        
        mock_jobs = []
        for i, template in enumerate(mock_templates[:self.sources['mock']['max_jobs']]):
            salary_min, salary_max = template['salary_range']
            
            if template.get('is_hourly'):
                salary_str = f"${salary_min}-${salary_max}/hour"
            else:
                salary_str = f"${salary_min:,} - ${salary_max:,}"
            
            mock_job = {
                'title': template['title'],
                'company': template['company'],
                'location': location if not ('remote' in keywords.lower()) else 'Remote',
                'salary': salary_str,
                'description': template['description_template'],
                'url': f'https://example.com/job/{i+1}',
                'source': 'MockData',
                'posted_date': f'{random.randint(1, 7)} days ago',
                'tags': self._generate_relevant_tags(keywords)
            }
            mock_jobs.append(mock_job)
        
        return mock_jobs
    
    def _extract_job_concept(self, keywords: str) -> str:
        """Extract main job concept from search keywords"""
        # Remove common words
        stop_words = ['looking', 'for', 'job', 'position', 'work', 'career', 'remote', 'part', 'time', 'full']
        words = [word for word in keywords.split() if word.lower() not in stop_words and len(word) > 2]
        
        if words:
            # Capitalize properly
            return ' '.join(word.capitalize() for word in words[:2])
        
        return 'Professional'
    
    def _generate_relevant_tags(self, keywords: str) -> List[str]:
        """Generate relevant tags based on keywords"""
        keywords_lower = keywords.lower()
        
        # Common tags by category
        tech_tags = ['programming', 'software', 'development', 'coding']
        healthcare_tags = ['healthcare', 'medical', 'patient care', 'health']
        business_tags = ['business', 'management', 'strategy', 'operations']
        creative_tags = ['creative', 'design', 'art', 'visual']
        
        tags = []
        
        # Add relevant category tags
        if any(tech in keywords_lower for tech in ['developer', 'programming', 'software', 'tech']):
            tags.extend(tech_tags[:2])
        elif any(health in keywords_lower for health in ['nurse', 'healthcare', 'medical']):
            tags.extend(healthcare_tags[:2])
        elif any(biz in keywords_lower for biz in ['manager', 'business', 'sales']):
            tags.extend(business_tags[:2])
        elif any(creative in keywords_lower for creative in ['designer', 'artist', 'creative']):
            tags.extend(creative_tags[:2])
        
        # Add work arrangement tags
        if 'remote' in keywords_lower:
            tags.append('remote')
        if any(pt in keywords_lower for pt in ['part time', 'part-time']):
            tags.append('part-time')
        
        return tags[:4]  # Limit to 4 tags
    
    def _remove_duplicates(self, jobs: List[Dict]) -> List[Dict]:
        """Remove duplicate jobs based on title and company"""
        seen = set()
        unique_jobs = []
        
        for job in jobs:
            # Create unique key from title and company
            key = (job['title'].lower().strip(), job['company'].lower().strip())
            if key not in seen:
                seen.add(key)
                unique_jobs.append(job)
        
        return unique_jobs
