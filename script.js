/* -------------------------
   MOBILE NAVIGATION
------------------------- */
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
}

/* -------------------------
   FAQ
------------------------- */
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        const currentlyOpen = item.classList.contains("open");

        item.parentElement.querySelectorAll(".faq-item").forEach(other => {
            other.classList.remove("open");
        });

        if (!currentlyOpen) item.classList.add("open");
    });
});

/* -------------------------
   CURRENCY SWITCHER
------------------------- */
const currencyButtons = document.querySelectorAll(".currency-btn");
const prices = document.querySelectorAll(".price");

currencyButtons.forEach(button => {
    button.addEventListener("click", () => {
        const currency = button.dataset.currency;

        currencyButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        prices.forEach(price => {
            const value = price.dataset[currency.toLowerCase()];
            if (value) price.textContent = value;
        });
    });
});

/* -------------------------
   PATRON CONTACT
------------------------- */
function patronMessage(level) {
    const subject = encodeURIComponent("RICKCLMNT — " + level + " Patronage");
    const body = encodeURIComponent(
        "Hello Patrick,\n\n" +
        "I am interested in becoming a " + level + " of RICKCLMNT.\n\n" +
        "I would like to discuss the next steps.\n\n" +
        "Thank you."
    );
    window.location.href = "mailto:rickclmntcorp@protonmail.com?subject=" + subject + "&body=" + body;
}

/* -------------------------
   ESCAPE KEY
------------------------- */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (navLinks) navLinks.classList.remove("open");
        document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("open"));
    }
});

/* -------------------------
   SCROLL REVEAL
------------------------- */
const revealElements = document.querySelectorAll(
    ".area, .project, .tier, .info-card, .note, .transfer-item, .entry, .timeline-item"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08 }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(18px)";
    element.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(element);
});
