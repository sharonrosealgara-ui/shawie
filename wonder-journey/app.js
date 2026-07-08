/* ============================================================
   WONDER JOURNEY OS — application logic
   Vanilla JS. Progress saved in localStorage so it works offline
   and survives refreshes. Designed to later swap to a database.
   ============================================================ */

const STORE_KEY = "wonder-journey:v1";

const DEFAULT_STATE = {
  xp: 0,
  completed: {},          // { adventureId: { score, total, date } }
  badges: [],             // [badgeId]
  stamps: [],             // [adventureId]
  reflections: {},        // { adventureId: [answers] }
  family: [
    { name: "Shaun", role: "Dad", emoji: "👨", color: "#0e7c86" },
    { name: "Taylor", role: "Mom", emoji: "👩", color: "#e5674f" },
    { name: "Kiddo", role: "Explorer", emoji: "🧒", color: "#3f9d54" },
  ],
  faith: true,            // show Bible / faith content
  theme: "light",
};

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(raw));
  } catch (e) { return structuredClone(DEFAULT_STATE); }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function levelInfo() {
  let cur = LEVELS[0], next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (S.xp >= LEVELS[i].at) { cur = LEVELS[i]; next = LEVELS[i + 1] || null; }
  }
  const floor = cur.at;
  const ceil = next ? next.at : cur.at + 500;
  const pct = Math.min(100, Math.round(((S.xp - floor) / (ceil - floor)) * 100));
  return { cur, next, floor, ceil, pct };
}
const isDone = (id) => !!S.completed[id];
function isUnlocked(idx) {
  if (idx === 0) return true;
  return isDone(ADVENTURES[idx - 1].id); // linear path
}

/* ---------- top bar ---------- */
function renderTop() {
  const L = levelInfo();
  $("#lvlName").textContent = `${L.cur.emoji} ${L.cur.name}`;
  $("#xpText").textContent = L.next ? `${S.xp} / ${L.ceil} XP` : `${S.xp} XP · MAX`;
  $("#xpFill").style.width = L.pct + "%";
  $("#cXp").textContent = S.xp;
  $("#cStamp").textContent = S.stamps.length;
  $("#cBadge").textContent = S.badges.length;
  $("#themeBtn").textContent = S.theme === "dark" ? "☀️" : "🌙";
}

/* ---------- rewards ---------- */
function awardBadge(id) {
  if (!id || S.badges.includes(id)) return null;
  S.badges.push(id);
  return BADGES.find(b => b.id === id);
}
function checkAutoBadges(newlyEarned) {
  const doneCount = Object.keys(S.completed).length;
  const grant = (id) => { const b = awardBadge(id); if (b) newlyEarned.push(b); };
  if (doneCount >= 1) grant("first-steps");
  if (doneCount >= 3) grant("streak-3");
  if (doneCount >= 7) grant("streak-7");
  // bible-explorer: 3 completed adventures that had a faith section (all our first 5 do)
  const faithDone = ADVENTURES.filter(a => isDone(a.id) && a.sections.some(s => s.faith)).length;
  if (S.faith && faithDone >= 3) grant("bible-explorer");
  if (ADVENTURES.every(a => isDone(a.id))) grant("world1-champ");
}

function completeAdventure(adv, score, total) {
  const firstTime = !isDone(adv.id);
  const newly = [];
  // XP: full award first time, small replay bonus after
  let gained = 0;
  if (firstTime) {
    gained = adv.xp + score * 10;
    S.completed[adv.id] = { score, total, date: new Date().toISOString().slice(0, 10) };
    if (!S.stamps.includes(adv.id)) S.stamps.push(adv.id);
    const b = awardBadge(adv.badge); if (b) newly.push(b);
  } else {
    // keep best score
    const prev = S.completed[adv.id];
    if (score > prev.score) prev.score = score;
    gained = score * 4;
  }
  if (score === total) { const qs = awardBadge("quiz-star"); if (qs) newly.push(qs); }
  S.xp += gained;
  checkAutoBadges(newly);
  save(); renderTop();
  celebrate(adv, score, total, gained, newly, firstTime);
}

