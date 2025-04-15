document.addEventListener('DOMContentLoaded', function() {
    // Create stars
    createStars();
    
    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('cosmicCoderLoggedIn') === 'true';
    if (!isLoggedIn) {
        setTimeout(() => {
            document.getElementById('login-modal').classList.add('active');
        }, 1000);
    }
    
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('cosmicCoderLoggedIn', 'true');
        document.getElementById('login-modal').classList.remove('active');
        updateUserData();
    });
    
    // Close modal
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('login-modal').classList.remove('active');
    });
    
    // Course data with language-specific icons
    const courseData = [
        {
            id: 1,
            title: "HTML Fundamentals",
            description: "Learn the foundation of web development with HTML. Create your first space-themed webpage structure.",
            icon: "🚀",
            language: "HTML",
            status: "completed",
            checklist: [
                { text: "HTML Document Structure", completed: true },
                { text: "Common HTML Tags", completed: true },
                { text: "Forms and Inputs", completed: true },
                { text: "Semantic HTML", completed: true }
            ],
            tooltip: "Master the building blocks of the web",
            xp: 100
        },
        {
            id: 2,
            title: "CSS Styling",
            description: "Make your websites visually stunning with CSS. Design your cosmic interface with modern styling techniques.",
            icon: "🎨",
            language: "CSS",
            status: "completed",
            checklist: [
                { text: "Selectors and Properties", completed: true },
                { text: "Box Model", completed: true },
                { text: "Flexbox and Grid", completed: true },
                { text: "Animations and Transitions", completed: true }
            ],
            tooltip: "Bring style to your space journey",
            xp: 150
        },
        {
            id: 3,
            title: "JavaScript Fundamentals",
            description: "Add interactivity to your websites. Control your spacecraft with JavaScript programming basics.",
            icon: "🛸",
            language: "JS",
            status: "current",
            checklist: [
                { text: "Variables and Data Types", completed: true },
                { text: "Functions and Scope", completed: true },
                { text: "DOM Manipulation", completed: false },
                { text: "Event Handling", completed: false }
            ],
            tooltip: "Power up your cosmic explorer",
            xp: 200
        },
        {
            id: 4,
            title: "Advanced JavaScript",
            description: "Dive deeper into JavaScript concepts. Navigate through the asteroid belt of complex code with ES6+ features.",
            icon: "🌌",
            language: "JS",
            status: "locked",
            checklist: [
                { text: "ES6+ Features", completed: false },
                { text: "Async/Await", completed: false },
                { text: "Modules", completed: false },
                { text: "Error Handling", completed: false }
            ],
            tooltip: "Prepare for advanced space navigation",
            xp: 250
        },
        {
            id: 5,
            title: "React Universe",
            description: "Build dynamic user interfaces with React. Create your own space station dashboard with reusable components.",
            icon: "🪐",
            language: "React",
            status: "locked",
            checklist: [
                { text: "Components and Props", completed: false },
                { text: "State and Lifecycle", completed: false },
                { text: "Hooks", completed: false },
                { text: "Routing", completed: false }
            ],
            tooltip: "Assemble your space station",
            xp: 300
        },
        {
            id: 6,
            title: "Node.js Backend",
            description: "Learn server-side programming with Node.js. Build the control center for your space mission applications.",
            icon: "🛰️",
            language: "Node",
            status: "locked",
            checklist: [
                { text: "Node.js Basics", completed: false },
                { text: "NPM and Packages", completed: false },
                { text: "File System Operations", completed: false },
                { text: "HTTP Server", completed: false }
            ],
            tooltip: "Power your mission control",
            xp: 350
        },
        {
            id: 7,
            title: "Express Framework",
            description: "Build robust web applications with Express. Create APIs to communicate between spacecraft modules.",
            icon: "🛠️",
            language: "Express",
            status: "locked",
            checklist: [
                { text: "Routing", completed: false },
                { text: "Middleware", completed: false },
                { text: "Error Handling", completed: false },
                { text: "RESTful APIs", completed: false }
            ],
            tooltip: "Connect your space systems",
            xp: 400
        },
        {
            id: 8,
            title: "MongoDB Database",
            description: "Store and manage your mission data with MongoDB. Organize your cosmic information efficiently.",
            icon: "🗄️",
            language: "MongoDB",
            status: "locked",
            checklist: [
                { text: "CRUD Operations", completed: false },
                { text: "Schema Design", completed: false },
                { text: "Indexes", completed: false },
                { text: "Aggregation", completed: false }
            ],
            tooltip: "Store your space data",
            xp: 450
        },
        {
            id: 9,
            title: "Git & Version Control",
            description: "Track changes and collaborate with Git. Never lose your code in the vastness of space.",
            icon: "🔀",
            language: "Git",
            status: "locked",
            checklist: [
                { text: "Basic Commands", completed: false },
                { text: "Branching", completed: false },
                { text: "Merging", completed: false },
                { text: "GitHub Workflow", completed: false }
            ],
            tooltip: "Navigate code history",
            xp: 500
        },
        {
            id: 10,
            title: "DevOps & Deployment",
            description: "Launch your application to the world. Prepare for your cosmic code liftoff with CI/CD pipelines.",
            icon: "🌠",
            language: "DevOps",
            status: "locked",
            checklist: [
                { text: "Deployment Strategies", completed: false },
                { text: "CI/CD Pipelines", completed: false },
                { text: "Performance Optimization", completed: false },
                { text: "Security Best Practices", completed: false }
            ],
            tooltip: "Launch sequence initiated",
            xp: 550
        }
    ];

    // Load saved progress from localStorage
    loadProgress();
    
    // Render nodes
    renderNodes(courseData);
    
    // Initialize progress
    updateProgress();
    
    // Initialize streak
    initializeStreak();
    
    // Add event listeners for checklist items
    document.querySelectorAll('.checklist input').forEach(item => {
        item.addEventListener('change', function() {
            saveProgress();
            updateProgress();
            if (this.checked) {
                const label = this.nextElementSibling;
                label.classList.add('completed');
                
                // Check if all checkboxes are checked in current module
                const currentModule = this.closest('.node.current');
                if (currentModule) {
                    const allChecked = Array.from(currentModule.querySelectorAll('.checklist input')).every(cb => cb.checked);
                    if (allChecked) {
                        unlockNode(currentModule);
                    }
                }
            } else {
                const label = this.nextElementSibling;
                label.classList.remove('completed');
            }
        });
    });
    
    // Add click event for nodes to simulate unlocking
    document.querySelectorAll('.node.locked').forEach(node => {
        node.addEventListener('click', function() {
            // In a real app, this would check if previous nodes are completed
            // For demo, we'll just show an alert
            alert('Complete the current module to unlock this content!');
        });
    });
    
    // User profile click
    document.getElementById('user-profile').addEventListener('click', function() {
        // In a real app, this would show user menu
        alert('User profile menu would appear here');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.node, .achievement, .streak-container, .leaderboard-container').forEach(el => {
        observer.observe(el);
    });
});

