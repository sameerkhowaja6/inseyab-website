/// FAQ Section

console.log('====== industries js');

const faq3Items = document.querySelectorAll(".industries-faq-item");

faq3Items.forEach(item => {
  const question = item.querySelector(".industries-faq-question");
  const icon = item.querySelector(".icon");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
    icon.textContent = item.classList.contains("active") ? "×" : "+";
  });
});