'use strict';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
navigator.serviceWorker.ready.then(registration => {
  return registration.sync.register('syncMessage');
}).catch(error => {
  console.error('Sync registration failed:', error);
});


/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (!elem) return; // If elem is null or undefined, stop the function.

  // Check if elem is a NodeList or an individual element
  if (NodeList.prototype.isPrototypeOf(elem) && elem.length) {
    elem.forEach((el) => el.addEventListener(type, callback));
  } else if (elem.addEventListener) {
    elem.addEventListener(type, callback);
  }
}





/**
 * navbar toggle
 */

const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);


const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElemOnScroll);
// Check if the browser supports notifications
if ('Notification' in window) {
  // Request permission from the user
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // Permission granted, you can now display notifications
      console.log('Notification permission granted');
    } else {
      // Permission denied
      console.warn('Notification permission denied');
    }
  });
} else {
  // Browser does not support notifications
  console.warn('Notifications not supported');
}
