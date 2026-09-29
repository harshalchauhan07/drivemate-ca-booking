// Demo settings: replace with your real WhatsApp number (country code + number, no + or spaces).
const WHATSAPP_NUMBER = '919876543210';
const bookingForm = document.querySelector('#booking');
const dateInput = document.querySelector('#date');
const localToday = new Date();
const dateString = [localToday.getFullYear(), String(localToday.getMonth()+1).padStart(2,'0'), String(localToday.getDate()).padStart(2,'0')].join('-');
dateInput.min = dateString;
dateInput.value = dateString;
function openWhatsApp(message) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  const pickup = document.querySelector('#pickup').value.trim();
  const drop = document.querySelector('#drop').value.trim();
  const date = dateInput.value;
  const passengers = document.querySelector('#passengers').value;
  if (!pickup || !drop || !date) return;
  openWhatsApp(`Hello DriveMate! I would like to enquire about a cab.\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nPassengers: ${passengers}\nPlease share available cars and the total fare.`);
});
document.querySelectorAll('.book-car').forEach(btn => btn.addEventListener('click', () => {
  const car = btn.dataset.car;
  const pickup = document.querySelector('#pickup').value.trim() || 'To be confirmed';
  const drop = document.querySelector('#drop').value.trim() || 'To be confirmed';
  const date = dateInput.value || 'To be confirmed';
  openWhatsApp(`Hello DriveMate! I am interested in the ${car}.\nPickup: ${pickup}\nDrop: ${drop}\nTravel date: ${date}\nPlease confirm availability and the final price.`);
}));
document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.car-card').forEach(card => {card.hidden = btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter;});
}));
const menuBtn = document.querySelector('#menuBtn');
const navLinks = document.querySelector('#navLinks');
menuBtn.addEventListener('click', () => {const isOpen = navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded', String(isOpen));menuBtn.textContent = isOpen ? '✕' : '☰';});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {navLinks.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰';}));
document.querySelector('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`DriveMate enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:drivemate.cabs@example.com?subject=${subject}&body=${body}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
