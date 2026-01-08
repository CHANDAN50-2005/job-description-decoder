document.addEventListener("DOMContentLoaded", () => {

  const analyzeBtn = document.getElementById("analyzeBtn");
  const resumeInput = document.getElementById("resumeFile");
  const fileNameDisplay = document.getElementById("fileName");

  /* ---------- FILE NAME DISPLAY (FIXED) ---------- */
  resumeInput.addEventListener("change", () => {
    if (resumeInput.files.length > 0) {
      fileNameDisplay.textContent = resumeInput.files[0].name;
    } else {
      fileNameDisplay.textContent = "No file selected";
    }
  });

  /* ---------- ANALYZE BUTTON ---------- */
  analyzeBtn.addEventListener("click", () => {
    const jobDescription = document.getElementById("jobDescription").value;
    const resumeFile = resumeInput.files[0];

    // Validation
    if (!jobDescription.trim()) {
      alert("Please paste the job description.");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume as a PDF.");
      return;
    }

    if (resumeFile.type !== "application/pdf") {
      alert("Only PDF resumes are supported.");
      return;
    }

    // Button loading state
    analyzeBtn.innerText = "Analyzing...";
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = "0.7";

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("resume_pdf", resumeFile);

    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        analyzeBtn.innerText = "Analyze Job & Resume";
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = "1";

        if (data.error) {
          alert(data.error);
          return;
        }

        sessionStorage.setItem("analysisResult", JSON.stringify(data));
        window.location.href = "result.html";
      })
      .catch(() => {
        analyzeBtn.innerText = "Analyze Job & Resume";
        analyzeBtn.disabled = false;
        analyzeBtn.style.opacity = "1";
        alert("Backend error.");
      });
  });

});
