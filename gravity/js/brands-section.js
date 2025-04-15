// Initialize particles.js
function initBrandsParticles() {
    particlesJS('brands-particles', {
        "particles": {
            "number": {
                "value": 120,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ffffff", "#00f2ff", "#8a2be2", "#ff00cc"]
            },
            "shape": {
                "type": ["circle", "triangle", "star", "polygon"],
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 6
                }
            },
            "opacity": {
                "value": 0.7,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 4,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 3,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8a2be2",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push",
                    "callback": function() {
                        setTimeout(removeNewParticles, 5000);
                    }
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });
    

    // Function to remove new particles after a random time
    function removeNewParticles() {
        setInterval(() => {
            if (pJSDom.length > 0) {
                let particles = pJSDom[0].pJS.particles.array;
                if (particles.length > 120) {
                    let extraParticles = particles.slice(120);
                    extraParticles.forEach((particle, index) => {
                        let randomTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
                        setTimeout(() => {
                            particles.splice(120 + index, 1);
                        }, randomTime);
                    });
                }
            }
        }, 3000);
    }
    
}

// Animate cards with staggered entrance
function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Reset styles in case they were set previously
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Staggered animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Check if section is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
        rect.bottom >= 0
    );
}

// Initialize when brands section loads
function initBrandsSection() {
    // Load particles
    if (typeof particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = function() {
            initBrandsParticles();
        };
        document.head.appendChild(script);
    } else {
        initBrandsParticles();
    }

    // Run typewriter effect
    setTimeout(typeWriter, 500);
    
    // Animate cards when section is visible
    const brandsSection = document.querySelector('.brands-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCards();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (brandsSection) {
        observer.observe(brandsSection);
    }
}

// Keep your existing typeWriter function
function typeWriter() {
    const headerText = "Top Recruiters";
    const headerElement = document.getElementById('pageHeader');
    let i = 0;
    
    headerElement.classList.add('typing');
    
    function type() {
        if (i < headerText.length) {
            headerElement.textContent = headerText.substring(0, i+1);
            i++;
            setTimeout(type, 100);
        } else {
            headerElement.classList.remove('typing');
            headerElement.style.animation = 'float 3s ease-in-out infinite, gradient 3s linear infinite';
        }
    }
    
    type();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.brands-section')) {
        initBrandsSection();
    }
});

