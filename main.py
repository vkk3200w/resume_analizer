from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfminer.high_level
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes):
    with io.BytesIO(file_bytes) as f:
        text = pdfminer.high_level.extract_text(f)
    return text


@app.post("/analyze")
async def analyze_resume(
    resume_file: UploadFile = File(...),
    job_description: str = File(...)
):
    resume_bytes = await resume_file.read()
    resume_text = extract_text_from_pdf(resume_bytes)

    # 🔥 TEMP DUMMY RESPONSE (we'll plug Antigravity later)
    return {
        "overall_match_percentage": 75,
        "skill_match_score": 70,
        "keyword_match_score": 80,
        "missing_mandatory_skills": ["Docker", "AWS"],
        "partial_matches": ["Kubernetes"],
        "summary": "Your resume matches most core requirements but lacks cloud exposure."}