/* ---------- celebration modal ---------- */
function celebrate(adv, score, total, gained, badges, firstTime) {
  confettiBurst();
  const perfect = score === total;
  const box = $("#modalBox");
  box.innerHTML = `
    <div class="burst">${perfect ? "🌟" : "🎉"}</div>
    <h2>${firstTime ? "Adventure Complete!" : "Great Review!"}</h2>
    <p>${esc(adv.title)}</p>
    <div class="reward-row">
      <div class="reward">⭐ +${gained} XP</div>
      <div class="reward">📝 ${score}/${total}</div>
      ${firstTime ? `<div class="reward">🛂 ${esc(adv.stamp.name)}</div>` : ""}
    </div>
    ${badges.length ? `<p style="font-weight:800;margin-top:6px">New badge${badges.length > 1 ? "s" : ""} unlocked!</p>
      <div class="reward-row">${badges.map(b => `<div class="reward">${b.emoji} ${esc(b.name)}</div>`).join("")}</div>` : ""}
    <button class="btn btn-primary" style="width:100%;margin-top:14px" onclick="closeModal();go('map')">Back to the Map 🗺️</button>
    <button class="btn btn-ghost" style="width:100%;margin-top:8px" onclick="closeModal()">Stay here</button>
  `;
  $("#modalBg").classList.add("show");
}
window.closeModal = () => $("#modalBg").classList.remove("show");
$("#modalBg").addEventListener("click", (e) => { if (e.target.id === "modalBg") closeModal(); });

