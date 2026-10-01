const WHATSAPP = "5584991421656";

const projects = [
  {
    tipo: "SITE",
    nome: "MARRADA SPORT CLUB",
    descricao: "Conectando atletas, sócios e torcedores.",
    stack: [],
    imagem: "assets/marrada-sport-club.jpg",
    site: "https://www.marradasportclub.com.br",
    codigo: ""
  },
  {
    tipo: "SITE",
    nome: "MV LEDS",
    descricao: "Catálogo online para loja de iluminação automotiva.",
    stack: [],
    imagem: "assets/mv-leds.jpg",
    site: "https://www.mvleds.com.br",
    codigo: ""
  }
];

const PROMO_ATE = "";

const testimonials = [
  {
    texto: "O site eliminou as dúvidas repetitivas no atendimento e fez os clientes comprarem combos completos direto pelo WhatsApp. O fluxo de vendas nunca foi tão ágil.",
    nome: "Marcos Vinicius",
    negocio: "MV LEDs — Iluminação Automotiva"
  },
  {
    texto: "O site ficou moderno, intuitivo e muito rápido. Nossos clientes elogiam a facilidade para agendar horários e conhecer o espaço. Recomendo de olhos fechados!",
    nome: "Fillipe Bezerra",
    negocio: "Marrada Sport Club"
  }
];

const caseStudy = {
  cliente: "Marcos Vinicius",
  problema: "Atendimento sobrecarregado no WhatsApp com dúvidas repetitivas sobre encaixes, preços e temperatura de cor, gerando atrito e vendas limitadas a um único produto.",
  solucao: "Desenvolvi uma aplicação web de alta conversão com catálogo dinâmico, simulador Kelvin e carrinho com upsell integrado ao WhatsApp.",
  resultado: "Redução drástica no tempo de atendimento e aumento imediato do valor médio por pedido, com clientes a chegar ao WhatsApp já decididos e com itens complementares no carrinho.",
  imagem: "",
  link: ""
};

const MARQUEE_PHRASES = [
  "Sites modernos e responsivos",
  "Foco no seu negócio",
  "Simples, rápido e eficiente",
  "do Instagram ao WhatsApp"
];

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

document.documentElement.classList.add("js");

const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

function renderProjects() {
  $("#projects").innerHTML = projects.map((p, i) => {
    const media = p.imagem
      ? `<img src="${p.imagem}" alt="Captura de tela do projeto ${p.nome}" loading="lazy">`
      : `<span>${p.nome.toLowerCase()}</span>`;
    const links = [
      p.site ? `<a href="${p.site}" target="_blank" rel="noopener">ver site</a>` : "",
      p.codigo ? `<a href="${p.codigo}" target="_blank" rel="noopener">código</a>` : ""
    ].join("");
    return `
      <article class="card reveal" style="--d:${(i % 3) * 110}">
        <div class="card-media">${media}</div>
        <div class="card-body">
          <span class="card-type">// ${p.tipo.toLowerCase()}</span>
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <ul class="chips">${p.stack.map(s => `<li>${s}</li>`).join("")}</ul>
          ${links ? `<div class="card-links">${links}</div>` : ""}
        </div>
      </article>`;
  }).join("");
}

function renderTestimonials() {
  if (!testimonials.length) return;
  $("#depoimentos").hidden = false;
  $("#quotes").innerHTML = testimonials.map((t, i) => `
    <figure class="quote reveal" style="--d:${(i % 3) * 110}">
      <blockquote><p>${esc(t.texto)}</p></blockquote>
      <figcaption><strong>${esc(t.nome)}</strong>${esc(t.negocio)}</figcaption>
    </figure>`).join("");
}

