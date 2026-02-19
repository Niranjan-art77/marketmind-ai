import requests
from bs4 import BeautifulSoup
from .llm_client import llm_client

class CompetitorService:
    def analyze_competitor(self, input_str: str):
        try:
            content_to_analyze = ""
            is_url = input_str.lower().startswith("http")

            if is_url:
                # 1. Fetch content from URL
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
                response = requests.get(input_str, headers=headers, timeout=10)
                response.raise_for_status()
                
                # 2. Extract text
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style", "header", "footer", "nav"]):
                    script.decompose()
                    
                text = soup.get_text(separator=' ', strip=True)
                
                # Limit text length to avoid token limits (approx 4000 chars)
                content_to_analyze = text[:4000]
                
                if not content_to_analyze:
                    return {"error": "Could not extract meaningful text from the page."}
            else:
                # Treat input as a topic/company name
                content_to_analyze = f"The user represents the following company, product, or topic: '{input_str}'."

            # 3. Analyze with LLM
            prompt = f"""
            Analyze the following competitor or topic and provide strategic insights.
            
            Input Context:
            {content_to_analyze}
            
            Focus on:
            1. Market Positioning: How do they (or should they) describe themselves?
            2. Strengths: Key selling points or advantages.
            3. Weaknesses: Potential flaws or missing features.
            4. Market Gaps: Opportunities not fully addressed.
            5. Recommended Strategy: How to compete effectively.
            
            Return ONLY valid JSON with keys: 
            positioning, strengths (list), weaknesses (list), market_gaps (list), recommended_strategy, confidence_score (number 0-100).
            """
            
            schema = {
                "positioning": "string",
                "strengths": ["string"],
                "weaknesses": ["string"],
                "market_gaps": ["string"],
                "recommended_strategy": "string",
                "confidence_score": 0
            }
            
            result = llm_client.generate_json(prompt, schema)
            return result

        except requests.exceptions.RequestException as e:
            return {"error": f"Failed to fetch URL: {str(e)}"}
        except Exception as e:
            return {"error": f"Analysis failed: {str(e)}"}

competitor_service = CompetitorService()
