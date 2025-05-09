from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import uvicorn
import datetime
from deepseek_prover import query_deepseek_prover
import os

app = FastAPI()

# Allow CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    inputs: str
    parameters: Dict = {}

class ChatResponse(BaseModel):
    generated_text: str

# --- Insurance Premium AI ---
class InsuranceProfile(BaseModel):
    name: str
    age: int
    weight: float
    height: float
    smoker: bool
    chronicDiseases: Optional[List[str]] = []

class InsuranceAIResponse(BaseModel):
    eligible: bool
    premium: Optional[float]
    reason: str
    ai_explanation: str

@app.post("/insurance-ai", response_model=InsuranceAIResponse)
def insurance_ai(profile: InsuranceProfile):
    bmi = profile.weight / ((profile.height / 100) ** 2)
    healthy = not profile.smoker and (not profile.chronicDiseases or len(profile.chronicDiseases) == 0) and 18.5 <= bmi <= 30
    premium = 5000
    reason = ""
    if profile.age > 40:
        premium += 2000
    if bmi > 25:
        premium += 1000
    if not healthy:
        return InsuranceAIResponse(
            eligible=False,
            premium=None,
            reason="High risk: smoker, chronic disease, or BMI out of range.",
            ai_explanation="Based on your health profile, you are not eligible for a lower premium. Consider a healthier lifestyle for better rates."
        )
    ai_explanation = "You are healthy (BMI: {:.1f}, non-smoker, no chronic diseases). You qualify for a lower premium!".format(bmi)
    return InsuranceAIResponse(
        eligible=True,
        premium=premium,
        reason="Eligible for insurance.",
        ai_explanation=ai_explanation
    )

# --- Family Health AI ---
class FamilyMemberProfile(BaseModel):
    name: str
    age: int
    medical: Optional[str] = ""
    allergies: Optional[str] = ""

class FamilyAIResponse(BaseModel):
    tips: str
    risk: str

@app.post("/family-ai", response_model=FamilyAIResponse)
def family_ai(profile: FamilyMemberProfile):
    risk = "Low"
    tips = "Maintain regular checkups and a balanced diet."
    if profile.age > 60:
        risk = "Moderate"
        tips += " Consider annual screenings for seniors."
    if profile.medical and profile.medical.lower() not in ["none", ""]:
        risk = "High"
        tips += f" Pay special attention to: {profile.medical}."
    if profile.allergies and profile.allergies.lower() not in ["none", ""]:
        tips += f" Avoid allergens: {profile.allergies}."
    return FamilyAIResponse(tips=tips, risk=risk)

# --- Diagnostics/Services AI ---
class DiagnosticsRequest(BaseModel):
    age: int
    gender: Optional[str] = None
    selected: str
    history: Optional[str] = ""

class DiagnosticsAIResponse(BaseModel):
    recommendations: str

@app.post("/diagnostics-ai", response_model=DiagnosticsAIResponse)
def diagnostics_ai(req: DiagnosticsRequest):
    recs = []
    if req.selected == "CBC" and req.age > 40:
        recs.append("Consider a lipid profile and diabetes screening as well.")
    if req.selected == "Cardiac Risk Assessment" and req.history and "hypertension" in req.history.lower():
        recs.append("Annual cardiac checkups are recommended due to hypertension history.")
    if not recs:
        recs.append("No additional tests recommended at this time.")
    return DiagnosticsAIResponse(recommendations=" ".join(recs))

# --- Visit/Assistant/Doctor AI ---
class VisitAIRequest(BaseModel):
    vitals: Dict[str, Any]
    history: Optional[str] = ""

class VisitAIResponse(BaseModel):
    insights: str

@app.post("/visit-ai", response_model=VisitAIResponse)
def visit_ai(req: VisitAIRequest):
    bp = req.vitals.get("Blood Pressure", "")
    hr = req.vitals.get("Heart Rate", "")
    insights = []
    if bp and ("140" in bp or "90" in bp):
        insights.append("Elevated blood pressure detected. Recommend follow-up.")
    if hr and int(hr.split()[0]) > 100:
        insights.append("Tachycardia detected. Monitor heart rate.")
    if not insights:
        insights.append("Vitals within normal range.")
    return VisitAIResponse(insights=" ".join(insights))

# --- Treatment Plan AI ---
class TreatmentPlanRequest(BaseModel):
    plan: str
    meds: Optional[str] = ""

class TreatmentPlanAIResponse(BaseModel):
    advice: str

@app.post("/treatment-ai", response_model=TreatmentPlanAIResponse)
def treatment_ai(req: TreatmentPlanRequest):
    advice = "Take medications as prescribed. Maintain a healthy lifestyle."
    if req.meds and "insulin" in req.meds.lower():
        advice += " Monitor blood sugar regularly."
    return TreatmentPlanAIResponse(advice=advice)

# --- Feedback AI ---
class FeedbackRequest(BaseModel):
    feedback: str

class FeedbackAIResponse(BaseModel):
    analysis: str
    urgent: bool

@app.post("/feedback-ai", response_model=FeedbackAIResponse)
def feedback_ai(req: FeedbackRequest):
    urgent = any(word in req.feedback.lower() for word in ["bad", "urgent", "danger", "complaint"])
    analysis = "Thank you for your feedback. "
    if urgent:
        analysis += "This feedback has been flagged for immediate review."
    else:
        analysis += "We appreciate your input and will use it to improve our services."
    return FeedbackAIResponse(analysis=analysis, urgent=urgent)

# --- General Chatbot (existing) ---
@app.post("/chat", response_model=List[ChatResponse])
def chat(req: ChatRequest):
    prompt = req.inputs
    try:
        # Use DeepSeek-Prover-V2-671B for response
        response = query_deepseek_prover(prompt, **req.parameters)
        return [ChatResponse(generated_text=response)]
    except Exception as e:
        # List which env vars were checked for the API key
        envs_checked = [
            f"HF_API_KEY={os.getenv('HF_API_KEY')}",
            f"HUGGINGFACE_API_KEY={os.getenv('HUGGINGFACE_API_KEY')}",
            f"VITE_HF_API_KEY={os.getenv('VITE_HF_API_KEY')}",
            f"NEXT_PUBLIC_HF_API_KEY={os.getenv('NEXT_PUBLIC_HF_API_KEY')}"
        ]
        debug_info = " | ".join(envs_checked)
        return [ChatResponse(generated_text=f"AI Error: {str(e)}\n[DEBUG ENV] {debug_info}")]

# Print all environment variables at startup for debugging
print("[DEBUG] ENV VARS AT STARTUP:", dict(os.environ))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 