function confirmBooking() {
  alert(
    'Booking Confirmed for Romulo Ordonez! Redirecting to payment portal...'
  );
}

// Logic to change "Show More" to "Show Less" when clicking
document.querySelectorAll('.collapse').forEach((item) => {
  item.addEventListener('shown.bs.collapse', (event) => {
    event.target.parentElement.querySelector('.show-more').innerText =
      'Show Less ▴';
  });
  item.addEventListener('hidden.bs.collapse', (event) => {
    event.target.parentElement.querySelector('.show-more').innerText =
      'Show More Details ▾';
  });
});
