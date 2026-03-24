// ── DOM Elements ──
const hamburger       = document.getElementById('hamburger');
const hamburgerDropdown = document.getElementById('hamburgerDropdown');
const vehicleSelect   = document.getElementById('vehicleSelect');
const pickupDate      = document.getElementById('pickupDate');
const locationSelect  = document.getElementById('locationSelect');
const searchBtn       = document.getElementById('searchBtn');
const searchError     = document.getElementById('searchError');

// ── Set minimum date to today ──
const today = new Date().toISOString().split('T')[0];
pickupDate.setAttribute('min', today);

// ── Hamburger Dropdown Toggle ──
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('open');
  hamburgerDropdown.classList.toggle('open');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !hamburgerDropdown.contains(e.target)) {
    hamburger.classList.remove('open');
    hamburgerDropdown.classList.remove('open');
  }
});

// ── Select color update ──
function updateSelectColor(el) {
  el.classList.toggle('selected', !!el.value);
}
vehicleSelect.addEventListener('change',  () => updateSelectColor(vehicleSelect));
locationSelect.addEventListener('change', () => updateSelectColor(locationSelect));

// ── Clear field errors on fix ──
function clearFieldError(field) {
  field.closest('.search-field').classList.remove('error');
  const anyError = document.querySelector('.search-field.error');
  if (!anyError) searchError.textContent = '';
}
vehicleSelect.addEventListener('change',  () => clearFieldError(vehicleSelect));
pickupDate.addEventListener('change',     () => clearFieldError(pickupDate));
locationSelect.addEventListener('change', () => clearFieldError(locationSelect));

// ── Search Validation → redirect to book.html with params ──
searchBtn.addEventListener('click', () => {
  // Reset errors
  searchError.textContent = '';
  document.querySelectorAll('.search-field').forEach(f => f.classList.remove('error'));

  const vehicle  = vehicleSelect.value;
  const date     = pickupDate.value;
  const location = locationSelect.value;
  const errors   = [];

  if (!vehicle)  { errors.push('vehicle type');  vehicleSelect.closest('.search-field').classList.add('error'); }
  if (!date)     { errors.push('pickup date');    pickupDate.closest('.search-field').classList.add('error'); }
  if (!location) { errors.push('location');       locationSelect.closest('.search-field').classList.add('error'); }

  if (errors.length) {
    searchError.textContent = `Please select: ${errors.join(', ')}.`;
    return;
  }

  // All valid — navigate to book.html with search params
  const params = new URLSearchParams({ category: vehicle, date, location });
  window.location.href = `book.html?${params.toString()}`;
});