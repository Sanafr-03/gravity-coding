document.addEventListener('DOMContentLoaded', () => {
  let swiper;
  let currentSlideIndex = 0;
  let decrypting = false;
  let autoSwipeTimeout;
  const swipeDelay = 5000; // 5 seconds between auto-swipes

  function initializeSwiper() {
    swiper = new Swiper('.mySwiper', {
      loop: false,
      effect: 'cards',
      grabCursor: true,
      cardsEffect: {
        slideShadows: false,
        perSlideOffset: 10,
        perSlideRotate: 3
      },
      on: {
        init: function() {
          this.slides.forEach((slide) => setupSlideDecryption(slide));
          // Start with first slide decryption
          setTimeout(() => {
            decryptMessage(this.slides[0]);
          }, 800);
        },
        slideChange: function() {
          // Clear any pending auto-swipe
          clearTimeout(autoSwipeTimeout);
          // Decrypt the new active slide
          decryptMessage(this.slides[this.activeIndex]);
        }
      }
    });

    // Adjust card effect for mobile
    if (window.innerWidth < 768) {
      swiper.params.cardsEffect.perSlideOffset = 8;
      swiper.params.cardsEffect.perSlideRotate = 2;
      swiper.update();
    }
  }

  function setupSlideDecryption(slide) {
    const encrypted = slide.querySelector('.encrypted');
    const decrypted = slide.querySelector('.decrypted');
    
    // Initialize state
    encrypted.style.display = 'block';
    encrypted.style.opacity = '1';
    decrypted.style.display = 'none';
    decrypted.classList.remove('visible');
    
    // Click handler for manual decryption
    slide.addEventListener('click', () => {
      if (!decrypted.classList.contains('visible') && !decrypting) {
        decryptMessage(slide);
      }
    });
  }

  function decryptMessage(slide) {
    if (decrypting) return;
    decrypting = true;
    
    const encrypted = slide.querySelector('.encrypted');
    const decrypted = slide.querySelector('.decrypted');
    const thruster = slide.querySelector('.thruster-effect');
    const dataStream = slide.querySelector('.data-stream');
    const binaryDecode = slide.querySelector('.binary-decode');
    const dataDisplay = slide.querySelector('.data-display');

    // Reset previous animations
    thruster.classList.remove('active');
    dataStream.classList.remove('active');
    binaryDecode.classList.remove('active');
    
    // Update status
    dataDisplay.textContent = "DECRYPTION_ACTIVE";
    
    // Start animations
    thruster.classList.add('active');
    dataStream.classList.add('active');
    binaryDecode.classList.add('active');
    createThrusterParticles(slide);

    let flashCount = 0;
    const flashInterval = setInterval(() => {
      encrypted.style.opacity = flashCount % 2 === 0 ? '0.3' : '0.8';
      flashCount++;

      if (flashCount > 6) {
        clearInterval(flashInterval);
        encrypted.style.display = 'none';
        decrypted.style.display = 'block';
        decrypted.classList.add('visible');
        dataDisplay.textContent = "TRANSMISSION_CLEAR";

        setTimeout(() => {
          thruster.classList.remove('active');
          dataStream.classList.remove('active');
          binaryDecode.classList.remove('active');
          decrypting = false;
          
          // Auto-swipe to next slide after delay
          autoSwipeTimeout = setTimeout(() => {
            if (currentSlideIndex < swiper.slides.length - 1) {
              currentSlideIndex++;
              swiper.slideTo(currentSlideIndex);
            } else {
              // If last slide, loop back to first
              currentSlideIndex = 0;
              swiper.slideTo(0);
            }
          }, swipeDelay);
        }, 1000);
      }
    }, 200);
  }

  function createThrusterParticles(slide) {
    const particleCount = window.innerWidth < 768 ? 15 : 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('thruster-particle');

      const size = Math.random() * (window.innerWidth < 768 ? 6 : 8) + 2;
      const posX = 50 + (Math.random() * 20 - 10);
      const duration = 0.5 + Math.random() * 0.5;
      const delay = Math.random() * 0.3;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animation = `thrusterParticle ${duration}s ease-out ${delay}s forwards`;

      const colors = ['var(--thruster-red)', 'var(--warning-orange)', 'var(--satellite-gold)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];

      slide.appendChild(particle);

      setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
  }

  // Add animation for particles
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    @keyframes thrusterParticle {
      0% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-100px) scale(0.2); }
    }
  `;
  document.head.appendChild(styleSheet);

  // Initialize swiper
  initializeSwiper();

  // Handle window resize
  window.addEventListener('resize', () => {
    if (swiper) {
      if (window.innerWidth < 768) {
        swiper.params.cardsEffect.perSlideOffset = 8;
        swiper.params.cardsEffect.perSlideRotate = 2;
      } else {
        swiper.params.cardsEffect.perSlideOffset = 15;
        swiper.params.cardsEffect.perSlideRotate = 5;
      }
      swiper.update();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const testimonialsSection = document.querySelector('.testimonials-section');
  let swiperInitialized = false;

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !swiperInitialized) {
        initializeSwiper(); // Your existing function
        swiperInitialized = true;
        observerInstance.disconnect(); // Stop observing once triggered
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of the section is visible
  });

  if (testimonialsSection) {
    observer.observe(testimonialsSection);
  }
});