function confettiBurst() {
  const colors = ["#f4a821", "#e5674f", "#0e7c86", "#3f9d54", "#7a5cc4", "#ffca4b"];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animation = `fall ${1 + Math.random() * 1.5}s linear ${Math.random() * .4}s forwards`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

/* ---------- views ---------- */
const root = () => $("#viewRoot");

function viewHome() {
  const doneCount = Object.keys(S.completed).length;
  const nextIdx = ADVENTURES.findIndex((a, i) => !isDone(a.id) && isUnlocked(i));
  const next = nextIdx >= 0 ? ADVENTURES[nextIdx] : null;
  const fam = S.family[0]?.name ? S.family.map(f => f.name).slice(0, 2).join(" & ") : "Family";
  root().innerHTML = `
    <div class="view">
      <div class="hero">
        <h1>Kumusta, ${esc(fam)} Family! 👋</h1>
        <p>Welcome to your Wonder Journey. Right now you're exploring <b>World 1 — the Philippines 🇵🇭</b>. Learn together, cook together, and grow together, one adventure at a time.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px">
          ${next
            ? `<button class="btn btn-primary" onclick="openAdventure('${next.id}')">${doneCount ? "Continue" : "Start"} Adventure ${next.emoji}</button>`
            : `<button class="btn btn-sun" onclick="go('passport')">🏆 World 1 Complete! View Passport</button>`}
          <button class="btn btn-ghost" onclick="go('map')">🗺️ See the Map</button>
        </div>
        <div class="wave">🏝️</div>
      </div>

      <div class="grid g-auto" style="margin-top:20px">
        ${stat("Adventures Done", `${doneCount} / ${ADVENTURES.length}`, "🧭")}
        ${stat("Total XP", S.xp, "⭐")}
        ${stat("Passport Stamps", S.stamps.length, "🛂")}
        ${stat("Badges Earned", `${S.badges.length} / ${BADGES.length}`, "🏅")}
      </div>

      <div class="section-title"><span class="em">🎯</span> ${next ? "Up Next" : "You did it!"}</div>
      ${next ? advCard(next, nextIdx, true) : `<div class="card empty"><div class="em">🏆</div><p>You've finished every adventure in World 1. Amazing work, team!</p></div>`}

      <div class="section-title"><span class="em">👨‍👩‍👧‍👦</span> Our Explorers</div>
      <div class="grid g-auto">
        ${S.family.map(f => `
          <div class="card fam-card">
            <div class="av" style="background:${esc(f.color)}">${esc(f.emoji)}</div>
            <h3>${esc(f.name)}</h3><div class="role">${esc(f.role)}</div>
          </div>`).join("")}
      </div>
    </div>`;
}

function stat(lbl, val, em) {
  return `<div class="card stat"><span class="em">${em}</span><span class="lbl">${lbl}</span><span class="val">${val}</span></div>`;
}

function viewMap() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🗺️ Adventure Map</h1>
      <p style="color:var(--ink-soft);margin:6px 0 20px">World 1 · The Philippines 🇵🇭 — finish each adventure to unlock the next!</p>
      <div class="map">
        ${ADVENTURES.map((a, i) => {
          const done = isDone(a.id), open = isUnlocked(i) && !done, lock = !isUnlocked(i);
          const cls = done ? "state-done" : open ? "state-open" : "state-lock";
          const icon = done ? "✓" : lock ? "🔒" : (i + 1);
          return `
          <div class="node">
            <div class="rail"><div class="dot ${cls}">${icon}</div><div class="line"></div></div>
            <div class="body">${advCard(a, i)}</div>
          </div>`;
        }).join("")}
      </div>
    </div>`;
}

function advCard(a, i, plain) {
  const done = isDone(a.id), locked = !isUnlocked(i);
  const clickable = !locked;
  const subs = [...new Set(a.sections.map(s => s.subject.split(" ")[0].split("—")[0].trim()))].slice(0, 5);
  return `
    <div class="card adv-card ${clickable ? "clickable" : "locked"}" ${clickable ? `onclick="openAdventure('${a.id}')"` : ""}>
      <div class="emoji">${a.emoji}</div>
      <div style="flex:1;min-width:0">
        <h3>${esc(a.title)}</h3>
        <div class="meta">${esc(a.region)} · +${a.xp} XP · 💛 ${esc(a.value)}</div>
        <div class="tags">${subs.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      </div>
      ${done ? `<div class="done-badge">✓ Done</div>` : locked ? `<div class="done-badge" style="color:var(--ink-soft)">🔒 Locked</div>` : ""}
    </div>`;
}

/* ---------- adventure detail ---------- */
let quizState = null;

function openAdventure(id) {
  const a = ADVENTURES.find(x => x.id === id);
  const idx = ADVENTURES.findIndex(x => x.id === id);
  if (!isUnlocked(idx)) return;
  quizState = { adv: a, answers: {}, submitted: false };
  const hue = ["#0e7c86", "#e5674f", "#3f9d54", "#7a5cc4", "#f4a821"][idx % 5];
  const sections = a.sections.filter(s => !(s.faith && !S.faith));
  root().innerHTML = `
    <div class="view">
      <button class="back" onclick="go('map')">← Back to Map</button>
      <div class="lesson-hero" style="background:linear-gradient(135deg,${hue},color-mix(in srgb,${hue} 60%, #000 15%))">
        <h1>${a.emoji} ${esc(a.title)}</h1>
        <p>${esc(a.subtitle)}</p>
        <div class="big">${a.emoji}</div>
      </div>

      <div class="section-title"><span class="em">📚</span> Let's Learn Together</div>
      ${sections.map((s, i) => `
        <div class="subj ${i === 0 ? "open" : ""}">
          <div class="subj-head" onclick="this.parentElement.classList.toggle('open')">
            <span class="em">${s.icon}</span><h3>${esc(s.subject)}</h3><span class="chev">›</span>
          </div>
          <div class="subj-body">${s.html}</div>
        </div>`).join("")}

      <div class="section-title"><span class="em">🏆</span> Adventure Quiz</div>
      <div class="card quiz" id="quizCard">${renderQuiz(a)}</div>

      <div class="section-title"><span class="em">📝</span> Family Reflection</div>
      <div class="card quiz reflect">
        ${a.reflect.map((q, i) => `
          <div class="q"><div class="qt">${esc(q)}</div>
          <textarea data-r="${i}" placeholder="Write or draw your answer together...">${esc((S.reflections[a.id] || [])[i] || "")}</textarea></div>`).join("")}
        <button class="btn btn-ghost" onclick="saveReflections('${a.id}')">💾 Save Our Answers</button>
      </div>
    </div>`;
  window.scrollTo(0, 0);
}

function renderQuiz(a) {
  return `
    ${a.quiz.map((q, qi) => `
      <div class="q" data-q="${qi}">
        <div class="qt">${qi + 1}. ${esc(q.q)}</div>
        ${q.a.map((opt, oi) => `<button class="opt" data-q="${qi}" data-o="${oi}" onclick="pickAnswer(${qi},${oi})">${esc(opt)}</button>`).join("")}
      </div>`).join("")}
    <button class="btn btn-primary" style="width:100%;margin-top:10px" id="submitBtn" onclick="submitQuiz()">Check Our Answers ✅</button>
  `;
}

window.pickAnswer = (qi, oi) => {
  if (quizState.submitted) return;
  quizState.answers[qi] = oi;
  document.querySelectorAll(`.opt[data-q="${qi}"]`).forEach(b => {
    b.style.borderColor = (+b.dataset.o === oi) ? "var(--ocean)" : "var(--line)";
    b.style.background = (+b.dataset.o === oi) ? "color-mix(in srgb,var(--ocean) 10%,transparent)" : "var(--card)";
  });
};

window.submitQuiz = () => {
  const a = quizState.adv;
  if (Object.keys(quizState.answers).length < a.quiz.length) {
    const btn = $("#submitBtn"); btn.textContent = "Please answer every question 🙂";
    setTimeout(() => btn.textContent = "Check Our Answers ✅", 1600); return;
  }
  quizState.submitted = true;
  let score = 0;
  a.quiz.forEach((q, qi) => {
    const chosen = quizState.answers[qi];
    if (chosen === q.correct) score++;
    document.querySelectorAll(`.opt[data-q="${qi}"]`).forEach(b => {
      const o = +b.dataset.o;
      b.style.background = ""; b.style.borderColor = "";
      if (o === q.correct) b.classList.add("correct");
      else if (o === chosen) b.classList.add("wrong");
      else b.classList.add("dim");
    });
  });
  $("#submitBtn").outerHTML = `<div style="text-align:center;padding:10px;font-weight:800;font-size:18px">You got ${score} / ${a.quiz.length}! ${score === a.quiz.length ? "Perfect! 🌟" : "Great job! 🎉"}</div>
    <button class="btn btn-sun" style="width:100%" onclick="finishAdventure('${a.id}',${score},${a.quiz.length})">Finish Adventure & Collect Rewards 🎁</button>`;
};

window.finishAdventure = (id, score, total) => {
  const a = ADVENTURES.find(x => x.id === id);
  // auto-save any reflections typed
  saveReflections(id, true);
  completeAdventure(a, score, total);
};

window.saveReflections = (id, silent) => {
  const arr = [];
  document.querySelectorAll(`textarea[data-r]`).forEach(t => arr[+t.dataset.r] = t.value);
  S.reflections[id] = arr; save();
  if (!silent) {
    const btns = document.querySelectorAll(".reflect .btn");
    if (btns.length) { const b = btns[btns.length - 1]; const o = b.textContent; b.textContent = "Saved! ✓"; setTimeout(() => b.textContent = o, 1400); }
  }
};

/* ---------- passport ---------- */
function viewPassport() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🛂 Family Passport</h1>
      <p style="color:var(--ink-soft);margin:6px 0 20px">Collect a stamp for every adventure you complete. You have <b>${S.stamps.length} / ${ADVENTURES.length}</b>!</p>
      <div class="passport-grid">
        ${ADVENTURES.map(a => {
          const got = S.stamps.includes(a.id);
          return `<div class="stamp ${got ? "got" : ""}">
            <div class="em">${a.stamp.emoji}</div>
            <small>${got ? esc(a.stamp.name) : "Locked"}</small>
            ${got ? `<small style="color:var(--coral)">${esc(a.region)}</small>` : ""}
          </div>`;
        }).join("")}
      </div>
    </div>`;
}

/* ---------- badges ---------- */
function viewBadges() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🏅 Badge Collection</h1>
      <p style="color:var(--ink-soft);margin:6px 0 20px">${S.badges.length} of ${BADGES.length} badges earned. Keep exploring to unlock them all!</p>
      <div class="badge-grid">
        ${BADGES.map(b => {
          const got = S.badges.includes(b.id);
          return `<div class="card badge ${got ? "got" : ""}">
            <div class="ring">${b.emoji}</div>
            <h4>${esc(b.name)}</h4><p>${esc(b.desc)}</p>
            ${got ? `<div class="tag" style="margin:8px auto 0;background:color-mix(in srgb,var(--palm) 18%,transparent);color:var(--palm)">Earned ✓</div>` : ""}
          </div>`;
        }).join("")}
      </div>
    </div>`;
}

