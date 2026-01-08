const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", () => {
  const jobDescription = document.getElementById("jobDescription").value;
  const resumeFile = document.getElementById("resumeFile").files[0];

  // Basic validations (VERY IMPORTANT)
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

  // Prepare form data (text + file)
  const formData = new FormData();
  formData.append("job_description", jobDescription);
  formData.append("resume_pdf", resumeFile);

  // Call backend API
  fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      renderResult(data);
    })
    .catch(error => {
      console.error(error);
      alert("Backend is not running or something went wrong.");
    });
});

// Render output safely
function renderResult(data) {
  // Role overview
  document.querySelector("#roleOverview p").innerText = data.role;

  // Job must-have skills
  fillList("#jobSkills ul", data.job_must_have_skills);

  // Resume matching skills
  fillList("#resumeSkills ul", data.resume_matching_skills);

  // Missing skills
  fillList("#missingSkills ul", data.missing_skills);

  // Readiness
  document.querySelector("#readiness p").innerText = data.readiness;

  // Suggestions
  fillList("#suggestions ul", data.suggestions);
}

// Helper function to fill UL lists
function fillList(selector, items) {
  const ul = document.querySelector(selector);
  ul.innerHTML = "";

  if (!items || items.length === 0) {
    const li = document.createElement("li");
    li.innerText = "None";
    ul.appendChild(li);
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });
}