function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random properties
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 5;
        const opacity = 0.5 + Math.random() * 0.5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', opacity);
        
        starsContainer.appendChild(star);
    }
}

function renderNodes(data) {
    const nodesContainer = document.getElementById('nodes');
    nodesContainer.innerHTML = '';
    
    data.forEach((item, index) => {
        const node = document.createElement('div');
        node.className = `node ${item.status}`;
        node.dataset.id = item.id;
        node.dataset.xp = item.xp;
        
        // Create checklist items
        let checklistHTML = '';
        item.checklist.forEach((task, taskIndex) => {
            const taskId = `task-${item.id}-${taskIndex}`;
            const isChecked = localStorage.getItem(taskId) === 'true' || task.completed;
            checklistHTML += `
                <li>
                    <input type="checkbox" id="${taskId}" ${isChecked ? 'checked' : ''}>
                    <label for="${taskId}" class="${isChecked ? 'completed' : ''}">${task.text}</label>
                </li>
            `;
        });
        
        // Status badge
        let statusBadge = '';
        if (item.status === 'completed') {
            statusBadge = '<span class="node-badge"><i class="fas fa-check"></i></span>';
        }
        
        node.innerHTML = `
            <div class="node-icon-container">
                <div class="node-icon">${item.icon}</div>
                ${statusBadge}
            </div>
            <div class="node-content">
                <div class="node-title">
                    <div class="node-title-text">
                        <span class="node-language-icon" title="${item.language}">${item.language.charAt(0)}${item.language.charAt(1)}</span>
                        ${item.title}
                    </div>
                    <span class="node-status status-${item.status}">${item.status}</span>
                </div>
                <p class="node-description">${item.description}</p>
                <ul class="checklist">${checklistHTML}</ul>
            </div>
            <div class="tooltip">${item.tooltip}</div>
            <div class="unlock-animation"></div>
        `;
        
        // Add animation delay based on position
        node.style.animationDelay = `${index * 0.1}s`;
        nodesContainer.appendChild(node);
    });
}

