document.addEventListener('DOMContentLoaded', function() {
    // Create code particles for gravity coding line
    function createCodeParticles() {
        const container = document.querySelector('.gravity-coding-line .code-particles');
        const characters = ['{}', '()', '[]', '<>', '/*', '*/', '=>', ';', '=', '!', '?', '&', '|', '^', '~'];
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'code-particle';
            particle.textContent = characters[Math.floor(Math.random() * characters.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            particle.style.animationDuration = `${3 + Math.random() * 4}s`;
            
            container.appendChild(particle);
            
            // Remove after animation completes
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }, 200);
    }
    
    // Gravity lever functionality
    const gravityLever = document.querySelector('.gravity-lever');
    
    gravityLever.addEventListener('click', function() {
        // Add active class
        this.classList.add('active');
        
        // Create gravity off effect
        const gravityEffect = document.createElement('div');
        gravityEffect.className = 'gravity-off-effect';
        document.body.appendChild(gravityEffect);
        
        // Animate the effect
        setTimeout(() => {
            gravityEffect.style.opacity = '0.8';
            gravityEffect.style.transition = 'opacity 1s ease-out';
        }, 10);
        
        // Scroll to top with zero-gravity effect
        const startTime = performance.now();
        const duration = 1500;
        
        function scrollToTop(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, window.scrollY - (window.scrollY * easeOut));
            
            if (progress < 1) {
                requestAnimationFrame(scrollToTop);
            } else {
                // Remove effect after animation completes
                setTimeout(() => {
                    gravityEffect.style.opacity = '0';
                    setTimeout(() => gravityEffect.remove(), 1000);
                    gravityLever.classList.remove('active');
                }, 500);
            }
        }
        
        requestAnimationFrame(scrollToTop);
    });
    
    // Create button particles
    const ctaButton = document.querySelector('.cta-button');
    const particlesContainer = document.querySelector('.button-particles');
    const colors = ['#00f2ff', '#ff00cc', '#8a2be2'];
    
    ctaButton.addEventListener('mouseenter', function() {
        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = '0';
            particle.style.transition = `all ${0.5 + Math.random()}s ease-out`;
            particle.style.zIndex = '-1';
            
            particlesContainer.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                particle.style.opacity = '0.8';
                particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`;
            }, 10);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    });
    
    // Enhanced 3D hover effects for capsules
    const capsules = document.querySelectorAll('.galaxy-capsule-h');
    
    capsules.forEach(capsule => {
        // Store original transform for reset
        const originalTransform = capsule.style.transform;
        
        capsule.addEventListener('mousemove', (e) => {
            const rect = capsule.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position
            const rotateX = ((y - centerY) / centerY) * 10; // Increased from 5 to 10 for more pronounced effect
            const rotateY = ((centerX - x) / centerX) * 10; // Inverted direction for more natural movement
            
            // Apply transform with perspective and added scale for "lift" effect
            capsule.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                translateZ(20px)
                scale(1.05)
            `;
            
            // Add shadow effect
            capsule.style.boxShadow = `
                0 ${rotateX * 2}px ${rotateX * 5}px rgba(0, 0, 0, 0.3),
                ${rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.2)
            `;
        });
        
        capsule.addEventListener('mouseleave', () => {
            // Smoothly return to original state
            capsule.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            capsule.style.transform = originalTransform || 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
            capsule.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            
            // Remove transition after animation completes
            setTimeout(() => {
                capsule.style.transition = '';
            }, 500);
        });
        
        // Prevent transition on initial hover
        capsule.addEventListener('mouseenter', () => {
            capsule.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
    });
    
    // Animate HUD data points in CTA panel
    const hudDataPoints = document.querySelectorAll('.hud-data-point');
    hudDataPoints.forEach(point => {
        // Random blink effect
        setInterval(() => {
            point.style.opacity = Math.random() > 0.1 ? '1' : '0.5';
        }, 2000 + Math.random() * 3000);
        
        // Random value changes for specific points
        if (point.classList.contains('top-right')) {
            setInterval(() => {
                const randomG = (9.8 + (Math.random() - 0.5) * 0.2).toFixed(2);
                point.textContent = `G=${randomG} m/s²`;
            }, 3000);
        }
        
        if (point.classList.contains('bottom-right')) {
            setInterval(() => {
                const randomPower = Math.floor(95 + Math.random() * 10);
                point.textContent = `POWER: ${randomPower}%`;
            }, 2500);
        }
    });
    
    // Start creating code particles
    createCodeParticles();
    
    // Generate random symbols for gravity coding line
    const gravitySymbols = document.querySelector('.gravity-symbols');
    const symbols = ['⏣', '⍟', '⌾', '⍜', '⌖', '⍎', '⍙', '⌇', '⍣', '⍝'];
    
    function updateSymbols() {
        let randomSymbols = '';
        for (let i = 0; i < 10; i++) {
            randomSymbols += symbols[Math.floor(Math.random() * symbols.length)] + ' ';
        }
        gravitySymbols.textContent = randomSymbols;
    }
    
    // Initial update
    updateSymbols();
    
    // Update symbols periodically
    setInterval(updateSymbols, 3000);
    
    // Add click effect to CTA button
    ctaButton.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'button-ripple';
        ripple.style.position = 'absolute';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 1s ease-out';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
        
        // Temporary visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener("DOMContentLoaded", () => {
    const lever = document.querySelector(".gravity-lever");
  
    function handleScroll() {
      const header = document.querySelector("header");
      const headerBottom = header.getBoundingClientRect().bottom;
  
      if (headerBottom >= 0) {
        lever.style.display = "none"; // Hide if in header view
      } else {
        lever.style.display = "block"; // Show after header
      }
    }
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on load
  });
  