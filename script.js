// =====================================================================
// DSA CONCEPT 1: HASH MAP (Mapping Symptoms to Diseases)
// =====================================================================
// In JavaScript, an Object literal ({}) acts as a Hash Table/Map.
// Keys = Symptoms (Strings)
// Values = Associated Diseases (Stored as Sets)
// Using Sets as values allows us to perform extremely fast O(1) lookups 
// during the intersection algorithm, rather than O(N) array searches.
const symptomDatabase = {
    "🤒 Fever": new Set(["Influenza (Flu)", "Malaria", "Dengue Fever", "Pneumonia", "Strep Throat", "Gastroenteritis"]),
    "🗣️ Cough": new Set(["Influenza (Flu)", "Common Cold", "Pneumonia", "Bronchitis", "Asthma", "Tuberculosis"]),
    "🤕 Headache": new Set(["Influenza (Flu)", "Malaria", "Dengue Fever", "Migraine", "Common Cold", "Tension Headache"]),
    "🥱 Fatigue": new Set(["Influenza (Flu)", "Anemia", "Malaria", "Dengue Fever", "Mononucleosis", "Diabetes"]),
    "🤢 Nausea": new Set(["Gastroenteritis", "Food Poisoning", "Migraine", "Malaria", "Appendicitis"]),
    "🧃 Sore Throat": new Set(["Common Cold", "Strep Throat", "Influenza (Flu)", "Mononucleosis"]),
    "🫁 Shortness of Breath": new Set(["Asthma", "Pneumonia", "Bronchitis", "Anemia", "Panic Attack"]),
    "💪 Muscle Ache": new Set(["Influenza (Flu)", "Dengue Fever", "Malaria", "Fibromyalgia", "Lyme Disease"]),
    "🥶 Chills": new Set(["Influenza (Flu)", "Pneumonia", "Malaria", "Strep Throat", "Gastroenteritis"])
};

// --- DOM MANIPULATION: Dynamically Generate UI ---
// We iterate through our Hash Map keys to create the HTML elements automatically.
// This ensures the UI is always perfectly synced with the database.
const symptomsGrid = document.getElementById("symptomsGrid");

Object.keys(symptomDatabase).forEach((symptom, index) => {
    const wrapper = document.createElement("div");
    
    // Create the hidden input checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `symptom-${index}`; 
    checkbox.value = symptom; 
    
    // Create the visible, styled label (the "pill")
    const label = document.createElement("label");
    label.htmlFor = `symptom-${index}`; 
    label.className = "pill-label";
    label.innerText = symptom;
    
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    symptomsGrid.appendChild(wrapper);
});


// =====================================================================
// ALGORITHM 1: MULTIPLE SET INTERSECTION
// =====================================================================
// Goal: Find diseases that share ALL selected symptoms.
// Time Complexity: O(S * D) where S is number of symptoms selected, 
// and D is the number of diseases in the smallest set.
document.getElementById("analyzeBtn").addEventListener("click", () => {
    
    // 1. Gather all selected symptoms from the DOM
    const checkboxes = document.querySelectorAll('.symptom-pills input[type="checkbox"]:checked');
    const selectedSymptoms = Array.from(checkboxes).map(cb => cb.value);
    
    const resultsArea = document.getElementById("resultsArea");
    resultsArea.classList.remove("hidden"); // Reveal output box

    // Edge case: Nothing selected
    if (selectedSymptoms.length === 0) {
        resultsArea.innerHTML = "<strong>Oops!</strong> Please select at least one symptom to run the algorithm.";
        return;
    }

    // Initialize tracking variable for our intersection
    let possibleDiseases = null;

    // 2. Perform Mathematical Set Intersection (A ∩ B ∩ C...)
    for (const symptom of selectedSymptoms) {
        // O(1) retrieval from our Hash Map
        const diseasesForSymptom = symptomDatabase[symptom];
        
        if (possibleDiseases === null) {
            // First iteration: Initialize our baseline possibilities
            possibleDiseases = new Set(diseasesForSymptom);
        } else {
            // Subsequent iterations: Intersect current possibilities with new symptom's diseases
            const intersection = new Set();
            for (const disease of possibleDiseases) {
                // EXTREMELY IMPORTANT FOR DSA: 
                // Because diseasesForSymptom is a Set, .has() runs in O(1) constant time.
                // If it were an array, this would be an O(N) linear scan, making the whole algorithm O(N^2).
                if (diseasesForSymptom.has(disease)) {
                    intersection.add(disease);
                }
            }
            // Overwrite our running list with the newly narrowed down list
            possibleDiseases = intersection;
        }
    }

    // 3. Render Results
    if (possibleDiseases.size > 0) {
        // Convert the final Set back into an array to format it as a string
        const diseasesList = Array.from(possibleDiseases).join("</span>, <span>");
        resultsArea.innerHTML = `<strong>Likely Matches:</strong> <br><br><span>${diseasesList}</span>`;
    } else {
        // If the intersection yields an empty set, no single disease matches the combination
        resultsArea.innerHTML = "No exact matches for that specific combination. <em>(Intersection resulted in an empty set).</em>";
    }
});


// =====================================================================
// ALGORITHM 2: LINEAR SEARCH 
// =====================================================================
// Goal: Look up a specific disease to find associated symptoms.
// Because our Hash Map is indexed by Symptoms, finding a Disease requires
// iterating over every single entry. This represents an O(N) Time Complexity.
document.getElementById("searchBtn").addEventListener("click", () => {
    
    // Grab user input and normalize it (lowercase) for accurate comparison
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const searchResultArea = document.getElementById("searchResultArea");
    
    searchResultArea.classList.remove("hidden");

    if (!query) {
        searchResultArea.innerHTML = "Please type a disease name to search.";
        return;
    }

    let foundSymptoms = [];
    const allSymptoms = Object.keys(symptomDatabase); 
    
    // Perform Linear Search O(N)
    // We iterate through every key (Symptom) in the Hash Map
    for (let i = 0; i < allSymptoms.length; i++) {
        const currentSymptom = allSymptoms[i];
        const associatedDiseases = symptomDatabase[currentSymptom];
        
        // Iterate through the Set to see if our query exists within it
        for (const disease of associatedDiseases) {
            if (disease.toLowerCase() === query) {
                // Match found! 
                // We split the string by space to remove the emoji for a cleaner text output
                const cleanSymptom = currentSymptom.split(" ")[1]; 
                foundSymptoms.push(cleanSymptom);
                break; // Break inner loop to prevent redundant checks
            }
        }
    }

    // Output Results
    if (foundSymptoms.length > 0) {
        searchResultArea.innerHTML = `<strong>Symptoms of ${query.toUpperCase()}:</strong><br><br><span>${foundSymptoms.join(", ")}</span>`;
    } else {
        searchResultArea.innerHTML = `Could not find "<strong>${query}</strong>" in the database.`;
    }
});