window.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("form[action='#']");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60px;
      font-weight: 700;
      color: #000000ff;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 1000;
    `;

    overlay.textContent = "Form submitted successfully!";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    setTimeout(() => {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 500);
    }, 2000);
  });
});