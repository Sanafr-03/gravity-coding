document.addEventListener('DOMContentLoaded', function() {
    // 1. NAVBAR SCROLL EFFECT WITH FAST FADE-IN
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.cosmic-code-header');
    let lastScrollPosition = 0;
    
    function handleScroll() {
        const currentScrollPosition = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (currentScrollPosition > 50) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollPosition = currentScrollPosition;
    }


        
    
    // Initialize scroll state
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // ========================
    // 2. PARTICLES.JS BACKGROUND
    // ========================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('header-particles', {
            particles: {
                number: { value: 120, density: { enable: true, value_area: 800 } },
                color: { value: ["#ff00cc", "#00f2ff", "#8a2be2", "#ffffff"] },
                shape: {
                    type: ["circle", "triangle", "star"],
                    stroke: { width: 0, color: "#000000" },
                    polygon: { nb_sides: 6 }
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    anim: { enable: true, speed: 2, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 3, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#8a2be2",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 6 },
                    repulse: { distance: 100, duration: 0.2 }
                }
            },
            retina_detect: true
        });
    }

    // ===========================
    // 3. MAIN TITLE TEXT ANIMATION
    // ===========================
    const animateTitleText = () => {
        const gravityTitle = document.getElementById('gravityTitle');
        if (!gravityTitle) return;

        const text = gravityTitle.textContent;
        gravityTitle.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            if (text[i] === ' ') span.style.marginRight = '20px';
            gravityTitle.appendChild(span);
        }

        setTimeout(() => {
            gravityTitle.style.opacity = '1';
            const letters = document.querySelectorAll('.letter');
            
            letters.forEach((letter, index) => {
                letter.style.transform = 'translateY(-100px) rotateX(90deg)';
                letter.style.opacity = '1';
                
                setTimeout(() => {
                    letter.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    letter.style.transform = 'translateY(0) rotateX(0)';
                    
                    setTimeout(() => {
                        letter.style.transition = 'transform 0.3s ease';
                        letter.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            letter.style.transform = 'translateY(0)';
                            
                            // Start subtext animation when title completes
                            if (index === letters.length - 1) {
                                setTimeout(animateSubtext, 300);
                            }
                        }, 300);
                    }, 800);
                }, index * 100);
            });
        }, 500);
    };
    animateTitleText();

    // ===========================
    // 4. SUBTEXT GRAVITY ANIMATION
    // ===========================
    function animateSubtext() {
        const subtitle = document.querySelector('.subtitle');
        if (!subtitle) return;
        
        // Hide initially and prepare for animation
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(40px)';
        subtitle.style.display = 'block';
        subtitle.style.transition = 'all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Changed from 0.8s
        
        // Animate entire subtitle block
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
            
            // Bounce effect at the end (faster)
            setTimeout(() => {
                subtitle.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    subtitle.style.transform = 'translateY(0)';
                    
                    // Start button animation sooner
                    setTimeout(animateButtons, 100); // Changed from 200ms
                }, 100); // Changed from 150ms
            }, 400); // Changed from 800ms
        }, 50); // Changed from 100ms
    }

    // ===========================
    // 5. BUTTON GRAVITY ANIMATION
    // ===========================
    function animateButtons() {
        const buttons = document.querySelectorAll('.galaxy-button');
        
        buttons.forEach((button, i) => {
            // Hide initially
            button.style.opacity = '0';
            button.style.transform = 'translateY(50px) scale(0.8)';
            button.style.transition = `all 0.5s cubic-bezier(0.17, 0.84, 0.44, 1.2) ${i * 0.1}s`; // Changed duration to 0.5s and stagger to 0.1s
            
            // Gravity drop + bounce effect (faster)
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0) scale(1)';
                
                // Bounce effect (faster)
                setTimeout(() => {
                    button.style.transform = 'translateY(-10px) scale(1.05)';
                    setTimeout(() => {
                        button.style.transform = 'translateY(0) scale(1)';
                    }, 100); // Changed from 150ms
                }, 400); // Changed from 700ms
            }, 50); // Changed from 100ms
        });
    }
    // ========================
    // 6. GALAXY BUTTON EFFECTS
    // ========================
    const initGalaxyButtons = () => {
        const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const PARTICLES = document.querySelectorAll('.star');
        
        PARTICLES.forEach(P => {
            P.setAttribute('style', `
                --angle: ${RANDOM(0, 360)};
                --duration: ${RANDOM(6, 20)};
                --delay: ${RANDOM(1, 10)};
                --alpha: ${RANDOM(40, 90) / 100};
                --size: ${RANDOM(2, 6)};
                --distance: ${RANDOM(40, 200)};
            `);
        });
    };
    initGalaxyButtons();

    // ===========================
    // 7. FLOATING CODE ELEMENTS
    // ===========================
    const animateCodeElements = () => {
        setInterval(() => {
            const codeElements = document.querySelectorAll('.code-element');
            if (codeElements.length) {
                const randomElement = codeElements[Math.floor(Math.random() * codeElements.length)];
                const colors = ['#ff00cc', '#00f2ff', '#8a2be2', '#ffffff'];
                randomElement.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                // Restart animation
                randomElement.style.animation = 'none';
                randomElement.offsetHeight;
                randomElement.style.animation = null;
            }
        }, 1500);
    };
    animateCodeElements();
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.Nav-links');
    
    // Clone nav links for mobile
    const mobileMenu = navLinks.cloneNode(true);
    mobileMenu.classList.add('mobile-menu');
    document.body.appendChild(mobileMenu);

    // Add binary decorations with random positioning
    const binaryCodes = ['01001110', '10101001', '11001100', '00110011','11001100', '00110011'];
    binaryCodes.forEach((code, i) => {
        const binary = document.createElement('div');
        binary.className = 'binary-decoration';
        binary.textContent = code;
        
        // Random positioning
        binary.style.top = `${Math.random() * 70 + 15}%`;
        binary.style.left = `${Math.random() * 80 + 10}%`;
        binary.style.animationDelay = `${Math.random() * 5}s`;
        
        mobileMenu.appendChild(binary);
    });

    // Toggle menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('.Nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
});
