// Wait for the DOM to load before running the animation
document.addEventListener("DOMContentLoaded", function () {
  // Select the title element
  const title = document.querySelector(".title");

  // Split the text content of the title into individual letters
  const titleLetters = title.textContent.split("");
  title.textContent = ""; // Clear the original title text

  // Create a GSAP timeline for the title animation
  const titleTl = gsap.timeline({
    repeat: 1, // Infinite loop
    yoyo: true, // Reverse animation after completing
  });

  // Loop through each letter, wrap it in a span, and append it to the title
  titleLetters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    title.appendChild(span); // Append each span to the title

    // Animate each letter with a color change and stagger effect
    titleTl.to(span, {
      duration: 0.5,
      color: "#f7f7f7", // Change the color of each letter
      stagger: 0.01, // Adds delay between letters
    });
  });
});

// Select the ripple container
const rippleContainer = document.querySelector(".ripple-container");

// Number of rings to display
const numRings = 60; // Adjust based on how many rings you want

// Add a click event listener to the container
rippleContainer.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Create a GSAP timeline for rings with increasing distance and fading
  const tl = gsap.timeline();

  // Create rings in sequence
  for (let i = 0; i < numRings; i++) {
    tl.add(() => createRipple(x, y, i), `+=0.2`); // Delay to ensure only one ring at a time
  }
});

function createRipple(x, y, ringIndex) {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");

  // Set size and position of the ripple (grows progressively)
  const sizeIncrease = 50 * Math.pow(ringIndex + 1, 1.5);
  ripple.style.width = `${50 + sizeIncrease}px`;
  ripple.style.height = `${50 + sizeIncrease}px`;

  // Center the ripple
  ripple.style.left = `${x - (25 + sizeIncrease / 2)}px`;
  ripple.style.top = `${y - (25 + sizeIncrease / 2)}px`;

  // Append the ripple to the container
  rippleContainer.appendChild(ripple);

  // Animate the ripple: grow and fade out with increased size and spacing
  return gsap.to(ripple, {
    duration: 1.7, // Time for the ring to fully fade and grow
    opacity: 0, // Ring fades out
    ease: "power2.out", // Smooth easing for a natural effect
    onComplete: () => ripple.remove(), // Remove the ripple after the animation completes
  });
}
