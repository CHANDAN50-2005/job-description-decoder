# 🧠 Job Description Decoder & Resume Analyzer

A web-based application that helps students and freshers **understand job descriptions clearly** and **check their resume readiness** against a specific job role using AI-assisted analysis.

---

## 🚀 Problem Statement

Many students apply to jobs **without fully understanding job requirements** or knowing whether their resume actually matches the role.  
This often leads to:
- Blind applications  
- Low interview calls  
- Confusion about skill gaps  

---

## 💡 Solution

This application allows users to:
1. Paste a **Job Description**
2. Upload their **Resume (PDF)**
3. Get a **clear, structured analysis** including:
   - Required skills
   - Skills found in resume
   - Missing skills
   - Resume readiness level
   - Actionable improvement suggestions

---

## ✨ Key Features

- 📄 **Job Description Decoder**  
  Breaks down complex job descriptions into understandable skill requirements.

- 📑 **Resume Analyzer (PDF Upload)**  
  Extracts skills from resumes and compares them with job requirements.

- 📊 **Match Percentage & Readiness Status**  
  Shows how well the resume aligns with the job (Ready / Partially Ready / Not Ready).

- 🧠 **AI-Assisted Suggestions**  
  Provides improvement guidance based on missing skills.

- 📥 **Download Analysis Report (PDF)**  
  Users can download the final analysis for reference.

- 🎨 **Professional & Interactive UI**
  - Clean dashboard layout  
  - File upload preview  
  - Loading spinner & smooth transitions  

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS (Custom professional styling)
- JavaScript (Vanilla JS)

### Backend
- Python
- Flask
- Flask-CORS
- PyPDF2 (Resume PDF text extraction)

### AI / Logic
- Rule-based skill matching (Safe MVP)
- AI-assisted explanation & suggestions (optional extension)

---

## 📂 Project Structure

```
job-description-decoder/
│
├── backend/
│   ├── app.py
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── result.html
│   ├── style.css
│   ├── script.js
│   └── result.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ How to Run the Project

### 1️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on:
```
http://127.0.0.1:5000
```

---

### 2️⃣ Frontend
- Open `frontend/index.html` in your browser  
- Paste job description  
- Upload resume PDF  
- Click **Analyze Job & Resume**

---

## 🧪 Example Output

- **Job Must-Have Skills:** Java, Python, JavaScript  
- **Skills Found in Resume:** Java, HTML, Git  
- **Missing Skills:** Python, JavaScript  
- **Resume Readiness:** Partially Ready  
- **AI Suggestions:** Improve Python and JavaScript skills  

---

## 🎯 Why This Project Is Unique

- Focuses on **decision-making**, not just scoring
- Beginner-friendly but scalable
- Solves a real student problem
- Clean MVP design with room for future AI upgrades

---

## 🔮 Future Enhancements

- Resume vs Job keyword heatmap
- Learning resource recommendations
- LinkedIn job link parsing
- User accounts & analysis history

---

## 👨‍💻 Hackathon Note

Built within an **8-hour Hackathon**, focusing on:
- Clear MVP
- Clean architecture
- Real-world usability

---

## 📌 Conclusion

This project bridges the gap between **job expectations** and **student preparedness**, helping users apply smarter — not blindly.
