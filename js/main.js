/* Site behaviour. Content lives in js/data.js — you normally don't need to edit this file. */
(function () {
  const P = window.PROFILE;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const abbr = (name) => name.replace(/[^A-Za-z0-9+ ]/g, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase() || name.slice(0, 2);

  /* A logo image, or a letter badge if there is no image (or it fails to load). */
  function logo(name, url, mono) {
    if (!url) return `<span class="logo fallback">${esc(abbr(name))}</span>`;
    return `<span class="logo" data-abbr="${esc(abbr(name))}"><img src="${esc(url)}" alt="" loading="lazy"${mono ? ' class="mono"' : ""}></span>`;
  }
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG") return;
    const box = img.closest(".logo");
    if (box) { box.classList.add("fallback"); box.textContent = box.dataset.abbr || ""; }
    else if (img.closest(".thumb, .badge-photo, .n")) img.remove();
  }, true);

  /* ---------- Fill content ---------- */
  $("#brand").innerHTML = `${esc(P.brand)}<b>.dev</b>`;
  $("#availText").textContent = P.availability;
  $("#heroLead").textContent = P.lead;
  $("#heroChips").innerHTML = P.heroChips.map((c) => `<span class="chip">${esc(c)}</span>`).join("");
  $("#cvTop").href = $("#cvLink").href = P.cv;
  const B = P.badge || {};
  $("#bCompany").textContent = B.company || "";
  $("#bLabel").textContent = B.label || "";
  $("#bName").textContent = P.short;
  $("#bTitle").textContent = B.title || "";
  $("#bTitle").hidden = !B.title;
  $("#bId").textContent = B.id ? `ID ${B.id}` : "";
  $("#bInit").textContent = P.initials;
  if (P.photo) $("#bPhoto").insertAdjacentHTML("afterbegin", `<img src="${esc(P.photo)}" alt="Photo of ${esc(P.short)}" draggable="false" style="object-position:${esc(P.photoFocus || "50% 30%")}">`);

  const parts = P.short.split(" ");
  $("#aboutName").innerHTML = `Hi, I'm<br>${esc(parts[0])} <span class="dim">${esc(parts.slice(1).join(" "))}</span>`;
  $("#quote").textContent = `“${P.quote}”`;
  $("#langs").innerHTML = P.languages.map((l) => `<span class="chip">${esc(l)}</span>`).join("");
  $("#bio").innerHTML = P.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#email").textContent = P.email;
  $("#copy").textContent = `© ${new Date().getFullYear()} ${P.name}`;

  const fmt = (v, d) => (d ? v.toFixed(d) : Math.round(v));
  $("#stats").innerHTML = P.stats.map((s) => `<div class="stat"><b data-count="${s.value}" data-dec="${s.decimals || 0}" data-suf="${esc(s.suffix)}">${fmt(s.value, s.decimals)}${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`).join("");

  // Marquee: every skill that has a logo, listed twice for a seamless loop.
  const allSkills = Object.values(P.skills).flat().filter((s) => s.logo);
  const once = allSkills.map((s) => `<span class="marquee-item">${logo(s.name, s.logo, s.mono)}${esc(s.name)}</span>`).join("");
  $("#marquee").innerHTML = once + once.replace(/class="marquee-item"/g, 'class="marquee-item" aria-hidden="true"');

  const tl = (items) => items.map((e, i) => `
    <li>
      <span class="n">${e.logo ? `<img src="${esc(e.logo)}" alt="">` : String(i + 1).padStart(2, "0")}</span>
      <div class="item">
        <div class="when">${esc(e.when)}</div>
        <div class="org">${esc(e.org)}</div>
        ${e.what ? `<div class="what">${esc(e.what)}</div>` : ""}
        <div class="meta"><span class="chip sm">${esc(e.tag)}</span></div>
        ${e.points ? `<ul class="points">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        ${e.images && e.images.length ? `<div class="tl-photos">${e.images.map((src) =>
          `<button type="button" class="tl-photo" data-zoom="${esc(src)}" aria-label="Enlarge photo from ${esc(e.org)}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      </div>
    </li>`).join("");
  $("#exp").innerHTML = tl(P.experience);
  $("#edu").innerHTML = tl(P.education);
  $("#act").innerHTML = tl(P.activities);
  // Photo lightbox for timeline pictures
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.hidden = true;
  lb.innerHTML = `<img alt=""><button type="button" class="modal-close" aria-label="Close">×</button>`;
  document.body.appendChild(lb);
  document.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { lb.querySelector("img").src = z.dataset.zoom; lb.hidden = false; return; }
    if (!lb.hidden && e.target.closest(".lightbox")) lb.hidden = true;
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });

  $("#socials").innerHTML = P.socials.map((s) => `<a class="social" href="${esc(s.url)}" target="_blank" rel="noopener"><b>${esc(s.name)}</b><span>${esc(s.handle)} ↗</span></a>`).join("");

  /* ---------- Work tabs ---------- */
  const thumbInner = (p) => p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}">` :
    `<div class="metric">${esc(p.metric)}<small>${esc(p.metricLabel)}</small></div>
     <div class="flow">${p.flow.map((f) => (f === "vs" ? "<em>vs</em>" : `<span>${esc(f)}</span>`)).join("<em>→</em>").replace(/<em>→<\/em><em>vs<\/em><em>→<\/em>/g, "<em>vs</em>")}</div>`;

  function renderTab(tab) {
    document.querySelectorAll(".tabs button").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab));
    const panel = $("#panel");
    panel.classList.remove("panel-in"); void panel.offsetWidth; panel.classList.add("panel-in");
    if (tab === "skills") {
      panel.innerHTML = `<div class="skill-groups">${Object.entries(P.skills).map(([g, list]) =>
        `<div class="sg"><h4>${esc(g)}</h4><div class="skill-list">${list.map((s) =>
          `<div class="skill">${logo(s.name, s.logo, s.mono)}<span>${esc(s.name)}</span></div>`).join("")}</div></div>`).join("")}</div>`;
      return;
    }
    if (tab === "certificates") {
      panel.innerHTML = `<div class="certs">${P.certificates.map((c) => {
        const inner = `${logo(c.issuer, c.logo, false)}<div><b>${esc(c.title)}</b><span>${esc(c.issuer)}${c.link ? " ↗" : ""}</span></div>`;
        return c.link ? `<a class="cert" href="${esc(c.link)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="cert">${inner}</div>`;
      }).join("")}</div>`;
      return;
    }
    panel.innerHTML = `<div class="grid">${P.projects.map((p, i) => `
      <button type="button" class="card${i === 0 ? " featured" : ""}" data-open="${i}">
        <div class="thumb">${thumbInner(p)}</div>
        <div class="card-body">
          <span class="date">${i === 0 ? "Featured · " : ""}${esc(p.date)}</span>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.desc)}</p>
          <div class="card-foot">
            <div class="stack">${p.stack.slice(0, 3).map((s) => `<span class="chip sm">${esc(s)}</span>`).join("")}</div>
            <span class="more-link">Details →</span>
          </div>
        </div>
      </button>`).join("")}</div>`;
  }
  document.querySelector(".tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-tab]");
    if (b) { renderTab(b.dataset.tab); try { localStorage.setItem("pf-tab", b.dataset.tab); } catch {} }
  });
  let startTab = "projects";
  try { startTab = localStorage.getItem("pf-tab") || "projects"; } catch {}
  renderTab(startTab);

  /* ---------- Project modal ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (!b) return;
    const p = P.projects[+b.dataset.open];
    $("#m-thumb").innerHTML = thumbInner(p);
    $("#m-date").textContent = p.date;
    $("#m-title").textContent = p.title;
    $("#m-stack").innerHTML = p.stack.map((s) => `<span class="chip sm">${esc(s)}</span>`).join("");
    $("#m-points").innerHTML = p.points.map((x) => `<li>${esc(x)}</li>`).join("");
    $("#m-links").innerHTML =
      (p.live ? `<a class="btn primary" href="${esc(p.live)}" target="_blank" rel="noopener">Live demo ↗</a>` : "") +
      (p.code ? `<a class="btn" href="${esc(p.code)}" target="_blank" rel="noopener">GitHub ↗</a>` : "");
    lastFocus = b; modal.hidden = false; $("#modalClose").focus();
  });
  const closeModal = () => { modal.hidden = true; lastFocus && lastFocus.focus(); };
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ---------- Copy email ---------- */
  $("#copyEmail").addEventListener("click", async () => {
    const btn = $("#copyEmail");
    try { await navigator.clipboard.writeText(P.email); btn.textContent = "Copied"; }
    catch { const r = document.createRange(); r.selectNodeContents($("#email")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Press Ctrl+C"; }
    setTimeout(() => (btn.textContent = "Copy"), 1800);
  });

  /* ---------- Contact form ---------- */
  $("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.target, note = $("#formNote");
    if (!f.checkValidity()) { note.textContent = "Please fill in your name, a valid email and a message."; return; }
    if (!P.formEndpoint) { note.textContent = `The form isn't connected yet. Email me at ${P.email}.`; return; }
    note.textContent = "Sending…";
    try {
      const r = await fetch(P.formEndpoint, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
      if (!r.ok) throw 0;
      f.reset(); note.textContent = "Thanks! Your message has been sent.";
    } catch { note.textContent = `Couldn't send right now. Email me at ${P.email} instead.`; }
  });

  /* ---------- Typing effect ---------- */
  (function () {
    const el = $("#typed");
    if (reduced) { el.textContent = P.typed[0]; return; }
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = P.typed[r];
      c += del ? -1 : 1; el.textContent = word.slice(0, c);
      let wait = del ? 35 : 80;
      if (!del && c === word.length) { del = true; wait = 1700; }
      else if (del && c === 0) { del = false; r = (r + 1) % P.typed.length; wait = 300; }
      setTimeout(tick, wait);
    })();
  })();

  /* ---------- Theme: auto / light / dark ---------- */
  function setTheme(mode) {
    if (mode === "light" || mode === "dark") root.dataset.theme = mode; else delete root.dataset.theme;
    document.querySelectorAll(".theme-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === mode));
    try { localStorage.setItem("pf-theme", mode); } catch {}
  }
  let savedTheme = "auto";
  try { savedTheme = localStorage.getItem("pf-theme") || "auto"; } catch {}
  setTheme(savedTheme);
  document.querySelector(".theme-switch").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-mode]"); if (b) setTheme(b.dataset.mode);
  });

  /* ---------- Nav highlight, reveal, counters, progress ---------- */
  const links = [...document.querySelectorAll(".nav-links a")];
  const navIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const id = en.target.id === "journey" ? "about" : en.target.id;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["home", "about", "journey", "work", "contact"].forEach((id) => navIO.observe(document.getElementById(id)));

  const revIO = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revIO.unobserve(en.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((el) => revIO.observe(el));

  const statIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting || reduced) return;
    statIO.disconnect();
    en.target.querySelectorAll("[data-count]").forEach((b) => {
      const to = +b.dataset.count, d = +b.dataset.dec, suf = b.dataset.suf, t0 = performance.now();
      (function step(t) { const k = Math.min(1, (t - t0) / 1300); b.textContent = fmt(to * (1 - Math.pow(1 - k, 3)), d) + suf; if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }), { threshold: .5 });
  statIO.observe($("#stats"));

  const bar = $("#progress");
  const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Intro screen (once per visit) ---------- */
  let seen = false;
  try { seen = sessionStorage.getItem("pf-intro") === "1"; sessionStorage.setItem("pf-intro", "1"); } catch {}
  if (reduced || seen || !P.greetings?.length) document.body.classList.add("loaded");
  else {
    const intro = document.createElement("div");
    intro.className = "intro"; intro.setAttribute("aria-hidden", "true");
    intro.innerHTML = `<div class="intro-word"></div>`;
    document.body.appendChild(intro);
    const word = intro.firstChild;
    let i = 0;
    const show = () => { word.textContent = P.greetings[i]; word.classList.remove("swap"); void word.offsetWidth; word.classList.add("swap"); };
    show();
    const iv = setInterval(() => {
      i++;
      if (i < P.greetings.length) { show(); return; }
      clearInterval(iv);
      intro.classList.add("out");
      document.body.classList.add("loaded");
      setTimeout(() => intro.remove(), 900);
    }, 520);
  }

  /* ---------- Custom cursor (mouse only) ---------- */
  if (!reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px, ${y}px)`; });
    document.addEventListener("pointerover", (e) => ring.classList.toggle("big", !!e.target.closest("a, button, .badge-wrap, .card")));
    (function follow() { rx += (x - rx) * .18; ry += (y - ry) * .18; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(follow); })();
  }

  /* =================================================================
     Lanyard: a verlet rope hangs from the top of the stage and the badge
     is a two-point rigid body on its end. Drag it; let go and it swings.
     ================================================================= */
  (function lanyard() {
    const stage = $("#stage"), cv = $("#strap"), ctx = cv.getContext("2d"), badge = $("#badge"), card = $("#badgeCard");
    const N = 16, G = 0.55, DAMP = 0.985, ITER = 14;
    let W, H, anchor, segLen, cardLen, pts = [], tail, drag = null, running = false, visible = true, t = 0;
    const css = (v) => getComputedStyle(root).getPropertyValue(v).trim();

    function layout() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = stage.clientWidth; H = stage.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bh = badge.offsetHeight;
      anchor = { x: W / 2, y: -10 };
      const ropeLen = Math.max(120, H - bh - 60);
      segLen = ropeLen / N; cardLen = bh * 0.85;
      if (!pts.length) {
        for (let i = 0; i <= N; i++) { const y = anchor.y + i * segLen; pts.push({ x: anchor.x + i * 2.2, y, px: anchor.x, py: y }); }
        const e = pts[N]; tail = { x: e.x + 40, y: e.y + cardLen, px: e.x + 40, py: e.y + cardLen };
      } else {
        const dx = anchor.x - pts[0].x; pts.forEach((p) => { p.x += dx; p.px += dx; }); tail.x += dx; tail.px += dx;
      }
    }
    function constrain(a, b, len, wa, wb) {
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6, diff = (d - len) / d;
      a.x += dx * diff * wa; a.y += dy * diff * wa; b.x -= dx * diff * wb; b.y -= dy * diff * wb;
    }
    function step() {
      t += 1;
      const wind = reduced ? 0 : Math.sin(t / 90) * 0.035;
      const all = pts.concat(tail);
      for (const p of all) {
        const vx = (p.x - p.px) * DAMP, vy = (p.y - p.py) * DAMP;
        p.px = p.x; p.py = p.y; p.x += vx + wind; p.y += vy + G;
      }
      for (let k = 0; k < ITER; k++) {
        pts[0].x = anchor.x; pts[0].y = anchor.y;
        if (drag) { const e = pts[N]; e.x = drag.x; e.y = drag.y; }
        for (let i = 0; i < N; i++) constrain(pts[i], pts[i + 1], segLen, i === 0 ? 0 : .5, drag && i + 1 === N ? 0 : .5);
        constrain(pts[N], tail, cardLen, drag ? 0 : .25, drag ? 1 : .75);
      }
      for (const p of all) { p.y = Math.min(p.y, H * 1.25); p.x = Math.max(W * .02, Math.min(W * .98, p.x)); }
    }
    /* Prints the company name repeatedly along the strap, like a corporate lanyard. */
    const label = ((P.badge && P.badge.company) || P.brand || "").toUpperCase();
    function strapText() {
      if (!label) return;
      const seg = [];
      let total = 0;
      for (let i = 0; i < N; i++) {
        const a = pts[i], b = pts[i + 1], len = Math.hypot(b.x - a.x, b.y - a.y);
        seg.push({ a, len, ang: Math.atan2(b.y - a.y, b.x - a.x), start: total }); total += len;
      }
      ctx.font = "600 8.5px 'JetBrains Mono', monospace";
      ctx.fillStyle = css("--strap-hi"); ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const text = (label + "  ◆  ").repeat(40);
      let s = 14, k = 0;
      for (let ci = 0; ci < text.length && s < total - 6; ci++) {
        const ch = text[ci], w = ctx.measureText(ch).width + 1.2;
        const mid = s + w / 2;
        while (k < seg.length - 1 && seg[k].start + seg[k].len < mid) k++;
        const g = seg[k], f = (mid - g.start) / (g.len || 1);
        const x = g.a.x + Math.cos(g.ang) * g.len * f, y = g.a.y + Math.sin(g.ang) * g.len * f;
        ctx.save(); ctx.translate(x, y); ctx.rotate(g.ang); ctx.fillText(ch, 0, 0); ctx.restore();
        s += w;
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const path = () => {
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < N; i++) { const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2; ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my); }
        ctx.lineTo(pts[N].x, pts[N].y);
      };
      ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 18; ctx.save(); ctx.translate(3, 4); path(); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = css("--strap"); ctx.lineWidth = 16; path(); ctx.stroke();
      strapText();

      const e = pts[N], ang = Math.atan2(tail.x - e.x, tail.y - e.y);
      const tilt = Math.max(-38, Math.min(38, (e.x - e.px) * 2.4));
      badge.style.transform = `translate(${e.x - badge.offsetWidth / 2}px, ${e.y - 6}px) rotate(${-ang}rad)`;
      card.style.transform = `rotateY(${tilt}deg)`;
      card.style.setProperty("--shine", `${-120 + (tilt + 38) * 3.2}%`);
    }
    function frame() { step(); step(); draw(); if (visible) requestAnimationFrame(frame); else running = false; }
    function start() { if (!running) { running = true; requestAnimationFrame(frame); } }

    const local = (ev) => { const r = stage.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top }; };
    let grabOff = { x: 0, y: 0 };
    badge.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      badge.setPointerCapture(ev.pointerId); badge.classList.add("dragging");
      const p = local(ev), e = pts[N]; grabOff = { x: p.x - e.x, y: p.y - e.y };
      drag = { x: e.x, y: e.y }; start();
    });
    badge.addEventListener("pointermove", (ev) => {
      if (!drag) return;
      const p = local(ev);
      let x = p.x - grabOff.x, y = p.y - grabOff.y;
      const dx = x - anchor.x, dy = y - anchor.y, d = Math.hypot(dx, dy), max = segLen * N * 1.12;
      if (d > max) { x = anchor.x + dx / d * max; y = anchor.y + dy / d * max; }
      drag.x = x; drag.y = y;
    });
    const release = () => { drag = null; badge.classList.remove("dragging"); };
    badge.addEventListener("pointerup", release);
    badge.addEventListener("pointercancel", release);

    layout();
    for (let i = 0; i < 240; i++) step();
    draw();
    if (!reduced) { pts[N].px -= 5; tail.px -= 9; }
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); }).observe(stage);
    addEventListener("resize", () => { layout(); draw(); });
    start();
  })();
})();
