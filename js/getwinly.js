//顯示周年
// Get the current year
const currentYear = new Date().getFullYear();

// Calculate the difference
const result = currentYear - 1977;

// Find the element with id 'winlyAnniversary' and set its content
const anniversaryElement = document.getElementById('winlyAnniversary');
if (anniversaryElement) {
    anniversaryElement.textContent = result;
}
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = currentYear;
}
