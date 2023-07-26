/* eslint-disable object-shorthand */
import bookLoad from './modules/bookBlock.js';
import myDateTime from './modules/date-time.js';
import displayNavigation from './modules/displayNavigation.js';

// Fetched from module
document.addEventListener('DOMContentLoaded', () => {
  bookLoad();
  displayNavigation();
  myDateTime();
});