// EmailJS Init
(function () {
  emailjs.init("9Y1NrbHC5nszStY9E"); 
})();

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

// Form submission
document.getElementById("applicationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_4hksblt",   
    "template_njzi52a", 
    this
  ).then(() => {
    alert("Application submitted successfully!");
    this.reset();
  }, (error) => {
    alert("Failed to send application.");
    console.error(error);
  });
});
