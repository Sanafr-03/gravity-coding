document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize portal particles with responsive adjustments
    function initPortalParticles(container) {
        // Only create particles if container is visible
        if (!container.offsetParent) return;
        
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const isMobile = window.innerWidth < 768;
        
        // Clear existing particles while preserving core elements
        const mergedRing = container.querySelector('.portal-merged-ring');
        const portalCore = container.querySelector('.portal-core');
        container.innerHTML = '';
        if (mergedRing) container.appendChild(mergedRing);
        if (portalCore) container.appendChild(portalCore);

        // Responsive particle counts
        const particlesConfig = {
            strands: isMobile ? 15 : 40,
            stars: isMobile ? 25 : 60,
            dust: isMobile ? 8 : 20,
            arms: 2,
            burstInterval: isMobile ? 3000 : 1500
        };

        // Create particles
        for (let i = 0; i < particlesConfig.strands; i++) {
            createEnergyStrand(container, centerX, centerY, isMobile);
        }
        for (let i = 0; i < particlesConfig.stars; i++) {
            createStarParticle(container, centerX, centerY, isMobile);
        }
        for (let i = 0; i < particlesConfig.dust; i++) {
            createCosmicDust(container, centerX, centerY, isMobile);
        }
        for (let i = 0; i < particlesConfig.arms; i++) {
            createGalaxyArm(container, centerX, centerY, i, isMobile);
        }

        // Create periodic energy bursts
        const burstInterval = setInterval(() => {
            createEnergyBurst(container, centerX, centerY, isMobile);
        }, particlesConfig.burstInterval);

        // Cleanup interval on container removal
        container.dataset.burstInterval = burstInterval;
    }

    function createEnergyStrand(container, centerX, centerY, isMobile) {
        const strand = document.createElement('div');
        strand.className = 'energy-strand';
        container.appendChild(strand);
        
        // Size adjustments for mobile
        const size = isMobile ? 
            (0.2 + Math.random() * 0.8) : 
            (0.3 + Math.random() * 2);
        strand.style.width = `${size}px`;
        strand.style.height = `${size}px`;
        
        // Color variations
        const colors = ['#64C8FF', '#00B4FF', '#0064FF'];
        strand.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Starting position
        const startRange = isMobile ? 0.2 : 0.3;
        const startX = (Math.random() - 0.5) * (container.offsetWidth * startRange);
        const startY = (Math.random() - 0.5) * (container.offsetHeight * startRange);
        strand.style.left = `calc(50% + ${startX}px)`;
        strand.style.top = `calc(50% + ${startY}px)`;
        
        // Movement parameters
        const angle = Math.random() * Math.PI * 2;
        const distanceMultiplier = isMobile ? 0.6 : 0.8;
        const distance = container.offsetWidth * distanceMultiplier + Math.random() * container.offsetWidth * 0.4;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance * 1.5;
        
        strand.style.setProperty('--tx', `${tx}px`);
        strand.style.setProperty('--ty', `${ty}px`);
        
        // Animation timing
        strand.style.animationDelay = `${Math.random() * 8}s`;
        strand.style.animationDuration = `${(isMobile ? 3 : 5) + Math.random() * 6}s`;
    }

    function createStarParticle(container, centerX, centerY, isMobile) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        container.appendChild(star);
        
        // Size adjustments
        const size = isMobile ? 
            (0.1 + Math.random() * 0.8) : 
            (0.1 + Math.random() * 1.5);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Position in oval pattern
        const distanceMultiplier = isMobile ? 0.3 : 0.4;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * container.offsetWidth * distanceMultiplier;
        const x = centerX + Math.cos(angle) * distance * 0.6;
        const y = centerY + Math.sin(angle) * distance;
        
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // Twinkle timing
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${(isMobile ? 2 : 3) + Math.random() * 5}s`;
    }

    function createCosmicDust(container, centerX, centerY, isMobile) {
        const dust = document.createElement('div');
        dust.className = 'cosmic-dust';
        container.appendChild(dust);
        
        // Size adjustments
        const size = isMobile ? 
            (0.5 + Math.random() * 2) : 
            (1 + Math.random() * 4);
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        // Starting position
        const startRange = isMobile ? 1.2 : 1.5;
        const startX = (Math.random() - 0.5) * container.offsetWidth * startRange - centerX;
        const startY = (Math.random() - 0.5) * container.offsetHeight * startRange - centerY;
        dust.style.left = `calc(50% + ${startX}px)`;
        dust.style.top = `calc(50% + ${startY}px)`;
        
        // Ending position
        const endX = startX + (Math.random() - 0.5) * container.offsetWidth;
        const endY = startY + (Math.random() - 0.5) * container.offsetHeight;
        
        dust.style.setProperty('--start-x', `${startX}px`);
        dust.style.setProperty('--start-y', `${startY}px`);
        dust.style.setProperty('--end-x', `${endX}px`);
        dust.style.setProperty('--end-y', `${endY}px`);
        
        // Animation duration
        dust.style.animationDuration = `${(isMobile ? 20 : 30) + Math.random() * 50}s`;
        dust.style.backgroundColor = `rgba(100, 200, 255, ${0.05 + Math.random() * 0.1})`;
    }

    function createGalaxyArm(container, centerX, centerY, index, isMobile) {
        const arm = document.createElement('div');
        arm.className = 'galaxy-arm';
        container.appendChild(arm);
        
        // Size adjustments
        const baseSize = isMobile ? 0.6 : 0.8;
        const width = container.offsetWidth * (baseSize + index * 0.2);
        const height = container.offsetHeight * (baseSize + index * 0.2);
        arm.style.width = `${width}px`;
        arm.style.height = `${height}px`;
        arm.style.left = `${centerX - width/2}px`;
        arm.style.top = `${centerY - height/2}px`;
        
        // Styling
        const colors = [
            'rgba(100, 200, 255, 0.3)',
            'rgba(0, 180, 255, 0.3)'
        ];
        arm.style.boxShadow = `0 0 ${isMobile ? '3px' : '6px'} ${colors[index]}`;
        arm.style.animationDuration = `${(isMobile ? 30 : 50) + index * 15}s`;
    }

    function createEnergyBurst(container, centerX, centerY, isMobile) {
        const burst = document.createElement('div');
        burst.className = 'energy-burst';
        container.appendChild(burst);
        
        // Size adjustments
        const baseSize = isMobile ? 15 : 20;
        const width = baseSize + Math.random() * (isMobile ? 20 : 40);
        const height = width * 1.5;
        burst.style.width = `${width}px`;
        burst.style.height = `${height}px`;
        
        // Styling
        const colors = ['#64C8FF', '#00B4FF', '#0064FF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        burst.style.background = `radial-gradient(ellipse at center, ${color} 0%, rgba(0,0,0,0) 70%)`;
        
        // Position
        const posRange = isMobile ? 0.15 : 0.2;
        const posX = (Math.random() - 0.5) * container.offsetWidth * posRange;
        const posY = (Math.random() - 0.5) * container.offsetHeight * posRange;
        burst.style.left = `calc(50% + ${posX}px - ${width/2}px)`;
        burst.style.top = `calc(50% + ${posY}px - ${height/2}px)`;
        
        // Cleanup
        setTimeout(() => burst.remove(), 5000);
    }

    // Initialize portals with Intersection Observer
    const initPortalsWithObserver = () => {
        const leftPortal = document.querySelector('.portal-container.left');
        const rightPortal = document.querySelector('.portal-container.right');
        
        if (!leftPortal || !rightPortal) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const portalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    if (!container.dataset.initialized) {
                        initPortalParticles(container);
                        container.dataset.initialized = true;
                    }
                }
            });
        }, observerOptions);

        portalObserver.observe(leftPortal);
        portalObserver.observe(rightPortal);
    };

    // Initialize with debounced resize handler
    const initCoursesSection = () => {
        initPortalsWithObserver();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const leftPortal = document.querySelector('.portal-container.left');
                const rightPortal = document.querySelector('.portal-container.right');
                if (leftPortal && leftPortal.dataset.initialized) {
                    initPortalParticles(leftPortal);
                }
                if (rightPortal && rightPortal.dataset.initialized) {
                    initPortalParticles(rightPortal);
                }
            }, 200);
        });
    };

    // Start initialization
    initCoursesSection();
});