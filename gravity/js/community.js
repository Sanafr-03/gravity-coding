document.addEventListener('DOMContentLoaded', function() {
    // Create floating coding icons
    const floatingIcons = document.getElementById('floatingIcons');
    const icons = [
        'fa-code', 'fa-terminal', 'fa-bug', 'fa-server', 
        'fa-database', 'fa-microchip', 'fa-network-wired',
        'fa-file-code', 'fa-laptop-code', 'fa-shield-alt'
    ];
    
    const colors = [
        '#4fc3f7', '#9c27b0', '#ffeb3b', '#ff9800',
        '#76ff03', '#f44336', '#00bcd4', '#e91e63',
        '#8bc34a', '#ff5722'
    ];
    
    // Create 20 floating icons
    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('i');
        icon.className = `fas ${icons[Math.floor(Math.random() * icons.length)]} floating-icon`;
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const opacity = Math.random() * 0.3 + 0.1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        icon.style.fontSize = `${size}px`;
        icon.style.left = `${posX}px`;
        icon.style.top = `${posY}px`;
        icon.style.opacity = opacity;
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;
        icon.style.color = color;
        
        floatingIcons.appendChild(icon);
    }
    
    // Language selection
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => {
        card.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const forumContainer = document.getElementById('forumContainer');
            
            // Change the forum title
            forumContainer.querySelector('h2').innerHTML = 
                `<i class="fas fa-comments"></i> ${this.textContent.trim()} Discussions`;
            
            // In a real app, you would fetch questions for the selected language
            console.log(`Loading ${lang} discussions...`);
            
            // Visual feedback
            languageCards.forEach(c => c.style.borderColor = 'var(--neon-purple)');
            this.style.borderColor = 'var(--star-yellow)';
            this.style.boxShadow = '0 0 15px var(--star-yellow)';
            
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 1000);
            
            // Add a floating effect to the selected card
            this.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 300);
        });
    });
    
    // Form submission
    const questionForm = document.getElementById('questionForm');
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const userPhoto = document.getElementById('userPhoto').value || 'https://randomuser.me/api/portraits/lego/1.jpg';
        const questionTitle = document.getElementById('questionTitle').value;
        const questionText = document.getElementById('questionText').value;
        const questionTags = document.getElementById('questionTags').value;
        
        // Create new question element
        const newQuestion = document.createElement('div');
        newQuestion.className = 'question';
        newQuestion.innerHTML = `
            <div class="question-header">
                <img src="${userPhoto}" alt="Profile" class="profile-pic">
                <div class="user-info">
                    <h3 class="user-name">${userName}</h3>
                    <p class="post-date">Posted on: ${new Date().toISOString().split('T')[0]}</p>
                </div>
            </div>
            <div class="question-content">
                <p class="question-text">${questionText}</p>
                <div class="question-footer">
                    <div class="tags">
                        ${questionTags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                    </div>
                    <div class="actions">
                        <button class="action-btn"><i class="far fa-thumbs-up"></i> 0</button>
                        <button class="action-btn"><i class="far fa-comment"></i> 0</button>
                        <button class="action-btn"><i class="fas fa-share"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to the top of the forum
        const forumContainer = document.getElementById('forumContainer');
        const firstQuestion = forumContainer.querySelector('.question');
        forumContainer.insertBefore(newQuestion, firstQuestion);
        
        // Reset form
        questionForm.reset();
        
        // Visual feedback
        newQuestion.style.transform = 'scale(0.9)';
        newQuestion.style.opacity = '0';
        
        setTimeout(() => {
            newQuestion.style.transition = 'all 0.5s ease';
            newQuestion.style.transform = 'scale(1)';
            newQuestion.style.opacity = '1';
        }, 10);
        
        // Add gravity effect to the new question
        setTimeout(() => {
            newQuestion.style.transition = 'all 0.3s ease';
            newQuestion.style.boxShadow = '0 0 20px var(--neon-blue)';
            setTimeout(() => {
                newQuestion.style.boxShadow = '';
            }, 1000);
        }, 600);
        
        // Create a particle effect from the submit button to the new question
        createSubmitParticles();
    });
    
    // Animated bar graph
    const statsContainer = document.getElementById('statsContainer');
    const graphBars = document.querySelectorAll('.graph-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate bars when stats container is visible
                animateGraphBars();
                
                // Add floating particles to the graph
                addGraphParticles();
                
                // No need to observe anymore after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsContainer);
    
    function animateGraphBars() {
        graphBars.forEach((bar, index) => {
            const value = bar.getAttribute('data-value');
            const maxValue = 250; // The highest value in our dataset
            const percentage = (value / maxValue) * 100;
            
            // Delay each bar's animation slightly for a cascading effect
            setTimeout(() => {
                if (window.innerWidth > 768) {
                    // Desktop - vertical bars
                    bar.style.height = `${percentage}%`;
                } else {
                    // Mobile - horizontal bars
                    bar.style.width = `${percentage}%`;
                }
                
                // Add a bounce effect at the end
                setTimeout(() => {
                    if (window.innerWidth > 768) {
                        bar.style.transform = 'scaleY(1.1)';
                        setTimeout(() => {
                            bar.style.transform = 'scaleY(1)';
                        }, 200);
                    } else {
                        bar.style.transform = 'scaleX(1.1)';
                        setTimeout(() => {
                            bar.style.transform = 'scaleX(1)';
                        }, 200);
                    }
                }, 1500);
            }, index * 150);
        });
    }
    
    function addGraphParticles() {
        const graphContainer = document.getElementById('graphContainer');
        const particles = [];
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 1;
            const color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
            const duration = Math.random() * 5 + 3;
            const delay = Math.random() * 2;
            
            // Position near a random bar
            const bars = document.querySelectorAll('.graph-bar');
            const randomBar = bars[Math.floor(Math.random() * bars.length)];
            const barRect = randomBar.getBoundingClientRect();
            
            let posX, posY;
            if (window.innerWidth > 768) {
                // Desktop - vertical bars
                posX = barRect.left + (Math.random() * barRect.width);
                posY = barRect.bottom - (Math.random() * barRect.height * 0.9);
            } else {
                // Mobile - horizontal bars
                posX = barRect.left + (Math.random() * barRect.width * 0.9);
                posY = barRect.top + (Math.random() * barRect.height);
            }
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.opacity = '0.7';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            // Animation
            particle.style.animation = `float-particle ${duration}s ease-in-out ${delay}s infinite`;
            
            // Add to container
            graphContainer.appendChild(particle);
            
            // Remove after animation completes to prevent DOM clutter
            setTimeout(() => {
                particle.remove();
            }, (duration + delay) * 1000);
        }
        
        // Add the animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.2); opacity: 1; }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8); opacity: 0.5; }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1.1); opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);
    }
    
    function createSubmitParticles() {
        const submitBtn = document.querySelector('.submit-btn');
        const forumContainer = document.getElementById('forumContainer');
        const firstQuestion = forumContainer.querySelector('.question');
        
        const btnRect = submitBtn.getBoundingClientRect();
        const questionRect = firstQuestion.getBoundingClientRect();
        
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Start at button position
            const startX = btnRect.left + btnRect.width / 2;
            const startY = btnRect.top + btnRect.height / 2;
            
            // End at question position
            const endX = questionRect.left + questionRect.width / 2;
            const endY = questionRect.top + questionRect.height / 2;
            
            // Random properties
            const size = Math.random() * 6 + 2;
            const color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
            const duration = Math.random() * 0.5 + 0.5;
            const delay = Math.random() * 0.2;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'fixed';
            particle.style.opacity = '0.9';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            particle.style.transformOrigin = 'center';
            
            // Add to body
            document.body.appendChild(particle);
            
            // Animate to question position
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 0.9
                },
                { 
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            // Remove after animation
            animation.onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Add interactive background effect
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `
            ${x * 50}px ${y * 50}px,
            ${(1 - x) * 50}px ${(1 - y) * 50}px,
            ${y * 100}px ${x * 100}px
        `;
    });
    
    // Add console-like typing effect to HUD elements
    const hudElements = document.querySelectorAll('.hud-element');
    hudElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    
                    // Add blinking cursor effect
                    const cursor = document.createElement('span');
                    cursor.className = 'blinking-cursor';
                    cursor.textContent = '_';
                    element.appendChild(cursor);
                    
                    setTimeout(() => {
                        cursor.remove();
                    }, 2000);
                }
            }, 50 + Math.random() * 50);
        }, index * 500);
    });
    
    // Add blinking cursor style
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .blinking-cursor {
            animation: blink 1s step-end infinite;
        }
        @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);
});