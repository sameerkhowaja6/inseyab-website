// Self-contained, no global pollution, works for any number of cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.category-card');

  cards.forEach(card => {
    const btn = card.querySelector('.category-trigger');
    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('active');

      // close all
      cards.forEach(c => c.classList.remove('active'));

      // open clicked if it was closed
      if (!isOpen) card.classList.add('active');
    });
  });
});