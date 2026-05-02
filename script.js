/* =============================================
   AgriReadiness – script.js
   Frontend Logic: Validation, Navigation,
   Score Calculation, API Call, Result Display
   ============================================= */

// -----------------------------------------------
// ⚙️ CONFIGURATION – Change this to your backend URL
// When running locally: "http://localhost:3000"
// After deploying backend on Render: paste URL here
// -----------------------------------------------
const API_BASE_URL = "http://localhost:3000";

// -----------------------------------------------
// STATE – Holds all user answers
// -----------------------------------------------
let formData = {
  name:             "",
  digitalExp:       "",
  resources:        0,
  guidance:         0,
  planning:         0,
  consistency:      0,
  constraints:      "",
  usability:        "",
  feedback:         "",
  score:            0,
  category:         ""
};

let currentSection = 1;

// -----------------------------------------------
// RESTORE from localStorage (if saved before)
// -----------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("agriReadinessData");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Pre-fill name if saved
      if (parsed.name)         document.getElementById("farmerName").value = parsed.name;
      if (parsed.digitalExp) {
        const radios = document.querySelectorAll('input[name="digitalExp"]');
        radios.forEach(r => { if (r.value === parsed.digitalExp) r.checked = true; });
      }
      // Pre-fill section 2 dropdowns
      if (parsed.resources)    document.getElementById("resources").value    = parsed.resources;
      if (parsed.guidance)     document.getElementById("guidance").value     = parsed.guidance;
      if (parsed.planning)     document.getElementById("planning").value     = parsed.planning;
      if (parsed.consistency)  document.getElementById("consistency").value  = parsed.consistency;
      // Pre-fill section 3
      if (parsed.constraints)  document.getElementById("constraints").value  = parsed.constraints;
      if (parsed.usability)    document.getElementById("usability").value    = parsed.usability;
      if (parsed.feedback)     document.getElementById("feedback").value     = parsed.feedback;
    } catch (e) {
      // ignore corrupt data
    }
  }
});

// -----------------------------------------------
// NAVIGATION: Go to a specific section
// -----------------------------------------------
function goToSection(num) {
  // Hide all sections
  document.getElementById("section1").classList.add("hidden");
  document.getElementById("section2").classList.add("hidden");
  document.getElementById("section3").classList.add("hidden");
  document.getElementById("resultSection").classList.add("hidden");

  // Show target
  if (num === 1) document.getElementById("section1").classList.remove("hidden");
  if (num === 2) document.getElementById("section2").classList.remove("hidden");
  if (num === 3) document.getElementById("section3").classList.remove("hidden");

  currentSection = num;
  updateProgress(num);
  scrollToTop();
}

// -----------------------------------------------
// PROGRESS BAR UPDATE
// -----------------------------------------------
function updateProgress(step) {
  const fill = document.getElementById("progressFill");
  const dots  = document.querySelectorAll(".step");

  // Width per step
  const widths = { 1: 16, 2: 50, 3: 84, 4: 100 };
  fill.style.width = (widths[step] || 16) + "%";

  // Update step dot states
  dots.forEach((dot, idx) => {
    dot.classList.remove("active", "completed");
    const dotStep = idx / 2 + 1; // dots are at 0, 2, 4 indices (lines in between)
    if (Math.floor(idx / 2) + 1 < step) dot.classList.add("completed");
    if (Math.floor(idx / 2) + 1 === step) dot.classList.add("active");
  });
}

// -----------------------------------------------
// SECTION 1 VALIDATION & PROCEED
// -----------------------------------------------
function proceedToSection2() {
  let valid = true;

  // Validate name
  const name = document.getElementById("farmerName").value.trim();
  const nameErr = document.getElementById("nameError");
  const nameInput = document.getElementById("farmerName");
  if (!name) {
    nameErr.classList.add("show");
    nameInput.classList.add("error");
    valid = false;
  } else {
    nameErr.classList.remove("show");
    nameInput.classList.remove("error");
    formData.name = name;
  }

  // Validate digital experience
  const digitalExpVal = document.querySelector('input[name="digitalExp"]:checked');
  const digitalExpErr = document.getElementById("digitalExpError");
  if (!digitalExpVal) {
    digitalExpErr.classList.add("show");
    valid = false;
  } else {
    digitalExpErr.classList.remove("show");
    formData.digitalExp = digitalExpVal.value;
  }

  if (valid) goToSection(2);
}