/* ---------- tree ---------- */
function viewTree() {
  const done = Object.keys(S.completed).length;
  const stages = ["🌱", "🌿", "🪴", "🌳", "🌳", "🌴"];
  const treeEmoji = stages[Math.min(done, stages.length - 1)];
  const total = ADVENTURES.length;
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🌳 Our Adventure Tree</h1>
      <p style="color:var(--ink-soft);margin:6px 0">Every adventure you finish helps our family tree grow!</p>
      <div class="card tree-wrap">
        <div class="tree">${treeEmoji}</div>
        <div class="tree-track">
          ${ADVENTURES.map((a, i) => `<div class="tree-step ${isDone(a.id) ? "on" : ""}" title="${esc(a.title)}"></div>`).join("")}
        </div>
        <h3>${done} of ${total} adventures grown</h3>
        <p style="color:var(--ink-soft);max-width:420px;margin:8px auto 0">
          ${done === 0 ? "Plant your first seed by finishing an adventure! 🌱"
            : done < total ? "Look how much you've grown together. Keep going! 🌿"
            : "Your tree is fully grown — a whole year of wonder! 🌴🎉"}
        </p>
        <button class="btn btn-ocean" style="margin-top:16px" onclick="go('map')">Grow it more 🗺️</button>
      </div>
    </div>`;
}

/* ---------- cookbook ---------- */
function viewCookbook() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🍳 Family Cookbook</h1>
      <p style="color:var(--ink-soft);margin:6px 0 20px">Filipino dishes we're learning to make together. Cook one, then add your family rating!</p>
      <div class="grid g-auto">
        ${COOKBOOK.map(r => `
          <div class="card" style="padding:20px">
            <div style="font-size:40px">${r.emoji}</div>
            <h3 style="margin-top:8px">${esc(r.name)}</h3>
            <div class="tag" style="margin:6px 0">${esc(r.tag)}</div>
            <p style="color:var(--ink-soft);font-size:14px">${esc(r.note)}</p>
          </div>`).join("")}
      </div>
      <div class="callout" style="margin-top:20px">👩‍🍳 <b>Tip:</b> Complete the "Kitchen Adventure" on the map to cook Champorado step by step!</div>
    </div>`;
}

