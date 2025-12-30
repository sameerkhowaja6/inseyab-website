const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("solution");
const data = SINGLE_SOLUTION_DATA[serviceKey];

/// If Data is not present for the Service
if (!data) {
    document.body.innerHTML = "<h1>Solutions Not Found</h1>";
    throw new Error("Invalid solution");
}

// Function to render single solution types
function renderSolutionTypes(data) {
    console.log("load DOM Card for solutions types");
    const wrapper = document.getElementById('singleSolutionTypesWrapper');

    if (!wrapper) {
        console.error('singleSolutionTypesWrapper not found');
        return;
    }

    if (!data || !data.solutionTypes) {
        console.error('No solution types data available');
        return;
    }

    // Clear existing content
    wrapper.innerHTML = '';

    // Create and append cards
   data.solutionTypes.forEach(item => {
  const card = document.createElement('div');
  card.className = 'solution-item';

  card.innerHTML = `
    <a class="solution-details-anchor" href="solution-details/solution-details.html?solution-details=${item.route}">
    <div class="solution-title-div">
      <img src="${item.icon}">
      <img src="../../assets/solutions/arrow-up-2.png" alt="arrow">
    </div>
    <div class="solution-title">
      ${item.title}
    </div>
     <div class="solution-description">
      ${item.subTitle}
    </div>
    </a>
  `;

  wrapper.appendChild(card);
});

}



document.addEventListener('DOMContentLoaded', () => {
    // Hero
    document.getElementById("pageTitle").textContent = data.title;
    document.getElementById("pageSubTitle").textContent = data.subTitle;
    renderSolutionTypes(data);
});