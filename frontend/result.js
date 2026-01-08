// Load analysis result when page opens
document.addEventListener("DOMContentLoaded", () => {
  const storedData = sessionStorage.getItem("analysisResult");

  if (!storedData) {
    alert("No analysis data found. Please analyze again.");
    window.location.href = "index.html";
    return;
  }

  const data = JSON.parse(storedData);

  renderResult(data);
});

// Render result data
function renderResult(data) {

  // Match Percentage
  document.getElementById("matchPercentage").textContent =
    "Match Percentage: " + data.match_percentage + "%";

  // Role overview
  document.querySelector("#roleOverview p").innerText = data.role;

  // Job must-have skills
  fillList("#jobSkills ul", data.job_must_have_skills);

  // Resume matching skills
  fillList("#resumeSkills ul", data.resume_matching_skills);

  // Missing skills (red)
  const missingUl = document.querySelector("#missingSkills ul");
  missingUl.innerHTML = "";

  if (!data.missing_skills || data.missing_skills.length === 0) {
    const li = document.createElement("li");
    li.innerText = "None";
    missingUl.appendChild(li);
  } else {
    data.missing_skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill;
      li.style.color = "red";
      missingUl.appendChild(li);
    });
  }

  // Readiness (color-coded)
  const readinessEl = document.querySelector("#readiness p");
  readinessEl.innerText = data.readiness;

  if (data.readiness === "Ready") {
    readinessEl.style.color = "green";
  } else if (data.readiness === "Partially Ready") {
    readinessEl.style.color = "orange";
  } else {
    readinessEl.style.color = "red";
  }

  // Suggestions
  fillList("#suggestions ul", data.suggestions);
}

// Helper function
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

// PDF Download
function downloadPDF() {
  window.print();
}