// -----------------------------------------------
// SECTION 2 VALIDATION & PROCEED
// -----------------------------------------------
function proceedToSection3() {
  let valid = true;

  const fields = ["resources", "guidance", "planning", "consistency"];
  fields.forEach(field => {
    const el  = document.getElementById(field);
    const err = document.getElementById(field + "Error");
    if (!el.value) {
      err.classList.add("show");
      el.classList.add("error");
      valid = false;
    } else {
      err.classList.remove("show");
      el.classList.remove("error");
      formData[field] = parseInt(el.value);
    }
  });

  if (valid) goToSection(3);
}

// -----------------------------------------------
// SECTION 3 – COLLECT & SUBMIT
// -----------------------------------------------
function submitAssessment() {
  // Collect optional fields
  formData.constraints = document.getElementById("constraints").value || "Not specified";
  formData.usability   = document.getElementById("usability").value   || "Not specified";
  formData.feedback    = document.getElementById("feedback").value.trim() || "No feedback provided";

  // Calculate score
  formData.score = formData.resources + formData.guidance + formData.planning + formData.consistency;

  // Determine category
  if (formData.score <= 8)       formData.category = "Low";
  else if (formData.score <= 16) formData.category = "Medium";
  else                           formData.category = "High";

  // Hide all sections, show result
  document.getElementById("section3").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");
  updateProgress(4);

  // Show loading
  document.getElementById("loadingState").classList.remove("hidden");
  document.getElementById("resultContent").classList.add("hidden");

  scrollToTop();
  fetchAdvisory();
}

// -----------------------------------------------
// FETCH AI ADVISORY FROM BACKEND
// -----------------------------------------------
async function fetchAdvisory() {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-advisory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:              formData.name,
        score:             formData.score,
        category:          formData.category,
        digital_experience: formData.digitalExp,
        usability:         formData.usability,
        feedback:          formData.feedback
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data.advisory);

  } catch (err) {
    console.error("Advisory fetch failed:", err);
    // Graceful fallback message
    displayResults(
      "We were unable to reach the advisory service right now. " +
      "Based on your score of " + formData.score + " (" + formData.category + " readiness), " +
      "we recommend connecting with a local agricultural extension officer and exploring " +
      "government-supported digital literacy programs for farmers in your area."
    );
  }
}

// -----------------------------------------------
// DISPLAY RESULTS
// -----------------------------------------------
function displayResults(advisory) {
  // Hide loader, show content
  document.getElementById("loadingState").classList.add("hidden");
  document.getElementById("resultContent").classList.remove("hidden");

  // Populate name
  document.getElementById("resultName").textContent = `Hello, ${formData.name}! 👋`;

  // Populate score
  document.getElementById("scoreDisplay").textContent = `${formData.score} / 20`;

  // Animate score bar (max = 20)
  const pct = (formData.score / 20) * 100;
  setTimeout(() => {
    document.getElementById("scoreBar").style.width = pct + "%";
  }, 200);

  // Category badge
  const badge = document.getElementById("categoryBadge");
  badge.textContent = formData.category + " Readiness";
  badge.className = "category-badge " + formData.category.toLowerCase();

  // Advisory text
  document.getElementById("advisoryText").textContent = advisory;
}

// -----------------------------------------------
// RESET – Start Over
// -----------------------------------------------
function resetAssessment() {
  // Reset formData
  formData = {
    name: "", digitalExp: "", resources: 0, guidance: 0,
    planning: 0, consistency: 0, constraints: "", usability: "",
    feedback: "", score: 0, category: ""
  };

  // Clear all inputs
  document.getElementById("farmerName").value = "";
  document.querySelectorAll('input[name="digitalExp"]').forEach(r => r.checked = false);
  ["resources", "guidance", "planning", "consistency",
   "constraints", "usability"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("feedback").value = "";

  // Remove error states
  document.querySelectorAll(".field-error").forEach(e => e.classList.remove("show"));
  document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));

  // Reset score bar
  document.getElementById("scoreBar").style.width = "0%";

  // Go back to section 1
  document.getElementById("resultSection").classList.add("hidden");
  goToSection(1);
}

// -----------------------------------------------
// SAVE – Store results in localStorage
// -----------------------------------------------
function saveToLocal() {
  const toSave = {
    name:        formData.name,
    digitalExp:  formData.digitalExp,
    resources:   formData.resources,
    guidance:    formData.guidance,
    planning:    formData.planning,
    consistency: formData.consistency,
    constraints: formData.constraints,
    usability:   formData.usability,
    feedback:    formData.feedback,
    score:       formData.score,
    category:    formData.category,
    savedAt:     new Date().toLocaleString()
  };
  localStorage.setItem("agriReadinessData", JSON.stringify(toSave));
  alert(`✅ Results saved locally for ${formData.name}!\nYour inputs will be pre-filled next time you visit.`);
}

// -----------------------------------------------
// SCROLL TO TOP of form
// -----------------------------------------------
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