function renderCase() {
  const c = caseStudy;
  if (!c.problema || !c.resultado) return;
  $("#caso").hidden = false;
  const blocks = [["O problema", c.problema, ""], ["O que eu fiz", c.solucao, ""], ["O resultado", c.resultado, " result"]].filter(b => b[1]);
  const media = c.imagem ? `<div class="case-media reveal"><img src="${esc(c.imagem)}" alt="Projeto ${esc(c.cliente)}" loading="lazy"></div>` : "";
  $("#case").classList.toggle("no-media", !c.imagem);
  $("#case").innerHTML = `${media}
    <div class="case-body">
      ${c.cliente ? `<p class="case-client reveal">// ${esc(c.cliente)}</p>` : ""}
      ${blocks.map(([titulo, texto, extra], i) => `<div class="case-block reveal${extra}" style="--d:${i * 120}"><h3>${titulo}</h3><p>${esc(texto)}</p></div>`).join("")}
      ${c.link ? `<a class="case-link reveal" href="${esc(c.link)}" target="_blank" rel="noopener">ver o site</a>` : ""}
    </div>`;
}

function splitText(root) {
  let i = 0;
  (function walk(node) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const w = document.createElement("span");
          const inner = document.createElement("span");
          w.className = "w";
          inner.className = "wi";
          inner.textContent = part;
          inner.style.setProperty("--i", i++);
          w.append(inner);
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        walk(n);
      }
    });
  })(root);
}

function prepare() {
  $$("[data-split]").forEach(splitText);
  $$(".flow").forEach(f => [...f.children].forEach((c, n) => c.style.setProperty("--n", n)));
}

function setupReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal, [data-split], .flow, .strike, .steps").forEach(el => io.observe(el));
}

function setupCounters() {
  if (reduce) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const end = Number(e.target.dataset.count);
      const t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / 1600);
        const eased = 1 - Math.pow(1 - p, 4);
        e.target.textContent = Math.round(end * eased).toLocaleString("pt-BR");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => io.observe(el));
}

function setupFaq() {
  const items = $$(".faq-item");
  const set = (item, open) => {
    item.classList.toggle("open", open);
    $(".faq-q", item).setAttribute("aria-expanded", String(open));
  };
  items.forEach(item => {
    $(".faq-q", item).addEventListener("click", () => {
      const open = !item.classList.contains("open");
      items.forEach(i => set(i, false));
      set(item, open);
    });
  });
  if (items[0]) set(items[0], true);
}

function setupPromo() {
  const el = $("#promo-until");
  if (!el || !PROMO_ATE) return;
  const end = new Date(`${PROMO_ATE}T23:59:59`);
  if (isNaN(end) || end < new Date()) return;
  el.textContent = `Promoção válida até ${end.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
  el.hidden = false;
}

function setupMarquee() {
  const track = $("#marquee-track");
  const group = () => {
    const g = document.createElement("div");
    g.className = "marquee-group";
    for (let r = 0; r < 2; r++) {
      MARQUEE_PHRASES.forEach(text => {
        const s = document.createElement("span");
        s.textContent = text;
        g.append(s, document.createElement("i"));
      });
    }
    return g;
  };
  const first = group();
  track.append(first, group());
  return { track, first };
}

function setupScroll(marquee) {
  const bar = $("#progress");
  const nav = $("#topbar");
  const parallax = $$("[data-speed]");
  let lastY = scrollY, vel = 0, dir = 1, offset = 0, groupWidth = marquee.first.offsetWidth;

  addEventListener("resize", () => { groupWidth = marquee.first.offsetWidth; });

  const frame = () => {
    const y = scrollY;
    const dy = y - lastY;
    const max = document.documentElement.scrollHeight - innerHeight;
    vel += (dy - vel) * .12;
    if (Math.abs(dy) > .5) dir = dy > 0 ? 1 : -1;

    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (y > 200 && dy > 2) nav.classList.add("hide");
    else if (dy < -2 || y < 200) nav.classList.remove("hide");

    if (!reduce) {
      offset -= dir * (.9 + Math.abs(vel) * .4);
      if (offset <= -groupWidth) offset += groupWidth;
      if (offset > 0) offset -= groupWidth;
      marquee.track.style.transform = `translate3d(${offset}px, 0, 0)`;

      if (y < innerHeight * 1.5) {
        parallax.forEach(el => { el.style.translate = `0 ${y * parseFloat(el.dataset.speed)}px`; });
      }
    }

    lastY = y;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function setupCursor() {
  if (!fine || reduce) return;
  const dot = $("#cursor"), ring = $("#ring");
  let x = 0, y = 0, rx = 0, ry = 0, active = false;

  addEventListener("pointermove", e => {
    x = e.clientX; y = e.clientY;
    if (!active) {
      active = true;
      rx = x; ry = y;
      document.documentElement.classList.add("has-cursor");
    }
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });

  document.addEventListener("pointerover", e => {
    ring.classList.toggle("hot", !!e.target.closest("a, button, input, textarea, .card, .stack li, .faq-q, .pack"));
  });
  document.addEventListener("pointerleave", () => document.documentElement.classList.remove("has-cursor"));
  document.addEventListener("pointerenter", () => { if (active) document.documentElement.classList.add("has-cursor"); });

  const loop = () => {
    rx += (x - rx) * .18;
    ry += (y - ry) * .18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

function setupMagnetic() {
  if (!fine || reduce) return;
  $$("[data-magnetic]").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * .28;
      const dy = (e.clientY - (r.top + r.height / 2)) * .4;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
}

function setupTilt() {
  if (!fine || reduce) return;
  $$(".card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(900px) rotateX(${(.5 - y) * 8}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`;
      card.style.setProperty("--gx", `${x * 100}%`);
      card.style.setProperty("--gy", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

function setupSpotlight() {
  $$(".grid-bg").forEach(sec => {
    sec.addEventListener("pointermove", e => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty("--mx", `${e.clientX - r.left}px`);
      sec.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
    sec.addEventListener("pointerleave", () => {
      sec.style.setProperty("--mx", "-999px");
      sec.style.setProperty("--my", "-999px");
    });
  });
}

function setupForm() {
  const form = $("#contact-form");
  const error = $("#form-error");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const negocio = form.negocio.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !mensagem) {
      error.textContent = "Preencha seu nome e o que você precisa.";
      return;
    }
    error.textContent = "";

    const texto = [
      `Olá, Luis! Meu nome é ${nome}.`,
      negocio ? `Meu negócio: ${negocio}.` : "",
      mensagem
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  });
}

function runIntro(onReveal) {
  const el = $("#intro");
  const count = $("#intro-count");
  let seen = null;
  try { seen = sessionStorage.getItem("intro-seen"); } catch (_) {}

  if (reduce || seen) {
    el.remove();
    onReveal();
    return;
  }

  document.documentElement.classList.add("lock");
  const t0 = performance.now();
  const duration = 1300;

  const step = now => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    count.textContent = String(Math.round(eased * 100)).padStart(3, "0");
    el.style.setProperty("--p", eased);
    if (p < 1) { requestAnimationFrame(step); return; }

    el.classList.add("out");
    setTimeout(onReveal, 250);
    setTimeout(() => {
      el.remove();
      document.documentElement.classList.remove("lock");
    }, 1000);
    try { sessionStorage.setItem("intro-seen", "1"); } catch (_) {}
  };
  requestAnimationFrame(step);
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  renderProjects();
  renderTestimonials();
  renderCase();
  prepare();
  const marquee = setupMarquee();
  setupScroll(marquee);
  setupCursor();
  setupMagnetic();
  setupTilt();
  setupSpotlight();
  setupForm();
  setupFaq();
  setupPromo();
  runIntro(() => { setupReveal(); setupCounters(); });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
