document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace(/,/g, '');
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    updateCount();
  });
});

        
        // Intersection Observer to trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe the stats section
        const statsSection = document.querySelector('.stats');
        observer.observe(statsSection);
        
        // Reset counters when page is refreshed
        window.addEventListener('load', () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                counter.innerText = '0';
            });
        });
        
// 3D tilt without scale
document.querySelectorAll('.video-container').forEach(container => {
    const thumbnail = container.querySelector('.video-thumbnail');

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((x - centerX) / centerX) * -15;

        thumbnail.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        thumbnail.style.transform = 'rotateX(0) rotateY(0)';
    });
});