const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("solution-details");
const data = SOLUTIONS_DATA[serviceKey];

/// If Data is not present for the Service
if (!data) {
    document.body.innerHTML = "<h1>Service Not Found</h1>";
    throw new Error("Invalid service");
}

// Function to render help cards
function renderKeyFeatureCards(data) {
    console.log("load DOM Card");
    const wrapper = document.getElementById('keyFeatureWrapper');

    if (!wrapper) {
        console.error('keyFeatureWrapper not found');
        return;
    }

    if (!data || !data.keyFeatures) {
        console.error('No help data available');
        return;
    }

    // Clear existing content
    wrapper.innerHTML = '';

    // Create and append cards
    data.keyFeatures.forEach(item => {
        const card = document.createElement('div');
        card.className = 'key-feature';
        card.innerHTML = `
            <img src="${item.icon}">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        `;
        wrapper.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    /// Hero Section Background Image
    const bgSection = document.getElementById("bg");
    bgSection.style.backgroundImage = `url("${data.backgroundImage}")`;
    bgSection.style.backgroundSize = "cover";
    bgSection.style.backgroundPosition = "center";
    bgSection.style.backgroundRepeat = "no-repeat";

    // Hero
    document.getElementById("pageTitle").textContent = data.title;
    document.getElementById("heroText").textContent = data.heroText;
    // document.getElementById("featureSubheading").textContent = data.keyFeaturesSubHeading;

    // Value Proposition
    const listContainer = document.getElementById("valuePropositionList");

    data.valuePropositions.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listContainer.appendChild(li);
    });

    renderKeyFeatureCards(data);
});