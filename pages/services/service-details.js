const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("service");
const data = SERVICES_DATA[serviceKey];

/// If Data is not present for the Service
if (!data) {
    document.body.innerHTML = "<h1>Service Not Found</h1>";
    throw new Error("Invalid service");
}

// Function to render help cards
function renderHelpCards(data) {
    console.log("load DOM Card");
    const wrapper = document.getElementById('helpCardsWrapper');

    if (!wrapper) {
        console.error('helpCardsWrapper not found');
        return;
    }

    if (!data || !data.help) {
        console.error('No help data available');
        return;
    }

    // Clear existing content
    wrapper.innerHTML = '';

    // Create and append cards
    data.help.forEach(item => {
        const card = document.createElement('div');
        card.className = 'help-card';
        card.innerHTML = `
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

    // Implementation
    document.getElementById("implLogo").src = data.implementation.logo;
    document.getElementById("implTitle").textContent = data.implementation.title;
    document.getElementById("implDesc").textContent = data.implementation.description;

    // Resource Capabilities (Conditional)
    // if (data.showResourceCapabilities) {
    //     const section = document.getElementById("resourceCapabilities");
    //     if (section) {
    //         section.classList.remove("hidden");
    //         const list = document.getElementById("capabilitiesList");
    //         data.resourceCapabilities.forEach(cap => {
    //             list.innerHTML += `
    //                 <div class="capability">
    //                     <span>${cap.name}</span>
    //                     <progress value="${cap.value}" max="100"></progress>
    //                 </div>
    //             `;
    //         });
    //     }
    // }

    // Resource Capabilities (Conditional)
    if (data.showResourceCapabilities) {
        const section = document.getElementById("resourceCapabilities");
        const list = document.getElementById("capabilitiesList");

        if (section && list) {
            section.classList.remove("hidden");
            list.innerHTML = '';

            data.resourceCapabilities.forEach(cap => {
                const item = document.createElement('div');
                item.className = 'capability-item';
                item.innerHTML = `
                <div class="capability-header">
                    <span class="capability-name">${cap.name}</span>
                    <span class="capability-percentage">${cap.value}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: 0%" data-value="${cap.value}"></div>
                </div>
            `;
                list.appendChild(item);
            });

            // Animate progress bars
            setTimeout(() => {
                document.querySelectorAll('.progress-bar-fill').forEach(bar => {
                    const value = bar.getAttribute('data-value');
                    bar.style.width = value + '%';
                });
            }, 100);
        }
    } 

    /// Challenges Card (your new accordion implementation)
    const wrapper = document.getElementById('challengesCardsWrapper');
    if (wrapper && data.challenges) {
        data.challenges.forEach(ch => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <button class="category-trigger">
                    <div class="story-category-header">
                        <span>${ch.title}</span>
                        <img src="../../assets/icons/ic-arrow-up-2.png" alt="">
                    </div>
                    <span class="chevron"></span>
                </button>
                <div class="category-panel">
                    <p>${ch.text}</p>
                </div>
            `;
            wrapper.appendChild(card);
        });

        // Accordion functionality
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            const btn = card.querySelector('.category-trigger');
            btn.addEventListener('click', () => {
                const isOpen = card.classList.contains('active');
                cards.forEach(c => c.classList.remove('active'));
                if (!isOpen) card.classList.add('active');
            });
        });
    }

    // ✅ Call the function directly here (removed nested DOMContentLoaded)
    renderHelpCards(data);
});