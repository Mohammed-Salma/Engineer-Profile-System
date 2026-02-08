let engineers = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    specialty: "Software Engineering",
    experience: "5 years",
    hired: false,
  },
  {
    id: 2,
    name: "Sara Khaled",
    specialty: "Civil Engineering",
    experience: "7 years",
    hired: true,
  },
  {
    id: 3,
    name: "Khaled Abdullah",
    specialty: "Mechanical Engineering",
    experience: "4 years",
    hired: false,
  },
  {
    id: 4,
    name: "Fatimah Ali",
    specialty: "Electrical Engineering",
    experience: "6 years",
    hired: false,
  },
  {
    id: 5,
    name: "Mohamed Hassan",
    specialty: "Industrial Engineering",
    experience: "8 years",
    hired: true,
  },
  {
    id: 6,
    name: "Noura Saeed",
    specialty: "Chemical Engineering",
    experience: "3 years",
    hired: false,
  },
  {
    id: 7,
    name: "Youssef Ibrahim",
    specialty: "Software Engineering",
    experience: "5 years",
    hired: false,
  },
  {
    id: 8,
    name: "Lina Mahmoud",
    specialty: "Architecture Engineering",
    experience: "9 years",
    hired: true,
  },
  {
    id: 9,
    name: "Omar Rashid",
    specialty: "Telecommunications Engineering",
    experience: "6 years",
    hired: false,
  },
  {
    id: 10,
    name: "Hoda Abdelrahman",
    specialty: "Environmental Engineering",
    experience: "4 years",
    hired: false,
  },
];

let currentEngineerId = null;

// Initialization
window.onload = function () {
  loadFromStorage();
  showRandomEngineers();
  setupSearch();
};

// Save to LocalStorage
function saveToStorage() {
  localStorage.setItem("engineers", JSON.stringify(engineers));
}

// Load from LocalStorage
function loadFromStorage() {
  const saved = localStorage.getItem("engineers");
  if (saved) {
    engineers = JSON.parse(saved);
  } else {
    saveToStorage();
  }
}

// Show 8 random engineers
function showRandomEngineers() {
  const shuffled = [...engineers].sort((a, b) => 0.5 - Math.random());
  const randomEight = shuffled.slice(0, 8);
  const sortedEight = randomEight.sort((a, b) => a.name.localeCompare(b.name));
  displayEngineers(sortedEight);
}

// Display engineers
function displayEngineers(list) {
  const container = document.getElementById("engineersList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; width: 100%; padding: 20px; color: #666; font-size: 1.2rem;">
        <p>🔍 No engineers found with this name.</p>
      </div>
    `;
    return;
  }

  list.forEach((engineer) => {
    const card = document.createElement("div");
    card.className = `engineer-card ${engineer.hired ? "hired" : ""}`;
    card.innerHTML = `
            <h3>${engineer.name}</h3>
            <p>${engineer.specialty} - ${engineer.experience}</p>
            <p>${engineer.hired ? "✅ Employed" : "❌ Not Employed"}</p>
        `;
    card.onclick = () => openModal(engineer.id);
    container.appendChild(card);
  });
}

// Setup Search
function setupSearch() {
  const searchInput = document.getElementById("search");
  searchInput.oninput = function () {
    const term = this.value.toLowerCase();
    if (term === "") {
      showRandomEngineers();
    } else {
      const filtered = engineers
        .filter((e) => e.name.toLowerCase().includes(term))
        .sort((a, b) => a.name.localeCompare(b.name));
      displayEngineers(filtered);
    }
  };
}

// Open Details Modal
function openModal(id) {
  currentEngineerId = id;
  const engineer = engineers.find((e) => e.id === id);

  document.getElementById("modalName").textContent = engineer.name;
  document.getElementById("modalSpecialty").textContent = engineer.specialty;
  document.getElementById("modalExperience").textContent = engineer.experience;
  document.getElementById("modalHired").textContent = engineer.hired
    ? "Employed"
    : "Not Employed";

  document.getElementById("modal").style.display = "flex";
}

// Close Modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Toggle Hiring Status
function toggleHire() {
  const engineer = engineers.find((e) => e.id === currentEngineerId);
  engineer.hired = !engineer.hired;
  saveToStorage();

  // Update View
  document.getElementById("modalHired").textContent = engineer.hired
    ? "Employed"
    : "Not Employed";
  showRandomEngineers();
  closeModal();
}
