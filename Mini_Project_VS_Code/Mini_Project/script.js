// ES6 module used by the ExploreHub landing page.
const appCards = document.querySelectorAll('.app-card');
appCards.forEach((card) => {
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') card.click();
  });
});
