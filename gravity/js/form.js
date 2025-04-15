// Demo Section Scripts
function initDemoSection() {
    const container = document.querySelector('.container');
    const demoForm = document.getElementById('demoForm');
  
    // 3D tilt effect
    if (container) {
      document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
      });
  
      document.addEventListener('mouseleave', () => {
        container.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    }
  
    // Form submission
    if (demoForm) {
      demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const education = document.getElementById('education').value;
        
        // Simple validation
        if (!name || !phone) {
          alert('Please fill in all required fields');
          return;
        }
        
        // Show success message with HUD theme
        const originalHTML = document.querySelector('.container').innerHTML;
        document.querySelector('.container').innerHTML = `
          <div style="text-align: center; animation: float 4s ease-in-out infinite; position: relative; height: 100%; display: flex; flex-direction: column; justify-content: center;">
            <div class="corner corner-bl"></div>
            <div class="corner corner-br"></div>
            <h1 style="color: var(--space-light); margin-bottom: 1.5rem; text-shadow: 0 0 10px var(--space-blue);">SUBMISSION RECEIVED</h1>
            <p style="margin-bottom: 1rem; color: var(--space-blue);">> REGISTRATION CONFIRMED</p>
            <p style="margin-bottom: 2rem; color: var(--space-light);">We'll contact you soon with details.</p>
            <div class="galaxy-button" style="margin: 0 auto; width: auto;">
              <button onclick="location.reload()" class="space-button">
                <span class="backdrop"></span>
                <span class="galaxy"></span>
                <label class="text">RETURN</label>
              </button>
              <div class="bodydrop"></div>
            </div>
          </div>
        `;
      });
    }
  }
  
  // Initialize when the section comes into view
  const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initDemoSection();
        demoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const demoSection = document.querySelector('.demo-section');
  if (demoSection) {
    demoObserver.observe(demoSection);
  }