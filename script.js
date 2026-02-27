/**
 * nuno.dev — GSAP animations
 * Subtle, professional entrance and ambient effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Grid lines — subtle fade in (from 0 to CSS base opacity)
  gsap.set('.grid-line', { opacity: 0 });
  tl.to('.grid-line', {
    opacity: 0.06,
    duration: 1.2,
    stagger: { each: 0.15, from: 'center' },
    ease: 'power2.inOut'
  }, 0);

  // Logo
  tl.from('.logo', {
    opacity: 0,
    y: -12,
    duration: 0.8
  }, 0.2);

  // Name — elegant reveal
  tl.from('.name', {
    opacity: 0,
    y: 24,
    duration: 1,
    ease: 'power3.out'
  }, 0.4);

  // Tagline — staggered words
  tl.from('.tagline-word', {
    opacity: 0,
    y: 12,
    duration: 0.6,
    stagger: 0.15
  }, 0.7);

  tl.from('.tagline-sep', {
    opacity: 0,
    duration: 0.4
  }, 0.75);

  // CTA link
  tl.from('.link', {
    opacity: 0,
    y: 8,
    duration: 0.6
  }, 0.9);

  // Footer nav
  tl.from('.nav-link', {
    opacity: 0,
    y: 8,
    duration: 0.5,
    stagger: 0.08
  }, 1);

  // Grid lines — very subtle breathing (ambient)
  gsap.to('.grid-line', {
    opacity: 0.08,
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: { each: 0.5 },
    delay: 2.5
  });
});
