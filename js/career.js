// Job selection
const jobItems = document.querySelectorAll(".job-item");
const jobRoleInput = document.getElementById("jobRole");

jobItems.forEach(item => {
  item.addEventListener("click", () => {
    jobItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    jobRoleInput.value = item.dataset.job;
  });
});

// // Form submission
// document.getElementById("applicationForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   emailjs.sendForm(
//     "service_4hksblt",   
//     "template_njzi52a", 
//     this
//   ).then(() => {
//     alert("Application submitted successfully!");
//     this.reset();
//   }, (error) => {
//     alert("Failed to send application.");
//     console.error(error);
//   });
// });

document.getElementById('applicationForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const button = this.querySelector('.submit-button');

  const formData = {
    formType: 'application',
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    city: document.getElementById('city').value.trim(),
    linkedin: document.getElementById('linkedin').value.trim(),
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
      alert('Application submitted successfully!');
      this.reset();
    } else {
      alert('Failed to submit application.');
    }
  } catch (error) {
    alert('Server error. Please try again later.');
  } finally {
    button.classList.remove('loading');
    button.disabled = false;
  }
});
