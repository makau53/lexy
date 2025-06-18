// Poetry data
const poems = [
    {
        id: 1,
        title: "Midnight Reflections",
        content: "In the silence of the night,<br>When the world has gone to sleep,<br>I find myself in candlelight,<br>With promises to keep.<br><br>The shadows dance upon the wall,<br>Like memories of days gone by,<br>And in this quiet, peaceful hall,<br>I hear my spirit's cry.",
        category: "life",
        date: "June 13, 2025"
    },
    {
        id: 2,
        title: "Love's Gentle Touch",
        content: "Your hand in mine, a perfect fit,<br>Like puzzle pieces meant to be,<br>In every moment that we sit,<br>I find my soul's serenity.<br><br>The way you laugh, the way you smile,<br>Makes every day feel like a dream,<br>With you, I'd walk a thousand miles,<br>Through any storm, through any stream.",
        category: "love",
        date: "June14, 2025"
    },
    {
        id: 3,
        title: "Forest Symphony",
        content: "The trees whisper ancient songs,<br>Of seasons past and yet to come,<br>While morning light gently prolongs,<br>The forest's peaceful, sacred hum.<br><br>Each leaf a note, each branch a line,<br>In nature's grand orchestral score,<br>Where earth and sky together shine,<br>And peace exists forevermore.",
        category: "nature",
        date: "June 10, 2025"
    },
    {
        id: 4,
        title: "Journey Within",
        content: "The path we walk is not always clear,<br>Sometimes it winds through doubt and fear,<br>But in the darkness, we must trust,<br>That dawn will come, as come it must.<br><br>For every step, though hard it seems,<br>Brings us closer to our dreams,<br>And in the journey, we will find,<br>The strength of heart, the peace of mind.",
        category: "life",
        date: "June, 2025"
    },
    {
        id: 5,
        title: "Ocean's Embrace",
        content: "The waves crash against the shore,<br>With rhythm old as time itself,<br>Each tide brings treasures to explore,<br>Like secrets from the ocean's shelf.<br><br>The salty breeze carries dreams,<br>Across the vast and endless blue,<br>Where nothing is quite what it seems,<br>And everything feels fresh and new.",
        category: "nature",
        date: "June, 2025"
    },
    {
        id: 6,
        title: "Heart's Desire",
        content: "In the garden of my heart,<br>You planted seeds of love so true,<br>And from that very sacred start,<br>My world has bloomed because of you.<br><br>Each day brings forth a new surprise,<br>A flower born of our sweet care,<br>And in your warm and loving eyes,<br>I see a future bright and fair.",
        category: "love",
        date: "June, 2025"
    }
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');
const poemsGrid = document.getElementById('poemsGrid');
const contactForm = document.getElementById('contactForm');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadPoems();
    initializeFilters();
    initializeContactForm();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Load and display poems
function loadPoems(filter = 'all') {
    poemsGrid.innerHTML = '';
    
    const filteredPoems = filter === 'all' ? poems : poems.filter(poem => poem.category === filter);
    
    filteredPoems.forEach((poem, index) => {
        const poemCard = createPoemCard(poem);
        poemsGrid.appendChild(poemCard);
        
        // Add staggered animation
        setTimeout(() => {
            poemCard.style.opacity = '1';
            poemCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create poem card element
function createPoemCard(poem) {
    const card = document.createElement('div');
    card.className = 'poem-card grid-item';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    
    card.innerHTML = `
        <h3 class="poem-title">${poem.title}</h3>
        <div class="poem-content">
            <p>${poem.content}</p>
        </div>
        <div class="poem-meta">
            <span class="poem-date">${poem.date}</span>
            <span class="poem-category">${poem.category.charAt(0).toUpperCase() + poem.category.slice(1)}</span>
        </div>
    `;
    
    return card;
}

// Initialize filter functionality
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value and load poems
            const filter = this.getAttribute('data-filter');
            loadPoems(filter);
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animations for elements
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.poem-card, .about-content, .contact-content').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to poem cards
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.poem-card')) {
            const card = e.target.closest('.poem-card');
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.poem-card')) {
            const card = e.target.closest('.poem-card');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});