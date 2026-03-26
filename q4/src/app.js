// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {

    const text = document.getElementById("profileInput").value;

    // Parse user-provided JSON.
    let profile;
    try {
        profile = JSON.parse(text);
    } catch (e) {
        // Reject invalid JSON input.
        alert("Invalid profile data.");
        return;
    }

    // Basic shape check before rendering.
    if (!profile || typeof profile.username !== "string" || !Array.isArray(profile.notifications)) {
        alert("Invalid profile structure.");
        return;
    }

    currentProfile = profile;

    renderProfile(profile);
}


/* -------------------------
   Render Profile
-------------------------- */


function renderProfile(profile) {

    // Use textContent to avoid HTML injection.
    document.getElementById("username").textContent = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");

        // Render each notification as plain text.
        li.textContent = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    localStorage.setItem("profile", JSON.stringify(currentProfile));

    alert("Session saved");
}


function loadSession() {

    const stored = localStorage.getItem("profile");

    if (stored) {

        // Validate stored data before rendering.
        let profile;
        try {
            profile = JSON.parse(stored);
        } catch (e) {
            // Stop if stored JSON is broken.
            alert("Stored session data is corrupted.");
            return;
        }

        // Basic shape check for stored profile.
        if (!profile || typeof profile.username !== "string" || !Array.isArray(profile.notifications)) {
            alert("Stored session data is invalid.");
            return;
        }

        currentProfile = profile;

        renderProfile(profile);
    }
}
