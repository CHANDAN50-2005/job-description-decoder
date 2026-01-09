from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PyPDF2 import PdfReader

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------- SKILL EXTRACTION ----------------
def extract_skills_from_text(text):
    skills = [
        "html", "css", "javascript", "react","C","C++",
        "python", "java", "sql", "git",
        "flask", "django", "node", "express","Data Structures and Algorithms","DSA","Responsive Design","REST APIs","MySQL","PostgreSQL","MongoDB","Git","GitHub","GitHub / GitLab","Communication Skills","Problem-Solving","Cloud & DevOps","Backend Frameworks","Operating Systems & Networking","Team & Work Ethics","C / C++",
    ]

    found = []
    text = text.lower()

    for skill in skills:
        if skill in text:
            found.append(skill.upper())

    return list(set(found))

# ---------------- ANALYZE ROUTE ----------------
@app.route("/analyze", methods=["POST"])
def analyze():
    # Validate job description
    job_description = request.form.get("job_description")
    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    # Validate resume
    if "resume_pdf" not in request.files:
        return jsonify({"error": "Resume PDF is required"}), 400

    resume_file = request.files["resume_pdf"]

    if resume_file.filename == "":
        return jsonify({"error": "No resume file selected"}), 400

    if not resume_file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF resumes are supported"}), 400

    # Save resume
    resume_path = os.path.join(UPLOAD_FOLDER, resume_file.filename)
    resume_file.save(resume_path)

    # Extract resume text
    try:
        reader = PdfReader(resume_path)
        resume_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                resume_text += text + " "

        if not resume_text.strip():
            return jsonify({
                "error": "Unable to read resume text. Please upload a text-based PDF."
            }), 400

    except Exception:
        return jsonify({"error": "Error reading resume PDF"}), 500

    # Skill extraction
    job_skills = extract_skills_from_text(job_description)
    resume_skills = extract_skills_from_text(resume_text)
    
    missing_skills = [skill for skill in job_skills if skill not in resume_skills]

    matched_skills = [skill for skill in job_skills if skill in resume_skills]

    matched_count = len(matched_skills)
    total_required = len(job_skills)

    match_percentage = 0
    if total_required > 0:
        match_percentage = int((matched_count / total_required) * 100)


    # ---------------- AI-LIKE REASONING ----------------
    if len(missing_skills) == 0:
        readiness = "Ready"
        reason = "Your resume strongly matches all required job skills."
    elif len(missing_skills) <= 2:
        readiness = "Partially Ready"
        reason = "Your resume matches most required skills but needs improvement."
    else:
        readiness = "Not Ready"
        reason = "Your resume is missing several important skills required for this role."

    suggestions = [f"Improve your knowledge in {skill}" for skill in missing_skills][:3]

    # Final response
    result = {
        "role": "Frontend Developer responsible for building user interfaces",
        "job_must_have_skills": job_skills,
        "resume_matching_skills": resume_skills,
        "missing_skills": missing_skills,
        "readiness": readiness,
        "reason": reason,
        "suggestions": suggestions,
        "match_percentage": match_percentage

    }

    return jsonify(result)

# ---------------- RUN APP ----------------
if __name__ == "__main__":
    app.run(debug=True)