/* ---------- family ---------- */
function viewFamily() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">👨‍👩‍👧‍👦 Our Family</h1>
      <p style="color:var(--ink-soft);margin:6px 0 20px">The wonderful explorers on this journey. Edit names & avatars in Settings.</p>
      <div class="grid g-auto">
        ${S.family.map(f => `
          <div class="card fam-card">
            <div class="av" style="background:${esc(f.color)}">${esc(f.emoji)}</div>
            <h3>${esc(f.name)}</h3><div class="role">${esc(f.role)}</div>
          </div>`).join("")}
      </div>
      <div class="card" style="padding:22px;margin-top:20px;text-align:center">
        <div style="font-size:40px">⭐</div>
        <h3 style="margin:8px 0">Team XP: ${S.xp}</h3>
        <p style="color:var(--ink-soft)">Every adventure is earned <b>together</b>. You're a wonderful team!</p>
      </div>
    </div>`;
}

/* ---------- settings ---------- */
function viewSettings() {
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">⚙️ Settings</h1>
      <div class="card" style="padding:22px;margin-top:16px">
        <h3 style="margin-bottom:6px">👨‍👩‍👧‍👦 Family Members</h3>
        <p style="color:var(--ink-soft);font-size:14px;margin-bottom:10px">Add each child and grown-up. Pick any emoji as an avatar.</p>
        <div id="famList">
          ${S.family.map((f, i) => `
            <div class="fam-editor">
              <input value="${esc(f.emoji)}" maxlength="2" style="width:56px;text-align:center;font-size:20px" data-f="${i}" data-k="emoji" />
              <input value="${esc(f.name)}" placeholder="Name" data-f="${i}" data-k="name" />
              <input value="${esc(f.role)}" placeholder="Role" data-f="${i}" data-k="role" style="max-width:120px" />
              <button class="del" onclick="removeFamily(${i})" title="Remove">✕</button>
            </div>`).join("")}
        </div>
        <button class="btn btn-ghost" onclick="addFamily()">➕ Add Member</button>
        <button class="btn btn-ocean" style="margin-left:8px" onclick="saveFamily()">💾 Save Family</button>
      </div>

      <div class="card" style="padding:22px;margin-top:16px">
        <h3 style="margin-bottom:6px">🙏 Faith Content</h3>
        <div class="toggle-row">
          <div class="t-txt"><b>Include Bible stories & Christian character</b><small>Turn off to hide all faith-based lessons (for other families).</small></div>
          <div class="sw ${S.faith ? "on" : ""}" onclick="toggleFaith(this)"></div>
        </div>
      </div>

      <div class="card" style="padding:22px;margin-top:16px">
        <h3 style="margin-bottom:10px">📦 Backup & Reset</h3>
        <button class="btn btn-ghost" onclick="exportData()">⬇️ Export Progress (JSON)</button>
        <label class="btn btn-ghost" style="margin-left:8px">⬆️ Import<input type="file" accept="application/json" style="display:none" onchange="importData(event)"></label>
        <button class="btn btn-ghost" style="margin-left:8px;color:var(--coral)" onclick="resetAll()">🗑️ Reset All Progress</button>
      </div>

      <p style="text-align:center;color:var(--ink-soft);font-size:13px;margin-top:24px">Wonder Journey OS · World 1 · Built for the Ferrell Family 🇵🇭</p>
    </div>`;
}

