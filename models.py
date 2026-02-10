from pydantic import BaseModel
from typing import List, Optional, Any

class ResumeAnalysisRequest(BaseModel):
    jd_text: str

class AnalysisResponse(BaseModel):
    resume_data: dict
    jd_data: dict
    match_score: dict
    feedback: dict
