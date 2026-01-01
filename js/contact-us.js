
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const checkbox = document.getElementById('termsCheckbox');
  const button = this.querySelector('.submit-button');

  if (!checkbox.checked) {
    alert('Please agree to the terms and privacy policy.');
    return;
  }

  const formData = {
    formType: 'contact', 
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  button.classList.add('loading');
  button.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert('Message sent successfully!');
      this.reset();
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    alert('Server error. Please try later.');
  } finally {
    button.classList.remove('loading');
    button.disabled = false;
  }
});

/// ============ OLD
// document.getElementById('contactForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const checkbox = document.getElementById('termsCheckbox');
//     const button = document.querySelector('.submit-button');

//     if (!checkbox.checked) {
//         alert('Please agree to the terms and privacy policy.');
//         return;
//     }

//     const formData = {
//         firstName: document.getElementById('firstName').value.trim(),
//         lastName: document.getElementById('lastName').value.trim(),
//         email: document.getElementById('email').value.trim(),
//         subject: document.getElementById('subject').value.trim(),
//         message: document.getElementById('message').value.trim()
//     };

//     // Show loader
//     button.classList.add('loading');
//     button.disabled = true;

//     try {
//         const response = await fetch('http://localhost:3000/send-email', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         });

//         const result = await response.json();

//         if (result.success) {
//             alert('Message sent successfully!');
//             this.reset();
//         } else {
//             alert('Failed to send message. Please try again.');
//         }
//     } catch (error) {
//         alert('Server error. Please try later.');
//     } finally {
//         button.classList.remove('loading');
//         button.disabled = false;
//     }
// });



const tabs = document.querySelectorAll(".location-tab-inside");

const content = {
    head: {
        tabTitle1: "Head Office",
        tabTitle2: "UAE",
        address: "Office# 29, 3rd Floor Tower 1, Mazyad Mall, Z9 MBZ, Abu Dhabi, United Arab Emirates",
        contactPerson: "Muhammad Saad Khan",
        number: "+971 8943 4937",
        email: "saad@inseyab.com",
        image: "../assets/uae.png"
    },

     regional: {
        tabTitle1: "Regional Office",
        tabTitle2: "Saudi Arabia",
        address: "8602, Prince Mansur Ibn Abdulaziz Road Al-Ulaya, Tower #19, Unit No:5, Riyadh 12611, Saudi Arabia PO BOX 3194",
        contactPerson: "Muhammad Saad Khan",
        number: "+966 53 857 4176",
        email: "saad@inseyab.com",
        image: "../assets/saudi.png"
    },

     development: {
        tabTitle1: "Development Office",
        tabTitle2: "Pakistan",
        address: "Office# 104 & 117, First Floor, NASTP Shahrah-e-Faisal Cantonment, Karachi, Karachi City, Sindh, 75240",
        contactPerson: "Kashif Ali Syed",
        number: "+92 333 2221470",
        email: "kashifalisyed@inseyab.com",
        image: "../assets/pakistan.png"
    },
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("loc-active"));
        tab.classList.add("loc-active");

        const type = tab.dataset.tab;

        document.getElementById("tabTitle1").innerText = content[type].tabTitle1;
        document.getElementById("tabTitle2").innerText = content[type].tabTitle2;
        document.getElementById("address").innerText = content[type].address;
        document.getElementById("contactPerson").innerText = content[type].contactPerson;
        document.getElementById("number").innerText = content[type].number;
        document.getElementById("email").innerText = content[type].email;
        document.getElementById("tabImage").src = content[type].image;
    });

    
});
/// FAQ Section

const faq2Items = document.querySelectorAll(".contactus-faq-item");

faq2Items.forEach(item => {
  const question = item.querySelector(".contactus-faq-question");
  const icon = item.querySelector(".icon");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
    icon.textContent = item.classList.contains("active") ? "×" : "+";
  });
});
