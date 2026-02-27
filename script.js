/**
 * nuno.dev — GSAP animations
 * Grelha tech com palavras que pulsam aleatoriamente
 */

const TECH_WORDS = [
  'php', 'laravel', 'javascript', 'vue.js', 'react', 'flutter',
  'MySQL', 'PostgreSQL', 'OpenAI', 'Claude', 'AWS', 'Forge',
  'RabbitMQ', 'Liquibase', 'WordPress',
  'automação', 'CI/CD', 'DevOps', 'Kubernetes', 'Docker',
  'API', 'GraphQL', 'REST', 'microserviços', 'serverless',
  'MVP', 'agile', 'scrum', 'startup', 'scale-up',
  'Vercel', 'Vite', 'TypeScript', 'Tailwind', 'Supabase',
  'Stripe', 'Notion', 'Linear', 'Figma'
];

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createTechGrid() {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;

  const cols = 8;
  const rows = 5;
  const total = cols * rows;
  const words = shuffle([...TECH_WORDS]);

  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'tech-cell';
    const word = document.createElement('span');
    word.className = 'tech-word';
    word.textContent = words[i % words.length];
    cell.appendChild(word);
    grid.appendChild(cell);
  }
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomWord(currentWord) {
  const others = TECH_WORDS.filter((w) => w !== currentWord);
  return others.length > 0
    ? others[Math.floor(Math.random() * others.length)]
    : TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
}

document.addEventListener('DOMContentLoaded', () => {
  createTechGrid();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Logo
  tl.from('.logo', {
    opacity: 0,
    y: -12,
    duration: 0.8
  }, 0.2);

  // CTA link
  tl.from('.link', {
    opacity: 0,
    y: 8,
    duration: 0.6
  }, 0.4);

  // Footer nav
  tl.from('.nav-link', {
    opacity: 0,
    y: 8,
    duration: 0.5,
    stagger: 0.08
  }, 0.5);

  // Palavras tech — pulso aleatório (luz que liga/desliga)
  const words = document.querySelectorAll('.tech-word');
  words.forEach((el) => {
    const delay = randomBetween(0, 4);
    const fadeInDuration = randomBetween(0.8, 1.5);
    const fadeOutDuration = 5; // ~5s para desligar suavemente
    const pause = randomBetween(2, 5);

    const pulse = () => {
      gsap.to(el, {
        opacity: randomBetween(0.35, 0.55),
        color: 'rgba(212, 175, 55, 0.7)',
        duration: fadeInDuration,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(el, {
            opacity: 0.04,
            color: 'rgba(212, 175, 55, 0.15)',
            duration: fadeOutDuration,
            ease: 'power2.in',
            onComplete: () => {
              el.textContent = getRandomWord(el.textContent);
              gsap.delayedCall(pause, pulse);
            }
          });
        }
      });
    };

    gsap.delayedCall(delay, pulse);
  });
});
