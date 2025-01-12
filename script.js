let currentNumber = 25; // Starting number
const fallingPage = document.querySelector(".falling-page");
const stackedPage = document.querySelector(".stacked-page");

function formatNumber(number) {
  return number < 10 ? `0${number}` : number.toString(); // Format to two digits
}

function updateBackground() {
  const currentHour = new Date().getHours();
  const body = document.body;

  if (currentHour >= 5 && currentHour < 12) {
    // Morning (5 AM - 11:59 AM)
    body.style.backgroundImage = "url('morning.jpg')";
  } else if (currentHour >= 12 && currentHour < 17) {
    // Afternoon (12 PM - 4:59 PM)
    body.style.backgroundImage = "url('afternoon.jpg')";
  } else if (currentHour >= 17 && currentHour < 20) {
    // Evening (5 PM - 7:59 PM)
    body.style.backgroundImage = "url('./evening.jpg')";
  } else {
    // Night (8 PM - 4:59 AM)
    body.style.backgroundImage = "url('night.jpg')";
  }

  // Ensure the background image covers the entire body
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

// Call the function initially
updateBackground();

// Optionally, update every hour
//setInterval(updateBackground, 3600000);  Update every 1 hour

function updatePages() {
  // Stop the countdown at 00
  if (currentNumber <= 0) {
    clearInterval(countdownInterval); // Stop the interval
    stackedPage.textContent = "00"; // Ensure the calendar shows 00
    fallingPage.style.animation = "none"; // Stop the falling animation
    return;
  }

  // Calculate the next number
  const nextNumber = currentNumber > 1 ? currentNumber - 1 : 0;

  // Start falling animation for the topmost page
  fallingPage.style.animation = "fall 1s ease-in-out forwards";

  // After the animation ends, reset the falling page and update stacked page
  setTimeout(() => {
    // Reset falling page position and update number
    fallingPage.style.animation = "none";
    fallingPage.textContent = formatNumber(nextNumber);

    // Swap numbers between falling and stacked pages
    stackedPage.textContent = formatNumber(nextNumber > 1 ? nextNumber - 1 : 0);

    // Reset animation to make it ready for the next fall
    void fallingPage.offsetWidth; // Trigger reflow to reset animation
  }, 2000);

  // Update current number for the next cycle
  currentNumber = nextNumber;
}

// Start the countdown
const countdownInterval = setInterval(updatePages, 86400000); //updates every 24 hours
