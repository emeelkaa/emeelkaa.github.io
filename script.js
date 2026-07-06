// Fade-in sections as they enter the viewport
const sections = document.querySelectorAll('main section');
if ('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => observer.observe(s));
} else {
  sections.forEach(s => s.classList.add('in-view'));
}

// Certificates carousel
const track = document.querySelector('.carousel-track');
if (track){
  const items = track.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsWrap = document.querySelector('.carousel-dots');

  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => scrollToItem(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  function scrollToItem(i){
    items[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }

  function updateActiveDot(){
    const trackLeft = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.offsetLeft - trackLeft);
      if (dist < minDist){ minDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closest));
  }

  prevBtn.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(updateActiveDot));
}
