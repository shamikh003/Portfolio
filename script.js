// ====== Smooth Scroll (Start Align) ======
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Default click ko rokein

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Har section start (top) se khulega, center se nahi
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Mobile par link click hone ke baad menu band kar dein
        const navLinks = document.getElementById('nav-links');
        const menuToggle = document.getElementById('menu-toggle');
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// ====== Mobile Hamburger Menu ======
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }
});

// ====== Dynamic Footer Year ======
document.addEventListener("DOMContentLoaded", function () {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});


// ====== Looping Typewriter Effect ======

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Text jo type karna hai
    const textLine1 = "Hi, I'm ";
    const textLine1Highlight = "Muhammad";
    const textLine2Highlight = "Shamikh";
    
    // 2. Target element jahan type karna hai
    const target = document.getElementById("typewriter-text");

    // 3. Variables jo track karenge
    let i = 0; 
    let j = 0; 
    let k = 0; 

    // Typing speeds
    const typingSpeed = 100;
    const deleteSpeed = 80;
    const pauseBeforeDelete = 2000; // Poora text dikhane ke liye 2 second ka pause
    const pauseBeforeRetype = 500; // Delete hone ke baad 0.5 second ka pause

    // --- Typing Functions ---

    function typeLine1() {
        if (i < textLine1.length) {
            target.innerHTML = textLine1.substring(0, i + 1) + 
                               '<span class="caret">|</span>';
            i++;
            setTimeout(typeLine1, typingSpeed);
        } else {
            typeLine1Highlight();
        }
    }

    function typeLine1Highlight() {
        if (j < textLine1Highlight.length) {
            target.innerHTML = textLine1 + 
                               '<span class="highlight">' + 
                               textLine1Highlight.substring(0, j + 1) + 
                               '</span><span class="caret">|</span>';
            j++;
            setTimeout(typeLine1Highlight, typingSpeed);
        } else {
            typeLine2Highlight();
        }
    }

    function typeLine2Highlight() {
        if (k < textLine2Highlight.length) {
            target.innerHTML = textLine1 + 
                               '<span class="highlight">' + textLine1Highlight + '</span>' +
                               '<br>' + 
                               '<span class="highlight">' + 
                               textLine2Highlight.substring(0, k + 1) + 
                               '</span><span class="caret">|</span>';
            k++;
            setTimeout(typeLine2Highlight, 120); 
        } else {
            // Typing complete ho gayi, ab delete karne se pehle pause dein
            setTimeout(deleteLine2Highlight, pauseBeforeDelete);
        }
    }

    // --- Deleting Functions ---

    function deleteLine2Highlight() {
        if (k > 0) {
            // "Shamikh" ko delete karega
            target.innerHTML = textLine1 + 
                               '<span class="highlight">' + textLine1Highlight + '</span>' +
                               '<br>' +
                               '<span class="highlight">' + 
                               textLine2Highlight.substring(0, k - 1) + 
                               '</span><span class="caret">|</span>';
            k--;
            setTimeout(deleteLine2Highlight, deleteSpeed);
        } else {
            deleteLine1Highlight(); // Jab "Shamikh" delete ho jaye
        }
    }

    function deleteLine1Highlight() {
        if (j > 0) {
            // "Muhammad" ko delete karega
            target.innerHTML = textLine1 + 
                               '<span class="highlight">' + 
                               textLine1Highlight.substring(0, j - 1) + 
                               '</span><span class="caret">|</span>';
            j--;
            setTimeout(deleteLine1Highlight, deleteSpeed);
        } else {
            deleteLine1(); // Jab "Muhammad" delete ho jaye
        }
    }

    function deleteLine1() {
        if (i > 0) {
            // "Hi, I'm " ko delete karega
            target.innerHTML = textLine1.substring(0, i - 1) + 
                               '<span class="caret">|</span>';
            i--;
            setTimeout(deleteLine1, deleteSpeed);
        } else {
            // Sab delete ho gaya, ab re-type karne se pehle pause dein
            setTimeout(typeLine1, pauseBeforeRetype);
        }
    }

    // Typing shuru karein (page load hone ke 500ms baad)
    setTimeout(typeLine1, 500);
});


// ====== Scroll Reveal Animations ======
// Jab user scroll karega toh elements smoothly fade in honge

document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { 
        threshold: 0.1 // Jab element 10% screen par aye tab trigger hoga
    });

    reveals.forEach((reveal) => {
        observer.observe(reveal);
    });
});