window.addFamily = () => { S.family.push({ name: "New Explorer", role: "Explorer", emoji: "🙂", color: pickColor() }); save(); viewSettings(); };
window.removeFamily = (i) => { S.family.splice(i, 1); save(); viewSettings(); };
window.saveFamily = () => {
  document.querySelectorAll("#famList .fam-editor").forEach((row, i) => {
    row.querySelectorAll("input").forEach(inp => { if (S.family[i]) S.family[i][inp.dataset.k] = inp.value || S.family[i][inp.dataset.k]; });
  });
  save(); renderTop();
  const b = event.target; const o = b.textContent; b.textContent = "Saved! ✓"; setTimeout(() => b.textContent = o, 1400);
};
function pickColor() { const c = ["#0e7c86", "#e5674f", "#3f9d54", "#7a5cc4", "#f4a821", "#12a3af"]; return c[Math.floor(Math.random() * c.length)]; }

window.toggleFaith = (sw) => { S.faith = !S.faith; sw.classList.toggle("on", S.faith); save(); };

window.exportData = () => {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = "wonder-journey-progress.json"; a.click(); URL.revokeObjectURL(url);
};
window.importData = (e) => {
  const file = e.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = () => { try { S = Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(r.result)); save(); applyTheme(); renderTop(); go("home"); alert("Progress imported! 🎉"); } catch { alert("Sorry, that file could not be read."); } };
  r.readAsText(file);
};
window.resetAll = () => {
  if (confirm("Reset ALL progress, badges, and stamps? This cannot be undone.")) {
    const fam = S.family, faith = S.faith, theme = S.theme;
    S = structuredClone(DEFAULT_STATE); S.family = fam; S.faith = faith; S.theme = theme;
    save(); renderTop(); go("home");
  }
};

/* ---------- full screen (classroom present mode) ---------- */
const fsBtn = $("#fsBtn");
fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || (() => {})).call(document.documentElement);
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen || (() => {})).call(document);
  }
});
document.addEventListener("fullscreenchange", () => {
  fsBtn.textContent = document.fullscreenElement ? "🡿" : "⛶";
  fsBtn.title = document.fullscreenElement ? "Exit full screen" : "Full screen (present in classroom)";
});

/* ---------- theme ---------- */
function applyTheme() { document.body.classList.toggle("dark", S.theme === "dark"); }
$("#themeBtn").addEventListener("click", () => { S.theme = S.theme === "dark" ? "light" : "dark"; save(); applyTheme(); renderTop(); });

/* ---------- router ---------- */
const VIEWS = { home: viewHome, map: viewMap, passport: viewPassport, badges: viewBadges, tree: viewTree, cookbook: viewCookbook, family: viewFamily, settings: viewSettings };
function go(view) {
  (VIEWS[view] || viewHome)();
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  closeNav();
  window.scrollTo(0, 0);
}
window.go = go;
window.openAdventure = openAdventure;

document.querySelectorAll(".nav-item").forEach(n => n.addEventListener("click", () => go(n.dataset.view)));

/* mobile nav */
const sidebar = $("#sidebar"), backdrop = $("#backdrop");
function closeNav() { sidebar.classList.remove("open"); backdrop.classList.remove("show"); }
$("#menuBtn").addEventListener("click", () => { sidebar.classList.add("open"); backdrop.classList.add("show"); });
backdrop.addEventListener("click", closeNav);

/* ---------- boot ---------- */
applyTheme();
renderTop();
go("home");
