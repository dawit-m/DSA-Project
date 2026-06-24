# 🩺 MedCheck Pro: Educational Symptom Analyzer

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

**MedCheck Pro** is an educational web application designed to simulate a medical "differential diagnosis" process. It was built strictly to demonstrate the practical application of core Data Structures and Algorithms (DSA) in a real-world scenario.

> ⚠️ **Disclaimer:** This project is for educational and grading purposes only. It is not intended for medical use or clinical diagnosis. Always consult a healthcare professional for medical advice.

---

## 🧠 Core DSA Concepts Demonstrated

This project implements three primary algorithms and data structures to ensure high performance and efficiency:

### 1. Hash Maps (Symptom $\rightarrow$ Disease Mapping)
* **Implementation:** JavaScript Object Literal mapping string keys to `Set` values.
* **Why:** Instead of iterating through standard arrays to find a symptom (which would take `O(N)` time), the Hash Map allows for instant, **`O(1)` constant time** lookups when a user selects a symptom.

### 2. Set Intersection (Differential Diagnosis)
* **Implementation:** Mathematical Set Intersection ($A \cap B$) to find diseases that share *all* selected symptoms.
* **Why:** By storing associated diseases in JavaScript `Set` objects rather than Arrays, checking if a disease exists in a subsequent set uses the `.has()` method. This drops the intersection lookup time from a sluggish `O(N^2)` to a highly optimized **`O(1)` per item**.

### 3. Linear Search (Database Lookup)
* **Implementation:** Iterating through the Hash Map keys to find diseases.
* **Why:** Because our database is indexed by *Symptoms* (Keys) rather than *Diseases* (Values), searching for a specific disease requires an **`O(N)` Time Complexity** search across the entire dataset. This demonstrates the trade-offs of single-index data structures.

---

## ✨ Features

* **Dynamic UI Generation:** The HTML symptom selectors ("Pills") are generated dynamically by JavaScript based on the Hash Map. Updating the database automatically updates the UI.
* **Modern Glassmorphism Design:** Features a responsive, frosted-glass interface utilizing modern CSS variables, Flexbox, and CSS Grid.
* **Real-time Analysis:** Algorithms execute and render results instantly to the DOM without requiring page reloads.

---

## 🛠️ Installation & Usage

Because this project is built with Vanilla HTML, CSS, and JS, no complex build tools or package managers are required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/MedCheck-Pro.git](https://github.com/YOUR_USERNAME/MedCheck-Pro.git)
    ```
2.  **Navigate to the directory:**
    ```bash
    cd MedCheck-Pro
    ```
3.  **Run the app:**
    Simply double-click the `index.html` file to open it in any modern web browser (Chrome, Firefox, Safari, Edge).

---

## 📁 Project Structure

* `index.html` - The structural skeleton and layout of the dashboard.
* `style.css` - The styling engine, featuring Glassmorphism and responsive design.
* `script.js` - The algorithmic brain containing the database, UI generation, and DSA logic.

---
*Created for educational purposes.*
