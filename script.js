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
