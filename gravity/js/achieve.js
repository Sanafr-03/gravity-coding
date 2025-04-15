document.addEventListener('DOMContentLoaded', function() {
  // ==============================================
  // Particles.js Initialization
  // ==============================================
  particlesJS('particles-js', {
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

  // ==============================================
  // Sidebar Functionality
  // ==============================================
  const sidebar = document.querySelector('.sidebar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const mainContent = document.querySelector('.main-content'); // Add this class to your main content div

  // Initialize sidebar state
  function initSidebar() {
      if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          document.body.classList.remove('sidebar-open');
      } else {
          sidebar.classList.add('active');
          document.body.classList.add('sidebar-open');
      }
      updateHamburgerIcon();
  }

  // Toggle sidebar on hamburger click
hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Update hamburger menu icon
  function updateHamburgerIcon() {
      const icon = hamburgerBtn.querySelector('i');
      if (sidebar.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-times');
      } else {
          icon.classList.replace('fa-times', 'fa-bars');
      }
  }

  // Set active sidebar item
  function setActiveItem(item) {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
  }

  // Event Listeners
  hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSidebar();
  });

  sidebarItems.forEach(item => {
      item.addEventListener('click', function() {
          setActiveItem(this);
          if (window.innerWidth <= 768) {
              toggleSidebar();
          }
      });
  });

  document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 &&
          !sidebar.contains(e.target) &&
          !hamburgerBtn.contains(e.target) &&
          sidebar.classList.contains('active')) {
          toggleSidebar();
      }
  });

  window.addEventListener('resize', function() {
      initSidebar();
  });

  // Initialize
  initSidebar();

  // ==============================================
  // Particle Cleanup Function
  // ==============================================
  function removeNewParticles() {
      const cleanupInterval = setInterval(() => {
          if (pJSDom.length > 0) {
              let particles = pJSDom[0].pJS.particles.array;
              if (particles.length > 120) {
                  let extraParticles = particles.slice(120);
                  extraParticles.forEach((particle, index) => {
                      let randomTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
                      setTimeout(() => {
                          if (particles.length > 120) {
                              particles.splice(120 + index, 1);
                          }
                      }, randomTime);
                  });
              }
          } else {
              clearInterval(cleanupInterval);
          }
      }, 3000);
  }

  // ==============================================
  // Page Load Animation
  // ==============================================
  setTimeout(() => {
      document.body.classList.add('loaded');
  }, 500);
});








// Function to add 3D tilt effect based on mouse movement
document.querySelectorAll('.div1, .div2, .div3, .div4, .div5, .div6, .div7, .div8, .div9, .div10, .div11, .div12, .div13, .div14, .div15, .div16, .div17, .div18, .div19, .div20,.div21, .div22, .div23, .div24, .div25, .div26, .div27, .div28, .div29, .div30,.div31, .div32, .div33, .div34, .div35, .div36, .div37, .div38, .div39, .div40')
.forEach(function (element) {
element.addEventListener('mousemove', function (e) {
let width = element.offsetWidth;
let height = element.offsetHeight;
let offsetX = e.offsetX;
let offsetY = e.offsetY;
let centerX = width / 2;
let centerY = height / 2;
let rotateX = ((offsetY - centerY) / centerY) * 20; // Adjust 20 for intensity
let rotateY = ((offsetX - centerX) / centerX) * -20; // Adjust -20 for intensity

// Apply the 3D transformation based on mouse movement
element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

element.addEventListener('mouseleave', function () {
// Reset the transformation when the mouse leaves the div
element.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
});