function updateProgress() {
    // Calculate overall progress
    const totalCheckboxes = document.querySelectorAll('.checklist input').length;
    const checkedCheckboxes = document.querySelectorAll('.checklist input:checked').length;
    const progressPercent = Math.round((checkedCheckboxes / totalCheckboxes) * 100);
    
    // Update radial progress
    const progressCircle = document.querySelector('.progress-circle');
    const circumference = 565; // 2 * π * r (where r is 90 for our circle)
    const offset = circumference - (progressPercent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    // Update percentage text
    document.getElementById('progress-percent').textContent = `${progressPercent}%`;
    
    // Update stats
    const completedModules = document.querySelectorAll('.node.completed').length;
    document.getElementById('completed-modules').textContent = completedModules;
    document.getElementById('completed-tasks').textContent = checkedCheckboxes;
    
    // Calculate total XP
    let totalXP = 0;
    document.querySelectorAll('.node.completed').forEach(node => {
        totalXP += parseInt(node.dataset.xp);
    });
    document.getElementById('total-xp').textContent = totalXP;
    
    // Update earned badges
    const earnedBadges = Math.floor(completedModules / 2);
    document.getElementById('earned-badges').textContent = earnedBadges;
}

function initializeStreak() {
    // Load streak from localStorage or create mock data
    let streak = localStorage.getItem('cosmicCoderStreak');
    if (!streak) {
        streak = Math.floor(Math.random() * 7); // Random streak for demo
        localStorage.setItem('cosmicCoderStreak', streak);
    }
    
    document.getElementById('streak-count').textContent = streak;
    
    const streakDaysContainer = document.getElementById('streak-days');
    streakDaysContainer.innerHTML = '';
    
    // Create day indicators
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    for (let i = 0; i < 7; i++) {
        const day = document.createElement('div');
        day.className = 'streak-day';
        day.dataset.day = days[i];
        
        if (i < streak) {
            day.classList.add('active');
        } else if (i == streak && streak < 7) {
            day.classList.add('current');
        }
        
        day.textContent = i + 1;
        streakDaysContainer.appendChild(day);
    }
}

function unlockNode(node) {
    // Create particles
    const animationContainer = node.querySelector('.unlock-animation');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'unlock-particle';
        
        // Random properties
        const size = 2 + Math.random() * 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 0.5 + Math.random() * 1;
        const delay = Math.random() * 0.5;
        const color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.backgroundColor = color;
        particle.style.animation = `unlock ${duration}s ${delay}s forwards`;
        
        animationContainer.appendChild(particle);
    }
    
    // Change node status after animation
    setTimeout(() => {
        node.classList.remove('current');
        node.classList.add('completed');
        animationContainer.innerHTML = '';
        
        // Add badge to node
        const badge = document.createElement('div');
        badge.className = 'node-badge';
        badge.innerHTML = '<i class="fas fa-check"></i>';
        node.querySelector('.node-icon-container').appendChild(badge);
        
        // Unlock next node (for demo)
        const nextNode = node.nextElementSibling;
        if (nextNode && nextNode.classList.contains('locked')) {
            nextNode.classList.remove('locked');
            nextNode.classList.add('current');
            
            // Scroll to next node
            setTimeout(() => {
                nextNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
        
        saveProgress();
        updateProgress();
    }, 1500);
}

function saveProgress() {
    // Save all checklist items
    document.querySelectorAll('.checklist input').forEach(checkbox => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
    
    // Save node statuses
    document.querySelectorAll('.node').forEach(node => {
        localStorage.setItem(`node-${node.dataset.id}-status`, node.classList.contains('completed') ? 'completed' : 
                            node.classList.contains('current') ? 'current' : 'locked');
    });
}

function loadProgress() {
    // In a real app, this would load from server
    // For demo, we're using localStorage
}

function updateUserData() {
    // In a real app, this would fetch user data from server
    // For demo, we'll just update the UI
    document.querySelector('.user-avatar').textContent = 'JS';
    document.querySelector('.user-name').textContent = 'John Smith';
}