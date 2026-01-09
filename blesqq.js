// --- 1. THEME TOGGLE LOGIC ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

// Check Local Storage on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});


// --- 2. INTRO OVERLAY FADE ---
// When the user scrolls down 50px, the "Hi" screen fades away
const introOverlay = document.getElementById('intro-overlay');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        introOverlay.classList.add('fade-out');
    }
});


// --- 3. SCROLL ANIMATIONS (Intersection Observer) ---
// This makes elements slide up when they appear on screen
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the item is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible (so it doesn't animate again)
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements with the 'animate-on-scroll' class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach((el) => observer.observe(el));


// --- 4. INTERACTIVE BACKGROUND (Mouse Parallax) ---
// This makes the background shapes move slightly when you move your mouse
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        // Calculate a speed for each shape based on its index
        const speed = (index + 1) * 20;
        
        // We use 'transform' in CSS for the float animation.   
        // To avoid conflict, we change the 'left' and 'top' slightly, 
        // or we can use CSS variables. Here is a simple 'left/top' nudge:
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
        
        // Note: This adds to the existing CSS positioning
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});