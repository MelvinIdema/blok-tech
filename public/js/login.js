/**
 * Sections
 * @type {HTMLElement}
 */
const passwordSection = document.getElementById("passwordSection");
const controls = document.querySelector(".controls");

/**
 * Inputs & Buttons
 * @type {HTMLElement}
 */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/**
 * --Progressive Enhancement--
 * Hides password input and login button. And displays
 * password and login button again when forms are filled in.
 */
passwordSection.style.display = "none";
controls.style.display = "none";
emailInput.addEventListener("input", _ => passwordSection.style.display = "block");
passwordInput.addEventListener("input", _ => controls.style.display = "block");
