from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from PyPDF2 import PdfReader

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze():
    # Validate job description
    job_description = request.form.get("job_description")
    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    # Validate resume file
    if "resume_pdf" not in request.files:
        return jsonify({"error": "Resume PDF is required"}), 400

    resume_file = request.files["resume_pdf"]

    if resume_file.filename == "":
        return jsonify({"error": "No resume file selected"}), 400

    if not resume_file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF resumes are supported"}), 400

    # Save resume temporarily
    resume_path = os.path.join(UPLOAD_FOLDER, resume_file.filename)
    resume_file.save(resume_path)

    # Extract text from PDF
    try:
        reader = PdfReader(resume_path)
        resume_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                resume_text += text + "\n"

        if not resume_text.strip():
            return jsonify({
                "error": "Unable to read resume text. Please upload a text-based PDF."
            }), 400

    except Exception as e:
        return jsonify({
            "error": "Error reading resume PDF"
        }), 500

    # ---------------- MOCK AI LOGIC (SAFE MVP) ----------------
    # This will be replaced by real AI later

    job_must_have = ["HTML", "CSS", "JavaScript", "React"]

    resume_skills_found = []
    missing_skills = []

    resume_text_lower = resume_text.lower()

    for skill in job_must_have:
        if skill.lower() in resume_text_lower:
            resume_skills_found.append(skill)
        else:
            missing_skills.append(skill)

    if len(missing_skills) == 0:
        readiness = "Ready"
        reason = "Your resume contains all the core skills required for this job."
    elif len(resume_skills_found) >= 2:
        readiness = "Partially Ready"
        reason = "Your resume matches some core skills, but improvements are needed."
    else:
        readiness = "Not Ready"
        reason = "Most core skills required for this job are missing in the resume."

    response = {
        "role": "Frontend Developer responsible for building user interfaces",
        "job_must_have_skills": job_must_have,
        "resume_matching_skills": resume_skills_found,
        "missing_skills": missing_skills,
        "readiness": readiness,
        "reason": reason,
        "suggestions": [
            "Focus on improving missing skills",
            "Build small projects related to this role"
        ]
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
