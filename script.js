/**
 * nuno.dev — GSAP animations
 * Grelha tech com palavras que pulsam aleatoriamente
 * Cores por categoria: azul (linguagens), verde (infra/devops), amarelo (startup/ferramentas)
 */

const WORD_CATEGORIES = [
  {
    color: 'blue',
    off: 'rgba(96, 165, 250, 0.12)',
    on: 'rgba(96, 165, 250, 0.95)',
    words: ['php', 'laravel', 'javascript', 'vue.js', 'react', 'flutter', 'TypeScript']
  },
  {
    color: 'green',
    off: 'rgba(74, 222, 128, 0.12)',
    on: 'rgba(74, 222, 128, 0.95)',
    words: ['MySQL', 'PostgreSQL', 'OpenAI', 'Claude', 'AWS', 'Forge', 'CI/CD', 'DevOps', 'Kubernetes', 'Docker', 'RabbitMQ', 'Liquibase', 'automação', 'API', 'GraphQL', 'REST', 'microserviços', 'serverless', 'Supabase']
  },
  {
    color: 'yellow',
    off: 'rgba(250, 204, 21, 0.12)',
    on: 'rgba(250, 204, 21, 0.95)',
    words: ['WordPress', 'MVP', 'agile', 'scrum', 'startup', 'scale-up', 'Vercel', 'Vite', 'Tailwind', 'Stripe', 'Notion', 'Linear', 'Figma']
  }
];

function getAllWords() {
  return WORD_CATEGORIES.flatMap((c) => c.words);
}

function getRandomWordWithCategory(currentWord) {
  const all = getAllWords();
  const others = all.filter((w) => w !== currentWord);
  const word = others.length > 0
    ? others[Math.floor(Math.random() * others.length)]
    : all[Math.floor(Math.random() * all.length)];
  const category = WORD_CATEGORIES.find((c) => c.words.includes(word));
  return { word, category };
}

function createTechGrid() {
  const grid = document.getElementById('tech-grid');
  if (!grid) return;

  const cols = 8;
  const rows = 5;
  const total = cols * rows;
  const all = getAllWords();

  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'tech-cell';
    const word = document.createElement('span');
    word.className = 'tech-word';
    const { word: w, category } = getRandomWordWithCategory('');
    word.textContent = w;
    word.dataset.category = category?.color ?? 'yellow';
    word.style.color = category?.off ?? 'rgba(250, 204, 21, 0.12)';
    cell.appendChild(word);
    grid.appendChild(cell);
  }
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
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

  // Palavras tech — pulso mais visível, cor por categoria
  const words = document.querySelectorAll('.tech-word');
  words.forEach((el) => {
    const delay = randomBetween(0, 4);
    const fadeInDuration = randomBetween(0.8, 1.5);
    const fadeOutDuration = 5;
    const pause = randomBetween(2, 5);

    const pulse = () => {
      const { word: newWord, category } = getRandomWordWithCategory(el.textContent);
      el.textContent = newWord;
      const offColor = category?.off ?? 'rgba(250, 204, 21, 0.12)';
      const onColor = category?.on ?? 'rgba(250, 204, 21, 0.95)';
      el.dataset.category = category?.color ?? 'yellow';

      gsap.to(el, {
        opacity: 1,
        color: onColor,
        textShadow: '0 0 12px currentColor, 0 0 28px currentColor',
        duration: fadeInDuration,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(el, {
            opacity: 0.18,
            color: offColor,
            textShadow: 'none',
            duration: fadeOutDuration,
            ease: 'power2.in',
            onComplete: () => {
              gsap.delayedCall(pause, pulse);
            }
          });
        }
      });
    };

    gsap.delayedCall(delay, pulse);
  });
});
