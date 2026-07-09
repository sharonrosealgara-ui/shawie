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
  blessings: {},          // { "YYYY-MM-DD": { gratitude:[{id,name,text}], prayed:bool } }
  birthdayShown: {},      // { "YYYY-MM-DD": [names already celebrated today] }
  milestonesShown: {},    // { "3": true } milestones already celebrated with a pop-up
  family: [
    { name: "Shaun", role: "Dad", emoji: "👨", color: "#0e7c86" },
    { name: "Taylor", role: "Mom", emoji: "👩", color: "#e5674f" },
    { name: "Grandma", role: "Grandma", emoji: "👵", color: "#7a5cc4" },
    { name: "Rylee", role: "Trailblazer", emoji: "🧒", color: "#3f9d54", level: "trailblazer" },
    { name: "Ezra", role: "Adventurer", emoji: "🧒", color: "#f4a821", level: "adventurer" },
    { name: "Asa", role: "Adventurer", emoji: "🧒", color: "#12a3af", level: "adventurer" },
    { name: "Selah", role: "Explorer", emoji: "🧒", color: "#bd6980", level: "explorer" },
  ],
  faith: true,            // show Bible / faith content
  theme: "light",
  prayerLeaderIndex: 0,   // whose turn to lead prayer (index into family)
  teacherMode: false,     // teacher extras (lesson timer + answer key); family view stays clean
  mascot: true,           // show Sinag the mascot guide in cinematic mode
};

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const s = Object.assign(structuredClone(DEFAULT_STATE), JSON.parse(raw));
    // One-time safe upgrade: replace the old placeholder roster with the real family.
    if (Array.isArray(s.family) && s.family.some(f => f.name === "Kiddo")) {
      s.family = structuredClone(DEFAULT_STATE.family);
    }
    // Backfill known children's learning levels if a saved roster predates them.
    const KID_LEVELS = { Rylee: "trailblazer", Ezra: "adventurer", Asa: "adventurer", Selah: "explorer" };
    if (Array.isArray(s.family)) s.family.forEach(f => { if (!f.level && KID_LEVELS[f.name]) f.level = KID_LEVELS[f.name]; });
    return s;
  } catch (e) { return structuredClone(DEFAULT_STATE); }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

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

function awardCompletion(adv, score, total) {
  const firstTime = !isDone(adv.id);
  const newly = [];
  let gained = 0;
  if (firstTime) {
    gained = adv.xp + score * 10;
    S.completed[adv.id] = { score, total, date: new Date().toISOString().slice(0, 10) };
    if (!S.stamps.includes(adv.id)) S.stamps.push(adv.id);
    const b = awardBadge(adv.badge); if (b) newly.push(b);
  } else {
    const prev = S.completed[adv.id];
    if (score > prev.score) prev.score = score;
    gained = score * 4;
  }
  if (score === total) { const qs = awardBadge("quiz-star"); if (qs) newly.push(qs); }
  S.xp += gained;
  checkAutoBadges(newly);
  save(); renderTop();
  return { gained, newly, firstTime };
}
/* Family milestone thresholds — celebrated once with a confetti pop-up. */
const MILESTONES = [
  { need: 1, emoji: "👣", title: "First Adventure!", line: "You've begun your Wonder Journey together." },
  { need: 3, emoji: "⚡", title: "3 Adventures!", line: "You're on a roll — look at you go!" },
  { need: 7, emoji: "🚀", title: "7 Adventures!", line: "A whole week of wonder. Blast off!" },
  { need: 12, emoji: "🌸", title: "12 Adventures!", line: "Two units explored — beautiful work, team." },
  { need: 24, emoji: "🏝️", title: "24 Adventures!", line: "A third of the journey — amazing!" },
  { need: 36, emoji: "⛰️", title: "Halfway There!", line: "Halfway across the Philippines together." },
  { need: 72, emoji: "🏆", title: "World 1 Champions!", line: "You explored the whole Philippines. Incredible!" },
];
function pendingMilestone() {
  const done = Object.keys(S.completed).length;
  return MILESTONES.find(m => done >= m.need && !(S.milestonesShown && S.milestonesShown[m.need]));
}
function checkMilestones() {
  const m = pendingMilestone();
  if (!m) return;
  if (!S.milestonesShown) S.milestonesShown = {};
  S.milestonesShown[m.need] = true;
  save();
  const canCert = m.need >= 3;
  $("#modalBox").innerHTML = `
    <div class="burst">${m.emoji}</div>
    <h2>${esc(m.title)}</h2>
    <p style="font-size:16px">${esc(m.line)}</p>
    <div class="reward-row"><div class="reward">🎯 ${Object.keys(S.completed).length} adventures</div><div class="reward">⭐ ${S.xp} XP</div></div>
    ${canCert ? `<button class="btn btn-primary" style="width:100%;margin-top:14px" onclick="closeModal();openCertificate('milestone',${m.need})">🎖️ Get your certificate</button>` : ""}
    <button class="btn btn-ghost" style="width:100%;margin-top:8px" onclick="closeModal()">Hooray! 🎉</button>`;
  confettiBurst();
  $("#modalBg").classList.add("show");
}
function completeAdventure(adv, score, total) {
  const r = awardCompletion(adv, score, total);
  celebrate(adv, score, total, r.gained, r.newly, r.firstTime);
}

/* ---------- certificates (printable) ---------- */
function familyExplorers() {
  const kids = S.family.filter(f => f.level).map(f => f.name);
  return kids.length ? kids : S.family.map(f => f.name);
}
function openCertificate(type, arg) {
  const done = Object.keys(S.completed).length;
  let heading, sub;
  if (type === "world" || (type === "milestone" && Number(arg) >= 72)) { heading = "World 1 Champions"; sub = "for exploring the entire Philippines — all 72 adventures"; }
  else if (type === "milestone") { const m = MILESTONES.find(x => x.need == arg) || {}; heading = m.title ? m.title.replace(/!$/, "") : `${arg} Adventures`; sub = `for completing ${arg} wonderful adventures together`; }
  else { heading = "Adventure Journey"; sub = `for completing ${done} adventure${done !== 1 ? "s" : ""} on the Wonder Journey`; }
  const names = familyExplorers().join("  ·  ");
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  let ov = document.getElementById("certOverlay");
  if (!ov) { ov = document.createElement("div"); ov.id = "certOverlay"; document.body.appendChild(ov); }
  ov.innerHTML = `
    <div class="cert-actions no-print">
      <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save PDF</button>
      <button class="btn btn-ghost" onclick="closeCertificate()">Close</button>
    </div>
    <div class="cert" id="certPrint">
      <div class="cert-inner">
        <div class="cert-seal">🌏</div>
        <div class="cert-kicker">Wonder Journey OS · World 1 — The Philippines</div>
        <h1 class="cert-heading">Certificate of ${esc(heading)}</h1>
        <p class="cert-present">This certificate is joyfully presented to</p>
        <p class="cert-names">${esc(names)}</p>
        <p class="cert-sub">${esc(sub)}</p>
        <div class="cert-stats">
          <span>🎯 ${done} adventures</span><span>⭐ ${S.xp} XP</span><span>🏅 ${S.badges.length} badges</span><span>🛂 ${S.stamps.length} stamps</span>
        </div>
        <div class="cert-foot">
          <div class="cert-sign"><span>${esc(today)}</span><small>Date</small></div>
          <div class="cert-ribbon">🎖️</div>
          <div class="cert-sign"><span style="font-family:'Baloo 2',cursive">Wonder Journey</span><small>Family Learning OS</small></div>
        </div>
      </div>
    </div>`;
  ov.classList.add("show");
  document.body.classList.add("cert-open");
}
function closeCertificate() { const ov = document.getElementById("certOverlay"); if (ov) ov.classList.remove("show"); document.body.classList.remove("cert-open"); }
window.openCertificate = openCertificate;
window.closeCertificate = closeCertificate;

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

      ${(() => {
        const ub = upcomingBirthdays();
        const label = (d) => d === 0 ? "🎉 Today!" : d === 1 ? "Tomorrow" : `in ${d} days`;
        if (!ub.length) {
          // Always show the section so the family can find & set up birthdays.
          return `
          <div class="section-title"><span class="em">🎂</span> Celebrations &amp; Birthdays</div>
          <div class="card empty" style="text-align:center">
            <div class="em">🎂</div>
            <p>Add each explorer's birthday and Wonder Journey will celebrate them with confetti and a warm birthday surprise on their special day.</p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px">
              <button class="btn btn-primary" onclick="go('settings')">🎂 Add Birthdays</button>
              <button class="btn btn-ghost" onclick="previewBirthday()">✨ Preview a Celebration</button>
            </div>
          </div>`;
        }
        const soon = ub.slice(0, 3);
        return `
        <div class="section-title"><span class="em">🎂</span> Celebrations &amp; Birthdays</div>
        <div class="grid g-auto">
          ${soon.map(u => `<div class="card stat" style="padding:16px"><span class="em">${u.emoji}</span><span class="lbl">${esc(u.name)}</span><span class="val" style="font-size:18px">${label(u.days)}</span><p style="color:var(--ink-soft);font-size:12px;margin-top:2px">${u.next.toLocaleDateString(undefined, { month: "long", day: "numeric" })}</p></div>`).join("")}
        </div>
        <div style="text-align:center;margin-top:10px"><button class="btn btn-ghost" onclick="go('settings')">🎂 Manage birthdays</button></div>`;
      })()}

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

function differentiationSection(a) {
  const m = (typeof LEVEL_MISSIONS !== "undefined") ? LEVEL_MISSIONS[a.id] : null;
  if (!m) return "";
  return `
    <div class="section-title"><span class="em">🎯</span> Missions for Every Explorer</div>
    <p style="color:var(--ink-soft);font-size:14px;margin:-6px 0 12px">One adventure, three levels — each child does the tasks that fit them best. Big kids, help the little ones! 🤝</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">
      ${LEVEL_TIERS.map(t => {
        const kids = S.family.filter(f => f.level === t.key);
        return `
        <div class="card" style="padding:18px;border-top:4px solid ${t.color}">
          <div style="display:flex;align-items:center;gap:9px">
            <span style="font-size:24px">${t.emoji}</span>
            <div><b style="font-family:'Baloo 2',sans-serif;font-size:16px">${t.name}</b>
            <div style="font-size:11px;color:var(--ink-soft);font-weight:800;text-transform:uppercase;letter-spacing:.03em">${t.age}</div></div>
          </div>
          ${kids.length ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${kids.map(k => `<span class="tag" style="background:color-mix(in srgb,${t.color} 18%,transparent);color:var(--ink)">${esc(k.emoji)} ${esc(k.name)}</span>`).join("")}</div>` : ""}
          <ul style="margin:12px 0 0;padding-left:18px;font-size:14px;display:flex;flex-direction:column;gap:7px">
            ${m[t.key].map(x => `<li>${esc(x)}</li>`).join("")}
          </ul>
        </div>`;
      }).join("")}
    </div>`;
}

function openAdventure(id) {
  const a = ADVENTURES.find(x => x.id === id);
  const idx = ADVENTURES.findIndex(x => x.id === id);
  if (!isUnlocked(idx)) return;
  stopTimer(); lessonSeconds = 0; // fresh lesson timer
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
      <div style="margin:14px 0">
        <button class="btn btn-primary" style="font-size:16px" onclick="openCinema('${a.id}')">🎬 Present as Story — Cinematic Mode</button>
      </div>
      ${teacherToolbar()}

      <div class="section-title"><span class="em">📚</span> Let's Learn Together</div>
      ${sections.map((s, i) => `
        <div class="subj ${i === 0 ? "open" : ""}">
          <div class="subj-head" onclick="this.parentElement.classList.toggle('open')">
            <span class="em">${s.icon}</span><h3>${esc(s.subject)}</h3><span class="chev">›</span>
          </div>
          <div class="subj-body">${s.html}</div>
        </div>`).join("")}

      ${differentiationSection(a)}

      <div class="section-title"><span class="em">🏆</span> Adventure Quiz</div>
      ${S.teacherMode ? `<div class="card no-print" style="padding:12px 16px;margin-bottom:12px;font-size:13px;border:1px dashed color-mix(in srgb,var(--grape) 40%,transparent)"><b>🔑 Answer key (teacher only):</b> ${a.quiz.map((q, i) => `Q${i + 1} → ${esc(q.a[q.correct])}`).join(" · ")}</div>` : ""}
      <div class="card quiz" id="quizCard">${renderQuiz(a)}</div>

      <div class="section-title"><span class="em">📝</span> Family Reflection</div>
      <div class="card quiz reflect">
        ${a.reflect.map((q, i) => `
          <div class="q"><div class="qt">${esc(q)}</div>
          <textarea data-r="${i}" placeholder="Write or draw your answer together...">${esc((S.reflections[a.id] || [])[i] || "")}</textarea></div>`).join("")}
        <button class="btn btn-ghost" onclick="saveReflections('${a.id}')">💾 Save Our Answers</button>
      </div>
    </div>`;
  if (S.teacherMode) { updateTimerLabel(); updateTimerBtn(); }
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

/* ---------- morning blessings ---------- */
const GRATITUDE_PROMPTS = [
  "What is one thing you're thankful for today?",
  "Who made you smile recently?",
  "What is something beautiful you saw?",
  "What is a gift in our family you're grateful for?",
  "What good thing happened yesterday?",
  "What is something you're excited about today?",
  "Who can you thank today?",
];
const PRAYER_PROMPTS = [
  "Thank You, God, for our family and this brand-new day. 🙏",
  "Lord, help us learn, be kind, and love each other today.",
  "Thank You for our home, our food, and time together.",
  "God, give us joyful hearts and gentle words today.",
  "Thank You for the world You made — let us explore it with wonder.",
  "Lord, watch over each of us today and fill us with kindness.",
  "Thank You for second chances and for Your love that never ends.",
];
const todayKey = () => new Date().toISOString().slice(0, 10);
const prettyToday = () => new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
const dayIndex = () => Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000);

function viewBlessings() {
  const key = todayKey();
  const today = S.blessings[key] || { gratitude: [], prayed: false };
  const gPrompt = GRATITUDE_PROMPTS[dayIndex() % GRATITUDE_PROMPTS.length];
  const pPrompt = PRAYER_PROMPTS[dayIndex() % PRAYER_PROMPTS.length];
  const mornings = Object.keys(S.blessings).filter(k => (S.blessings[k].gratitude || []).length || S.blessings[k].prayed).length;
  const opts = ["Whole Family", ...S.family.map(f => f.name)];
  const leader = S.family.length ? S.family[S.prayerLeaderIndex % S.family.length] : null;

  root().innerHTML = `
    <div class="view">
      <div class="hero" style="padding:26px">
        <h1>🌅 Good Morning, Explorers!</h1>
        <p>${prettyToday()} — let's begin today with grateful hearts before our adventure.</p>
      </div>

      <div class="section-title"><span class="em">💛</span> Today's Gratitude</div>
      <div class="card" style="padding:22px">
        <p style="font-weight:800;margin-bottom:12px">${esc(gPrompt)}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <select id="gName" class="fld" style="max-width:170px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit">
            ${opts.map(o => `<option>${esc(o)}</option>`).join("")}
          </select>
          <input id="gText" placeholder="I'm thankful for..." style="flex:1;min-width:180px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit"
            onkeydown="if(event.key==='Enter')addGratitude()"/>
          <button class="btn btn-sun" onclick="addGratitude()">Add 💛</button>
        </div>
        <div style="margin-top:16px;display:flex;flex-direction:column;gap:10px">
          ${today.gratitude.length ? today.gratitude.map(g => `
            <div class="callout" style="display:flex;align-items:center;gap:10px;margin:0">
              <span class="tag" style="background:color-mix(in srgb,var(--sun) 22%,transparent);color:var(--ink)">${esc(g.name)}</span>
              <span style="flex:1">${esc(g.text)}</span>
              <button class="del" style="color:var(--coral);font-size:18px;background:none;border:none;cursor:pointer" onclick="removeGratitude('${g.id}')" title="Remove">✕</button>
            </div>`).join("")
          : `<p style="color:var(--ink-soft)">No gratitude added yet today — go first! 🌟</p>`}
        </div>
      </div>

      ${S.faith ? `
      <div class="section-title"><span class="em">🙏</span> Morning Prayer</div>
      <div class="card" style="padding:22px">
        ${leader ? `
        <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:16px;background:color-mix(in srgb,var(--grape) 12%,transparent);border:1px solid color-mix(in srgb,var(--grape) 30%,transparent);margin-bottom:14px">
          <div class="av" style="width:52px;height:52px;border-radius:50%;display:grid;place-items:center;font-size:26px;color:#fff;background:${esc(leader.color)};flex-shrink:0">${esc(leader.emoji)}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft)">Today's Prayer Leader</div>
            <div style="font-size:20px;font-weight:800;font-family:'Baloo 2',sans-serif">${esc(leader.name)} 🙏</div>
          </div>
          <button class="btn btn-ghost" onclick="nextPrayerLeader()">Pass to next →</button>
        </div>` : ""}
        <div class="callout faith" style="font-size:16px;margin:0 0 14px">${esc(pPrompt)}</div>
        <div class="toggle-row" style="margin:0">
          <div class="t-txt"><b>We prayed together today</b><small>Check this after your family prayer time.</small></div>
          <div class="sw ${today.prayed ? "on" : ""}" onclick="togglePrayed()"></div>
        </div>
      </div>` : ""}

      <div class="section-title"><span class="em">🌱</span> Our Gratitude Garden</div>
      <div class="card stat" style="padding:20px">
        <span class="lbl">Mornings recorded together</span>
        <span class="val">${mornings} ${mornings === 1 ? "day" : "days"} 🌻</span>
        <p style="color:var(--ink-soft);font-size:13px;margin-top:6px">Every grateful morning plants a flower in your family's garden.</p>
      </div>

      <div style="margin-top:18px">
        <button class="btn btn-primary" onclick="go('map')">Now, on to today's Adventure! 🗺️</button>
      </div>
    </div>`;
}

function ensureToday() {
  const key = todayKey();
  if (!S.blessings[key]) S.blessings[key] = { gratitude: [], prayed: false };
  return S.blessings[key];
}
window.addGratitude = () => {
  const name = $("#gName").value, text = $("#gText").value.trim();
  if (!text) { $("#gText").focus(); return; }
  ensureToday().gratitude.push({ id: uid(), name, text });
  save(); viewBlessings();
};
window.removeGratitude = (id) => {
  const t = ensureToday(); t.gratitude = t.gratitude.filter(g => g.id !== id); save(); viewBlessings();
};
window.togglePrayed = () => { const t = ensureToday(); t.prayed = !t.prayed; save(); viewBlessings(); };
window.nextPrayerLeader = () => { if (S.family.length) { S.prayerLeaderIndex = (S.prayerLeaderIndex + 1) % S.family.length; save(); viewBlessings(); } };

/* ---------- birthdays ---------- */
function upcomingBirthdays() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return S.family
    .filter(f => f.birthday && f.birthday.length >= 10)
    .map(f => {
      const [mo, da] = f.birthday.slice(5).split("-").map(Number);
      let next = new Date(today.getFullYear(), mo - 1, da);
      if (next < today) next = new Date(today.getFullYear() + 1, mo - 1, da);
      return { name: f.name, emoji: f.emoji, days: Math.round((next - today) / 86400000), next };
    })
    .sort((a, b) => a.days - b.days);
}
function birthdayModal(names) {
  confettiBurst();
  $("#modalBox").innerHTML = `
    <div class="burst">🎂</div>
    <h2>Happy Birthday!</h2>
    <p style="font-size:22px;font-weight:800;font-family:'Baloo 2',sans-serif;color:var(--coral)">${names.map(esc).join(" & ")} 🎉</p>
    <p>The whole family is celebrating you today. We're so grateful for you! 💛</p>
    <button class="btn btn-primary" style="width:100%;margin-top:14px" onclick="closeModal()">Hooray! 🥳</button>`;
  $("#modalBg").classList.add("show");
}
function previewBirthday() {
  // Let the family see the birthday celebration even before any date is set.
  const kids = S.family.filter(f => f.level).map(f => f.name);
  birthdayModal(kids.length ? [kids[0]] : ["Explorer"]);
}
window.previewBirthday = previewBirthday;
function checkBirthdays() {
  const key = todayKey(), md = key.slice(5);
  const shown = (S.birthdayShown && S.birthdayShown[key]) || [];
  const names = S.family.filter(f => f.birthday && f.birthday.length >= 10 && f.birthday.slice(5) === md && !shown.includes(f.name)).map(f => f.name);
  if (names.length) {
    if (!S.birthdayShown) S.birthdayShown = {};
    S.birthdayShown[key] = [...shown, ...names];
    save();
    setTimeout(() => birthdayModal(names), 500);
  }
}

/* ============================================================
   CINEMATIC PRESENTATION MODE — the Adventure Theater.
   Plays an adventure as animated scenes with transitions and
   optional synthesized sound. Additive: the scroll view remains
   the teacher/reading view; this is the immersive family view.
   ============================================================ */
let cine = null;
const cineEl = () => document.getElementById("cinema");

/* --- sound (Web Audio, synthesized — CSP-safe, no external files) --- */
let actx = null;
function ac() { if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return actx; }
function tone(freq, dur = 0.15, type = "sine", vol = 0.15, when = 0) {
  if (cine && cine.muted) return;
  const a = ac(); if (!a) return;
  const t = a.currentTime + when;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq; o.connect(g); g.connect(a.destination);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t); o.stop(t + dur + 0.02);
}
const sfxClick = () => tone(320, 0.08, "triangle", 0.12);
const sfxWhoosh = () => { tone(600, 0.18, "sine", 0.08); tone(300, 0.22, "sine", 0.06, 0.03); };
const sfxCorrect = () => { tone(523, 0.12, "sine", 0.14); tone(784, 0.16, "sine", 0.14, 0.1); };
const sfxWrong = () => tone(180, 0.22, "sine", 0.12);
const sfxStamp = () => tone(120, 0.14, "square", 0.16);
const sfxCelebrate = () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.2, "triangle", 0.13, i * 0.11));

const ISLES = {
  luzon: { emoji: "🏙️", name: "Luzon", blurb: "The largest island group, in the north.", animals: "Philippine eagle, carabao", food: "Champorado, longganisa", culture: "Home of Manila & the Banaue Rice Terraces", lang: "Tagalog, Ilocano", cities: "Manila, Baguio, Vigan" },
  visayas: { emoji: "🏝️", name: "Visayas", blurb: "The central islands, famous for beaches.", animals: "Tarsier, whale shark", food: "Sweet mangoes, lechon", culture: "Sinulog & Ati-Atihan festivals; Chocolate Hills", lang: "Hiligaynon, Cebuano", cities: "Cebu, Iloilo, Tacloban" },
  mindanao: { emoji: "🌋", name: "Mindanao", blurb: "The southern island group — the fruit basket of the Philippines.", animals: "Philippine eagle, clownfish", food: "Durian, pomelo", culture: "Mount Apo (tallest peak); kulintang music", lang: "Cebuano & many languages", cities: "Davao, Cagayan de Oro, Zamboanga" },
};
window.isleFact = (k) => {
  const d = ISLES[k]; sfxClick();
  const box = document.getElementById("isleInfo"); if (!box) return;
  box.style.display = "block";
  box.innerHTML = `<h2>${d.emoji} ${d.name}</h2><p>${esc(d.blurb)}</p>
    <ul style="margin:8px 0 0 18px">
      <li>🐾 <b>Animals:</b> ${esc(d.animals)}</li>
      <li>🍽️ <b>Food:</b> ${esc(d.food)}</li>
      <li>🎉 <b>Culture:</b> ${esc(d.culture)}</li>
      <li>🗣️ <b>Language:</b> ${esc(d.lang)}</li>
      <li>🏙️ <b>Cities:</b> ${esc(d.cities)}</li>
    </ul>`;
};
window.launchGoogleEarth = () => { sfxClick(); alert("🌍 A live Google Earth flyover is coming soon! For now, explore with our animated map. (Architecture is ready for the future integration.)"); };

/* ---- Presentation Design Engine: per-adventure themes, one identity ---- */
const THEMES = {
  island:   { id: "island",   name: "Island Adventure",       sky: "linear-gradient(180deg,#7ec9ef,#a6ddf5 40%,#cfeaf7 58%,#eaf6df 63%,#f3e7c9 76%,#e6d0a2 100%)", palm: true,  water: true,  decor: ["☁️","🕊️","⛵","✨","🌺"] },
  geography:{ id: "geography", name: "Geography Explorer",     sky: "linear-gradient(180deg,#7ec9ef,#a6ddf5 40%,#cfeaf7 58%,#eaf6df 63%,#f3e7c9 76%,#e6d0a2 100%)", palm: true,  water: true,  decor: ["☁️","🕊️","🧭","✨"] },
  ocean:    { id: "ocean",     name: "Ocean Explorer",         sky: "linear-gradient(180deg,#5bc0ea,#2f9fd6 45%,#1f7fb8 100%)", palm: false, water: true,  decor: ["🐠","🐟","🫧","🐚","✨","🐢"] },
  volcano:  { id: "volcano",   name: "Volcano Expedition",     sky: "linear-gradient(180deg,#ffc98a,#f0965c 45%,#8a5140 100%)", palm: false, water: false, ground: "rgba(90,45,35,.55)", decor: ["🌋","💨","🦅","☁️","✨"] },
  terraces: { id: "terraces",  name: "Rice Terrace Journey",   sky: "linear-gradient(180deg,#ffdf94,#ffe9ac 42%,#d3ea8c 66%,#a2cf6b 100%)", palm: false, water: false, ground: "rgba(90,130,50,.5)", decor: ["🌾","🌅","🦋","💧","✨"] },
  cooking:  { id: "cooking",   name: "Cooking Studio",         sky: "linear-gradient(180deg,#f8dcb4,#f0c58c 45%,#c78f58 100%)", palm: false, water: false, ground: "rgba(140,90,50,.5)", decor: ["🍳","♨️","🥄","🥭","✨"] },
  wildlife: { id: "wildlife",  name: "Wildlife Adventure",     sky: "linear-gradient(180deg,#bfe8a8,#98d886 45%,#5faf5c 100%)", palm: true,  water: false, ground: "rgba(50,110,45,.5)", decor: ["🦋","🐦","🍃","🐒","✨"] },
  festival: { id: "festival",  name: "Festival Celebration",   sky: "linear-gradient(180deg,#ffd873,#ff9fb0 50%,#c86fb0 100%)", palm: false, water: false, ground: "rgba(150,50,110,.4)", decor: ["🎉","🎊","🏮","🎵","✨"] },
  history:  { id: "history",   name: "Historical Philippines", sky: "linear-gradient(180deg,#ecdcb2,#dcc593 50%,#bb9c66 100%)", palm: false, water: false, ground: "rgba(130,100,60,.5)", decor: ["🏛️","📜","🕊️","⭐","✨"] },
  village:  { id: "village",   name: "Village & Values",       sky: "linear-gradient(180deg,#bfe3f0,#dcecc4 55%,#ecd9b0 100%)", palm: true,  water: true,  decor: ["🏡","🌾","🕊️","☁️","✨"] },
  bible:    { id: "bible",     name: "Bible Lands",            sky: "linear-gradient(180deg,#f4e4b4,#e7d097 50%,#caa96b 100%)", palm: false, water: false, ground: "rgba(150,120,70,.45)", decor: ["🕊️","🫒","⭐","✨","🐑"] },
};
const THEME_BY_ID = { a1: "geography", a2: "island", a3: "cooking", a4: "village", a5: "festival", a6: "volcano", a7: "wildlife", a8: "terraces", a9: "ocean", a10: "history" };
function themeFor(a) {
  if (a.theme && THEMES[a.theme]) return THEMES[a.theme];
  if (THEME_BY_ID[a.id] && THEMES[THEME_BY_ID[a.id]]) return THEMES[THEME_BY_ID[a.id]];
  const t = `${a.title} ${a.region} ${a.value}`.toLowerCase();
  const has = (...w) => w.some(x => t.includes(x));
  let id = "island";
  if (has("volcano", "fire mountain")) id = "volcano";
  else if (has("ocean", "sea", "coral", "reef", "marine")) id = "ocean";
  else if (has("rice", "terrace", "farm", "harvest", "seed", "coconut", "garden")) id = "terraces";
  else if (has("cook", "food", "kitchen", "champorado", "feast", "recipe", "baking", "market", "fruit", "merienda")) id = "cooking";
  else if (has("festival", "fiesta", "celebration", "tradition", "music", "lantern")) id = "festival";
  else if (has("animal", "wildlife", "eagle", "tarsier", "forest", "rainforest")) id = "wildlife";
  else if (has("hero", "history", "rizal", "independence", "symbol", "timeline")) id = "history";
  else if (has("bible", "gathering", "gratitude")) id = "bible";
  else if (has("bayanihan", "family", "value", "hospitality", "kindness", "respect")) id = "village";
  else if (has("geography", "map", "island", "manila", "cebu", "region", "province")) id = "geography";
  return THEMES[id] || THEMES.island;
}
function decorHTML(theme) {
  const d = theme.decor || []; let h = "";
  for (let i = 0; i < 8; i++) {
    const e = d[i % d.length], left = (Math.random() * 96).toFixed(1), top = (6 + Math.random() * 72).toFixed(1),
      dur = (6 + Math.random() * 8).toFixed(1), size = (22 + Math.random() * 22).toFixed(0);
    h += `<div class="cine-decor" style="left:${left}%;top:${top}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:-${(Math.random() * dur).toFixed(1)}s">${e}</div>`;
  }
  return h;
}

/* ============================================================
   PERSONALIZATION ENGINE (Constitution §Personalization Engine)
   Every Adventure teaches the SAME topic, but each child gets an optional
   activity tuned to how THEY love to learn. Automatic for all 72 adventures:
   we read the adventure's theme (themeFor) and pick each child's on-theme
   activity, falling back to a topic-aware default for any new theme.
   ============================================================ */
const CHILD_PROFILES = [
  { name: "Rylee", icon: "🎨", tag: "Artist & animal-lover", color: "#3f9d54" },
  { name: "Ezra",  icon: "🔨", tag: "Builder & historian",   color: "#f4a821" },
  { name: "Asa",   icon: "⚙️", tag: "Engineer & explorer",   color: "#12a3af" },
  { name: "Selah", icon: "🏘️", tag: "Artist & mini-world maker", color: "#bd6980" },
];
const PERSONALIZE = {
  island: {
    Rylee: "Draw a map of your dream island and the animals that live on it.",
    Ezra:  "Build a 3-D island from cardboard — give it mountains and a harbor.",
    Asa:   "Float paper boats in water and test which island-hopping design sails best.",
    Selah: "Make a tiny island world in a tray: sand, blue-paper sea and mini boats.",
  },
  geography: {
    Rylee: "Draw and decorate your own map of the Philippines with colorful borders.",
    Ezra:  "Build the three island groups — Luzon, Visayas, Mindanao — from salt dough.",
    Asa:   "Make a working compass with a magnet and needle, then map your house.",
    Selah: "Create a miniature map-table with tiny landmarks you can move around.",
  },
  ocean: {
    Rylee: "Draw a coral reef bursting with your favorite sea creatures.",
    Ezra:  "Build an underwater diorama in a shoebox with layers of the sea.",
    Asa:   "Experiment with 'float or sink' using shells, toys and salty water.",
    Selah: "Make a mini aquarium in a jar with paper fish and blue water.",
  },
  volcano: {
    Rylee: "Draw the birds, eagles and plants that live around a volcano.",
    Ezra:  "Build a volcano model from clay or paper-mâché.",
    Asa:   "Engineer a baking-soda-and-vinegar eruption and time the 'lava'.",
    Selah: "Create a tiny volcano village with little houses, fields and animals.",
  },
  terraces: {
    Rylee: "Draw the rice terraces at sunrise with birds and butterflies.",
    Ezra:  "Build model rice terraces from stacked cardboard steps.",
    Asa:   "Plant a seed in a cup and measure how much it grows each day.",
    Selah: "Make a miniature farm with tiny rice fields and a carabao.",
  },
  cooking: {
    Rylee: "Draw and label the ingredients, then decorate the finished dish.",
    Ezra:  "Help measure and cook the recipe — you're the head chef today.",
    Asa:   "Turn cooking into science: watch what heat and mixing do to the food.",
    Selah: "Bake or plate a mini version and arrange it beautifully for the family.",
  },
  wildlife: {
    Rylee: "Draw or sew a soft version of today's animal.",
    Ezra:  "Build the animal's habitat as a small diorama.",
    Asa:   "Go outside, observe real animals or bugs, and record what they do.",
    Selah: "Make a miniature forest home for tiny animal figures.",
  },
  festival: {
    Rylee: "Design and craft a festival costume or headdress.",
    Ezra:  "Build a parade float or a simple instrument that really makes sound.",
    Asa:   "Engineer a moving decoration or a lantern that lights up.",
    Selah: "Create a miniature festival street with tiny lanterns and dancers.",
  },
  history: {
    Rylee: "Draw a portrait of today's hero and a banner of their words.",
    Ezra:  "Build a stand-up timeline with a card for each event.",
    Asa:   "Make a model of a landmark or invention from the story.",
    Selah: "Create a tiny museum scene about the hero or event.",
  },
  village: {
    Rylee: "Draw a picture that shows today's value in your own family.",
    Ezra:  "Build something useful for the home as an act of service.",
    Asa:   "Invent a 'helping machine' or plan a way to help a neighbor.",
    Selah: "Make a miniature home scene showing the family caring for each other.",
  },
  bible: {
    Rylee: "Draw a scene from today's Bible story.",
    Ezra:  "Build a model from the story — an ark, a tent, or a city wall.",
    Asa:   "Map the journey in the story and mark each place.",
    Selah: "Create a miniature Bible-lands scene with tiny figures.",
  },
};
const PERSONALIZE_DEFAULT = {
  Rylee: t => `Draw or make a craft about ${t}.`,
  Ezra:  t => `Build a model or diorama about ${t}.`,
  Asa:   t => `Design a hands-on experiment or build about ${t}.`,
  Selah: t => `Create a miniature scene about ${t}.`,
};
function personalActivities(a) {
  const th = themeFor(a).id;
  const topic = String(a.title || "today's adventure").replace(/^[^:]*:\s*/, "").toLowerCase();
  return CHILD_PROFILES.map(c => ({
    ...c,
    text: (PERSONALIZE[th] && PERSONALIZE[th][c.name]) || PERSONALIZE_DEFAULT[c.name](topic),
  }));
}

function buildScenes(a) {
  const secs = a.sections.filter(s => !(s.faith && !S.faith));
  const scenes = [{ type: "intro" }, { type: "map" }];
  // "Real Photos" gallery — only when this adventure has media in the manifest.
  const media = (typeof ADVENTURE_MEDIA !== "undefined" && ADVENTURE_MEDIA[a.id]) ? ADVENTURE_MEDIA[a.id] : [];
  if (media.length) scenes.push({ type: "gallery", ids: media });
  secs.forEach(s => scenes.push({ type: "learn", s }));
  if (typeof LEVEL_MISSIONS !== "undefined" && LEVEL_MISSIONS[a.id]) scenes.push({ type: "missions" });
  scenes.push({ type: "yourway" }); // Personalization Engine — optional per-child activities
  a.quiz.forEach((q, qi) => scenes.push({ type: "quiz", qi }));
  scenes.push({ type: "reflect" }, { type: "ending" });
  return scenes;
}

function sceneLabel(sc, i, n) {
  const names = { intro: "Welcome", map: "Travel Mode", gallery: "Real Photos", learn: "Discover", missions: "Missions", yourway: "Explore It Your Way", quiz: "Quiz", reflect: "Reflection", ending: "Adventure Complete" };
  return `${names[sc.type] || "Scene"} · ${i + 1} / ${n}`;
}

function cineAmbient() {
  let h = "";
  for (let i = 0; i < 4; i++) { const top = 5 + i * 12 + Math.random() * 6, w = 130 + Math.random() * 150, dur = 45 + Math.random() * 40; h += `<div class="cine-cloud" style="top:${top}%;width:${w}px;height:${w * 0.5}px;animation-duration:${dur}s;animation-delay:-${(Math.random() * dur).toFixed(1)}s"></div>`; }
  for (let i = 0; i < 12; i++) h += `<div class="cine-spark" style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 68).toFixed(1)}%;animation-delay:${(Math.random() * 3).toFixed(1)}s"></div>`;
  return h;
}

const MASCOT = { name: "Sinag", face: "🌞" };
function mascotLine(sc) {
  switch (sc.type) {
    case "intro": return { state: "wave", text: `Mabuhay! I'm ${MASCOT.name}, your sunny guide. Let's explore together! ☀️` };
    case "map": return { state: "point", text: "Tap each island group to discover its animals, food and culture!" };
    case "gallery": return { state: "point", text: "These are real photos and maps — let's look closely! 📸" };
    case "yourway": return { state: "wave", text: "Everyone learns the same adventure — your own way! Pick your activity. 🌟" };
    case "learn": { const tips = ["Ooh, great listening!", "You're learning so much!", "Let's discover this together!", "Wonderful — keep going!"]; return { state: "idle", text: tips[Math.floor(Math.random() * tips.length)] }; }
    case "missions": return { state: "idle", text: "Everyone has a mission — pick the one that's just right for you!" };
    case "quiz": return { state: "idle", text: "You can do it! Take your time and think it through. 🤔" };
    case "reflect": return { state: "idle", text: "I love hearing your ideas — talk it over as a family! 💬" };
    case "ending": return { state: "cheer", text: "Hooray! What a wonderful adventure! I'm so proud of you! 🎉" };
    default: return { state: "idle", text: "Let's go!" };
  }
}
function mascotHTML(sc) {
  if (!S.mascot) return "";
  const m = mascotLine(sc);
  return `<div class="mascot"><div class="mascot-face ${m.state}">${MASCOT.face}</div><div class="mascot-bubble" id="mascotBubble">${esc(m.text)}</div></div>`;
}

/* RESILIENT IMAGE COMPONENT (see REAL_MEDIA_POLICY.md).
   Loads a local/licensed file only — never hotlinks. If the file is missing or
   blocked, it shows a warm placeholder built from the manifest's `fallback`
   text, never a broken image. Always renders alt, caption + credit, and a
   real-photo/illustration badge. In Teacher Mode it surfaces the manifest's
   `teacherGuidance` so the lesson keeps running while media is being sourced. */
function mediaFigure(id) {
  const m = (typeof MEDIA !== "undefined") ? MEDIA[id] : null;
  if (!m) return "";
  // Manifest stores fallback as "🌋 Mayon Volcano" — split emoji + label.
  const fbRaw = m.fallback || ("🖼️ " + (m.subject || "Photo"));
  const fbMatch = fbRaw.match(/^(\S+)\s+([\s\S]+)$/);
  const fbEmoji = fbMatch ? fbMatch[1] : "🖼️";
  const fbLabel = fbMatch ? fbMatch[2] : fbRaw;
  const isMap = m.category && m.category.indexOf("map") > -1;
  const badge = m.real === false
    ? `<span class="wj-fig-badge illus">illustration</span>`
    : `<span class="wj-fig-badge real">real ${isMap ? "map" : "photo"}</span>`;
  const credit = m.credit
    ? ` <span class="credit">— ${esc(m.credit)}${m.license ? " · " + esc(m.license) : ""}</span>`
    : (m.status !== "ready" ? ` <span class="credit pending">— real, licensed ${isMap ? "map" : "photo"} coming</span>` : "");
  const cap = m.caption ? `<figcaption>${esc(m.caption)}${credit}</figcaption>` : "";
  const guide = m.teacherGuidance
    || ("Add a licensed image at " + (m.file || "") + " (" + (m.sourceHint || "verify license") + ").");
  const note = S.teacherMode ? `<div class="wj-teachernote">📷 <b>Teacher:</b> ${esc(guide)}</div>` : "";
  return `<figure class="wj-figure">
    <img src="${esc(m.file)}" alt="${esc(m.alt || m.subject || "")}" loading="lazy"
      onerror="this.closest('.wj-figure').classList.add('missing')" />
    <div class="wj-figure-fallback">
      <span class="fb-emoji">${esc(fbEmoji)}</span>
      <b>${esc(fbLabel)}</b>
      <small>${esc(m.alt || "")}</small>
    </div>
    ${badge}${cap}${note}
  </figure>`;
}

function phMapSVG() {
  // Stylized-accurate vector of the Philippines (correct island set & positions).
  return `<svg viewBox="0 0 240 360" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-label="Map of the Philippines">
    <defs>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcf1fb"/><stop offset="1" stop-color="#bfe6f5"/></linearGradient>
      <linearGradient id="land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad07f"/><stop offset="1" stop-color="#7cbb63"/></linearGradient>
    </defs>
    <rect width="240" height="360" fill="url(#sea)"/>
    <g stroke="#a9d9ee" stroke-width="1.5" fill="none" opacity=".65" stroke-linecap="round">
      <path d="M18 60 q10 -6 20 0 t20 0"/><path d="M175 96 q10 -6 20 0"/><path d="M28 300 q10 -6 20 0 t20 0"/></g>
    <g fill="url(#land)" stroke="#57a24b" stroke-width="1.8" stroke-linejoin="round">
      <!-- Luzon (with northern tip + central body) -->
      <path d="M116 30 c-6 -3 -13 0 -15 8 c-8 3 -11 12 -7 20 c-6 6 -7 16 -2 24 c-2 10 2 20 11 24 c2 10 6 19 15 21 c9 -1 14 -9 12 -19 c8 2 17 -3 17 -13 c0 -10 -9 -16 -18 -14 c5 -9 4 -20 -3 -27 c0 -9 -5 -18 -13 -21 c-4 -2 -6 -3 -14 -3 z"/>
      <!-- Bicol peninsula (SE tail of Luzon) -->
      <path d="M140 100 c9 1 16 9 16 19 c0 9 -6 16 -14 17 c-3 4 -9 3 -10 -3 c4 -8 4 -18 3 -27 c1 -3 3 -5 5 -6 z"/>
      <!-- Mindoro -->
      <path d="M96 150 c-6 -1 -10 6 -8 14 c1 8 5 15 11 14 c5 -1 7 -9 5 -17 c-1 -6 -3 -11 -8 -11 z"/>
      <!-- Palawan (long thin diagonal, SW) -->
      <path d="M52 262 c-5 -4 -3 -12 3 -13 l46 -66 c5 -5 13 0 10 7 l-51 71 c-2 3 -6 3 -8 1 z"/>
      <!-- Visayas: Panay, Negros, Cebu, Bohol, Leyte, Samar -->
      <path d="M126 196 c-7 -1 -11 7 -7 14 c3 6 12 7 16 1 c3 -6 -2 -14 -9 -15 z"/>
      <path d="M148 204 c-5 0 -7 6 -5 15 c2 9 3 16 9 15 c5 -1 5 -10 3 -18 c-1 -7 -3 -12 -7 -12 z"/>
      <path d="M166 200 c-4 0 -5 6 -4 14 c1 9 2 15 5 15 c3 0 4 -9 3 -17 c-1 -7 -1 -12 -4 -12 z"/>
      <ellipse cx="180" cy="226" rx="9" ry="7"/>
      <path d="M190 206 c-4 0 -6 7 -3 14 c2 6 7 13 10 10 c3 -2 1 -12 -1 -18 c-1 -4 -3 -6 -6 -6 z"/>
      <path d="M196 184 c-5 0 -8 8 -5 16 c3 7 8 9 11 4 c3 -6 1 -15 -2 -19 c-1 -1 -2 -1 -4 -1 z"/>
      <!-- Mindanao (large, south) -->
      <path d="M138 266 c-11 4 -15 17 -9 28 c-6 9 -3 22 6 27 c7 11 22 14 33 7 c13 4 26 -5 27 -19 c9 -7 9 -21 0 -28 c-3 -13 -16 -21 -28 -18 c-10 -5 -22 -3 -29 5 z"/>
    </g>
    <text x="176" y="330" font-size="22">⛵</text>
  </svg>`;
}
function phPostcard() {
  return `<div class="postcard">
    <span class="tape"></span>
    <div class="pc-map">${phMapSVG()}</div>
    <span class="rtag tag-luzon">Luzon</span>
    <span class="rtag tag-visayas">Visayas</span>
    <span class="rtag tag-mindanao">Mindanao</span>
  </div>`;
}

function renderScene(sc) {
  const a = cine.a;
  if (sc.type === "intro") {
    return `<div class="scene zoom">
      <div class="kicker">🌏 Wonder Journey · Today's Adventure</div>
      <div class="big-emoji">${a.emoji}</div>
      <h1>${esc(a.title)}</h1>
      <p class="lead">${esc(a.subtitle)}</p>
      <p class="lead" style="opacity:.82;font-size:15px">${esc(a.region)} · 💛 ${esc(a.value)}</p>
    </div>`;
  }
  if (sc.type === "map") {
    return `<div class="scene">
      <div class="kicker">🗺️ Travel Mode</div>
      <h1 style="font-size:clamp(24px,4.4vw,42px)">From the world… to the Philippines 🇵🇭</h1>
      <div class="archi">
        <div class="globe"></div>
        <button class="isle isle-luzon" onclick="isleFact('luzon')"><span class="lbl">Luzon</span></button>
        <button class="isle isle-visayas" onclick="isleFact('visayas')"><span class="lbl">Visayas</span></button>
        <button class="isle isle-mindanao" onclick="isleFact('mindanao')"><span class="lbl">Mindanao</span></button>
      </div>
      <p class="archi-hint">👆 Tap each island group to explore its animals, food & culture · <a href="#" onclick="launchGoogleEarth();return false" style="color:#0e7c86;font-weight:800">🌍 Google Earth (soon)</a></p>
      <div id="isleInfo" class="paper" style="display:none;margin:16px auto 0;max-width:560px"></div>
    </div>`;
  }
  if (sc.type === "gallery") {
    const ids = (sc.ids || []).filter(id => typeof MEDIA !== "undefined" && MEDIA[id]);
    const figs = ids.map(mediaFigure).join("");
    return `<div class="scene scene-lesson">
      <div class="paper"><div class="paper-inner">
        <span class="signpost">📸 Real Photos</span>
        <h2 class="title">📸 See the Real Thing! <span class="title-spark">✨</span></h2>
        <p class="lead" style="font-size:15px;margin:2px 0 6px">Every picture here is (or will be) a <b>real, licensed photo or map</b> — never a pretend one.</p>
        <div class="media-grid">${figs}</div>
      </div></div>
    </div>`;
  }
  if (sc.type === "learn") {
    const title = sc.s.subject.replace(/^Character:\s*/, "");
    return `<div class="scene scene-lesson">
      <div class="paper"><div class="paper-inner">
        <span class="signpost">${sc.s.icon} ${esc(sc.s.subject)}</span>
        <h2 class="title">${sc.s.icon} ${esc(title)} <span class="title-spark">✨</span></h2>
        ${sc.s.html}
      </div></div>
      ${phPostcard()}
    </div>`;
  }
  if (sc.type === "missions") {
    const m = LEVEL_MISSIONS[a.id];
    return `<div class="scene">
      <div class="paper"><div class="paper-inner">
        <span class="signpost">🎯 Missions</span>
        <h2 class="title">🎯 A Mission for Everyone</h2>
        ${LEVEL_TIERS.map(t => `<div class="paper-tier"><b>${t.emoji} ${t.name} · ${t.age}</b><ul>${m[t.key].map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}
      </div></div>
    </div>`;
  }
  if (sc.type === "yourway") {
    const cards = personalActivities(a).map(c => `
      <div class="kid-card" style="--kc:${c.color}">
        <div class="kid-top"><span class="kid-ic">${c.icon}</span><div><b>${esc(c.name)}</b><small>${esc(c.tag)}</small></div></div>
        <p>${esc(c.text)}</p>
      </div>`).join("");
    return `<div class="scene scene-lesson">
      <div class="paper"><div class="paper-inner">
        <span class="signpost">🌟 Explore It Your Way</span>
        <h2 class="title">🌟 One Adventure, Four Ways! <span class="title-spark">✨</span></h2>
        <p class="lead" style="font-size:15px;margin:2px 0 6px">Everyone learns the same topic — each of you gets an activity made for how <b>you</b> love to learn. Pick yours (or try a sibling's)!</p>
        <div class="kids-grid">${cards}</div>
      </div></div>
    </div>`;
  }
  if (sc.type === "quiz") {
    const q = a.quiz[sc.qi];
    return `<div class="scene">
      <div class="kicker">🏆 Quiz · Question ${sc.qi + 1} of ${a.quiz.length}</div>
      <h1 style="font-size:clamp(22px,3.6vw,38px)">${esc(q.q)}</h1>
      <div style="margin-top:22px">${q.a.map((opt, oi) => `<button class="cine-opt" data-o="${oi}" onclick="cineAnswer(${sc.qi},${oi})">${esc(opt)}</button>`).join("")}</div>
    </div>`;
  }
  if (sc.type === "reflect") {
    return `<div class="scene">
      <div class="paper"><div class="paper-inner">
        <span class="signpost">📝 Reflection</span>
        <h2 class="title">💬 Let's Talk Together</h2>
        <ul>${a.reflect.map(q => `<li>${esc(q)}</li>`).join("")}</ul>
      </div></div>
    </div>`;
  }
  // ending
  const r = cine.reward || { gained: 0, newly: [], firstTime: false };
  return `<div class="scene zoom">
    <div class="paper" style="text-align:center;max-width:640px;margin:0 auto">
      <div class="big-emoji" style="animation:none">🏆</div>
      <h2 class="title" style="text-align:center">${cine.score === a.quiz.length ? "Perfect Adventure!" : "Wonderful Journey!"} <span class="title-spark">✨</span></h2>
      <p style="font-size:clamp(18px,2.2vw,23px)">${esc(a.title)}</p>
      <div class="reward-pills">
        <span>⭐ +${r.gained} XP</span>
        <span>📝 ${cine.score}/${a.quiz.length}</span>
        <span>🛂 ${esc(a.stamp.name)}</span>
      </div>
      ${r.newly && r.newly.length ? `<p style="font-weight:800;color:#e0862f">New badges: ${r.newly.map(b => `${b.emoji} ${esc(b.name)}`).join(" · ")}</p>` : ""}
      <p style="margin-top:14px;font-style:italic;font-size:clamp(17px,2vw,21px);color:#5a4420">"See you on our next adventure!" 🌏</p>
      <button class="btn btn-sun" style="margin-top:14px" onclick="closeCinema();go('map')">Back to the Map 🗺️</button>
    </div>
  </div>`;
}

function renderCine() {
  const el = cineEl(), { a, scenes, i } = cine, sc = scenes[i];
  if (sc.type === "ending" && !cine.rewarded) { cine.rewarded = true; cine.reward = awardCompletion(a, cine.score, a.quiz.length); }
  const theme = themeFor(a);
  el.innerHTML = `
    <div class="cine-sky" style="background:${theme.sky}"></div>
    ${theme.palm ? '<div class="cine-palm">🌴</div>' : ""}
    ${cineAmbient()}
    ${decorHTML(theme)}
    ${theme.water ? '<div class="cine-ocean"></div>' : `<div class="cine-ground" style="background:linear-gradient(180deg,transparent,${theme.ground || "rgba(0,0,0,.12)"})"></div>`}
    <div class="cine-scene-label">${sceneLabel(sc, i, scenes.length)}</div>
    <div class="cine-top">
      <button class="cine-btn spk" onclick="toggleCineMute(this)" title="Sound on/off">${cine.muted ? "🔇" : "🔊"}</button>
      <button class="cine-btn xbtn" onclick="closeCinema()" title="Exit theater">✕</button>
    </div>
    <div class="cine-stage">${renderScene(sc)}</div>
    ${mascotHTML(sc)}
    <div class="cine-controls">
      <button class="cine-btn cine-nav" onclick="cinePrev()" ${i === 0 ? "disabled" : ""} title="Back">‹</button>
      <div class="cine-dots">${scenes.map((s, k) => `<span class="cine-dot ${k === i ? "on" : k < i ? "done" : ""}"></span>`).join("")}<span class="dot-star">⭐</span></div>
      <button class="cine-btn cine-nav" onclick="cineNext()" ${i === scenes.length - 1 ? "disabled" : ""} title="Next">›</button>
    </div>`;
  if (sc.type === "ending") { confettiBurst(); sfxStamp(); sfxCelebrate(); }
}

window.openCinema = (id) => {
  const a = ADVENTURES.find(x => x.id === id), idx = ADVENTURES.findIndex(x => x.id === id);
  if (!isUnlocked(idx)) return;
  cine = { a, scenes: buildScenes(a), i: 0, score: 0, answered: {}, muted: false, rewarded: false };
  const el = cineEl(); el.classList.add("show"); document.body.style.overflow = "hidden";
  const ctx = ac(); if (ctx && ctx.state === "suspended") ctx.resume();
  (el.requestFullscreen || el.webkitRequestFullscreen || (() => {})).call(el);
  renderCine();
};
window.closeCinema = () => {
  stopTimer();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  cineEl().classList.remove("show"); cineEl().innerHTML = ""; document.body.style.overflow = ""; cine = null;
};
window.cineNext = () => { if (cine && cine.i < cine.scenes.length - 1) { cine.i++; sfxWhoosh(); renderCine(); } };
window.cinePrev = () => { if (cine && cine.i > 0) { cine.i--; renderCine(); } };
window.toggleCineMute = (btn) => { if (cine) { cine.muted = !cine.muted; btn.textContent = cine.muted ? "🔇" : "🔊"; } };
window.cineAnswer = (qi, oi) => {
  if (!cine || cine.answered[qi] !== undefined) return;
  cine.answered[qi] = oi;
  const q = cine.a.quiz[qi];
  if (oi === q.correct) { cine.score++; sfxCorrect(); } else sfxWrong();
  document.querySelectorAll(".cine-opt").forEach(b => { const o = +b.dataset.o; if (o === q.correct) b.classList.add("correct"); else if (o === oi) b.classList.add("wrong"); });
  const face = document.querySelector(".mascot-face"), bubble = document.getElementById("mascotBubble");
  if (bubble) bubble.textContent = oi === q.correct ? "Yes! That's right! ⭐" : "Good try! Let's learn it together. 💛";
  if (face && oi === q.correct) face.className = "mascot-face cheer";
  setTimeout(() => { if (cine) cineNext(); }, 1300);
};
document.addEventListener("keydown", (e) => {
  if (!cine) return;
  if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); cineNext(); }
  else if (e.key === "ArrowLeft") cinePrev();
  else if (e.key === "Escape") closeCinema();
});

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

/* ---------- celebrations (birthdays · milestones · memory timeline) ---------- */
function memoryTimeline() {
  const events = [];
  const advById = {};
  if (typeof ADVENTURES !== "undefined") ADVENTURES.forEach(a => advById[a.id] = a);
  // Completed adventures
  Object.keys(S.completed).forEach(id => {
    const c = S.completed[id], a = advById[id];
    if (!c || !a) return;
    events.push({ date: c.date || "", icon: a.emoji || "🎯", kind: "Adventure",
      title: `Finished “${a.title}”`, detail: (c.total ? `Quiz ${c.score}/${c.total}` : "") });
  });
  // Morning blessings (gratitude)
  Object.keys(S.blessings || {}).forEach(d => {
    const b = S.blessings[d]; if (!b) return;
    const g = (b.gratitude || []).length;
    const bits = [];
    if (g) bits.push(`${g} gratitude note${g > 1 ? "s" : ""}`);
    if (b.prayed) bits.push("prayer together");
    if (bits.length) events.push({ date: d, icon: "🌅", kind: "Blessing", title: "Morning Blessings", detail: bits.join(" · ") });
  });
  // Birthdays celebrated
  Object.keys(S.birthdayShown || {}).forEach(d => {
    const names = S.birthdayShown[d]; if (!names || !names.length) return;
    events.push({ date: d, icon: "🎂", kind: "Birthday", title: `${names.join(" & ")}'s Birthday`, detail: "Celebrated together 🎉" });
  });
  return events.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
function viewCelebrations() {
  const ub = upcomingBirthdays();
  const label = (d) => d === 0 ? "🎉 Today!" : d === 1 ? "Tomorrow" : `in ${d} days`;
  const done = Object.keys(S.completed).length, total = ADVENTURES.length;
  const earned = BADGES.filter(b => S.badges.includes(b.id));
  // Milestone ladder
  const milestones = [
    { need: 1, icon: "👣", label: "First adventure" },
    { need: 3, icon: "⚡", label: "3 adventures" },
    { need: 7, icon: "🚀", label: "7 adventures" },
    { need: 12, icon: "🌸", label: "12 adventures" },
    { need: total, icon: "🏆", label: "All of World 1" },
  ];
  const nextMile = milestones.find(m => done < m.need);
  const tl = memoryTimeline();

  const bdaySection = ub.length
    ? `<div class="grid g-auto">
        ${ub.slice(0, 6).map(u => `<div class="card stat" style="padding:16px"><span class="em">${u.emoji}</span><span class="lbl">${esc(u.name)}</span><span class="val" style="font-size:18px">${label(u.days)}</span><p style="color:var(--ink-soft);font-size:12px;margin-top:2px">${u.next.toLocaleDateString(undefined, { month: "long", day: "numeric" })}</p></div>`).join("")}
      </div>
      <div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-ghost" onclick="go('settings')">🎂 Manage birthdays</button><button class="btn btn-ghost" onclick="previewBirthday()">✨ Preview celebration</button></div>`
    : `<div class="card empty" style="text-align:center">
        <div class="em">🎂</div>
        <p>Add each explorer's birthday and Wonder Journey will celebrate them with confetti and a warm surprise on their special day.</p>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px">
          <button class="btn btn-primary" onclick="go('settings')">🎂 Add Birthdays</button>
          <button class="btn btn-ghost" onclick="previewBirthday()">✨ Preview a Celebration</button>
        </div>
      </div>`;

  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">🎉 Celebrations</h1>
      <p style="color:var(--ink-soft);margin:6px 0 18px">Every birthday, milestone and memory our family makes together.</p>

      <div class="section-title"><span class="em">🎂</span> Birthdays</div>
      ${bdaySection}

      <div class="section-title" style="margin-top:22px"><span class="em">🏆</span> Milestones &amp; Achievements</div>
      <div class="grid g-auto">
        ${stat("Adventures", `${done} / ${total}`, "🧭")}
        ${stat("Total XP", S.xp, "⭐")}
        ${stat("Passport Stamps", S.stamps.length, "🛂")}
        ${stat("Badges", `${S.badges.length} / ${BADGES.length}`, "🏅")}
      </div>
      <div class="mile-track">
        ${milestones.map(m => `<div class="mile ${done >= m.need ? "on" : ""}"><span class="mile-ic">${m.icon}</span><small>${esc(m.label)}</small></div>`).join("")}
      </div>
      ${nextMile ? `<p style="color:var(--ink-soft);text-align:center;margin:4px 0 0">Next milestone: <b>${nextMile.icon} ${esc(nextMile.label)}</b> — ${nextMile.need - done} to go!</p>`
        : `<p style="color:var(--ink-soft);text-align:center;margin:4px 0 0">🏆 Every milestone reached — what a family!</p>`}
      ${earned.length ? `<div class="badge-strip">${earned.map(b => `<div class="badge-chip" title="${esc(b.desc)}"><span>${b.emoji}</span>${esc(b.name)}</div>`).join("")}</div>` : ""}

      <div class="section-title" style="margin-top:22px"><span class="em">📖</span> Memory Timeline</div>
      ${tl.length ? `<div class="timeline">
        ${tl.map(e => `<div class="tl-item">
          <div class="tl-dot">${e.icon}</div>
          <div class="tl-body"><div class="tl-top"><b>${esc(e.title)}</b><span class="tl-date">${e.date ? new Date(e.date + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}</span></div>${e.detail ? `<small>${esc(e.detail)}</small>` : ""}</div>
        </div>`).join("")}
      </div>` : `<div class="card empty" style="text-align:center"><div class="em">🗺️</div><p>Your memory timeline begins with your first adventure. Finish one to plant your first memory!</p><button class="btn btn-primary" style="margin-top:12px" onclick="go('map')">Start an Adventure 🗺️</button></div>`}

      <div class="section-title" style="margin-top:22px"><span class="em">🎖️</span> Certificates</div>
      <div class="card" style="padding:18px">
        <p style="color:var(--ink-soft);margin:0 0 12px">Celebrate the journey with a beautiful certificate you can print or save as a PDF.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="openCertificate('journey')">🏅 Adventure Journey Certificate</button>
          ${done >= 72
            ? `<button class="btn btn-ocean" onclick="openCertificate('world')">🏆 World 1 Champions Certificate</button>`
            : `<button class="btn btn-ghost" disabled title="Finish all 72 adventures to unlock">🏆 World 1 Champions (${done}/72)</button>`}
        </div>
      </div>
    </div>`;
}

/* Lightweight toast (achievement/confirmation), auto-dismisses. */
let _toastT = null;
function toast(msg) {
  let el = document.getElementById("wjToast");
  if (!el) { el = document.createElement("div"); el.id = "wjToast"; el.className = "wj-toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.remove("show"), 2600);
}
window.toast = toast;

/* ============================================================
   TEACHER PORTAL + PARENT DASHBOARD (Constitution §Parent Experience)
   Grown-up planning & review tools generated from the curriculum map metadata
   plus a materials layer — so every one of the 72 adventures is plannable even
   before its full interactive prose is authored.
   ============================================================ */
const MATERIALS_BY_THEME = {
  cooking:  ["Apron & clean hands", "Measuring cups & spoons", "Mixing bowl & spoon", "Stove/pot (with a grown-up)"],
  festival: ["Colored paper & scissors", "Glue or tape", "Markers or crayons", "String or craft sticks"],
  wildlife: ["Paper & pencils", "Crayons or watercolors", "(Optional) a short nature walk"],
  volcano:  ["Baking soda & vinegar", "Small cup or bottle", "A tray to catch drips", "Clay or paper for the cone"],
  terraces: ["Cardboard or clay", "Scissors & glue", "A cup, soil & a seed to plant"],
  ocean:    ["Blue paper & scissors", "Crayons or paint", "A jar or shoebox (for a diorama)"],
  history:  ["Paper & pencils", "Cardboard for a timeline", "Markers"],
  village:  ["Paper & crayons", "(Optional) simple build/craft items from home"],
  geography:["A real map or globe", "Colored pencils", "Paper"],
  island:   ["Paper & crayons", "Blue paper for the sea", "(Optional) small toy boats"],
  bible:    ["A Bible or story Bible", "Paper & crayons", "(Optional) craft materials"],
};
const THEME_FOCUS = {
  cooking:  "Science: measuring, heat & mixing · Culture: Filipino food & the family table",
  festival: "Science: sound & rhythm · Culture: Philippine festivals & traditions",
  wildlife: "Science: animals & habitats · Culture: caring for God's creatures",
  volcano:  "Science: volcanoes, the Ring of Fire & the earth · Culture: living with volcanoes",
  terraces: "Science: plants, seeds & harvest · Culture: the rice terraces & farming life",
  ocean:    "Science: the sea, reefs & marine life · Culture: island & fishing life",
  history:  "Social studies: Filipino heroes & our story · Culture: national identity",
  village:  "Social studies: family, community & values · Culture: Filipino daily life",
  geography:"Geography: maps, directions & the islands · Culture: where Filipinos live",
  island:   "Geography: Luzon, Visayas & Mindanao · Culture: island life",
  bible:    "Bible geography & timeline · Character: faith and God's story",
};
// Specific ingredient/material lists where a lesson calls for them.
const LESSON_MATERIALS = {
  a7:  { heading: "Champorado ingredients", items: ["1 cup glutinous rice (malagkit)", "4 cups water", "¼ cup cocoa powder or tablea", "¼ cup sugar", "A pinch of salt", "Milk, to serve"] },
  a11: { heading: "Merienda snack ideas", items: ["Ingredients for one simple snack (e.g., banana + peanut butter)", "Small plates & spoons", "A jar of water to drink"] },
  a30: { heading: "Build-a-volcano kit", items: ["Baking soda", "Vinegar", "Red food coloring (optional)", "Clay or a plastic bottle", "A tray"] },
  a42: { heading: "Plant-a-seed kit", items: ["A seed (bean or rice)", "A clear cup", "Cotton or soil", "Water & a sunny window"] },
  a68: { heading: "Parol (star lantern) craft", items: ["Sticks or straws", "Colored paper or cellophane", "Glue & string", "Scissors (with a grown-up)"] },
};

// All adventures from the curriculum map (falls back to authored ADVENTURES).
function allMapAdventures() {
  if (typeof CURRICULUM_MAP !== "undefined" && CURRICULUM_MAP.units) {
    return CURRICULUM_MAP.units.flatMap(u => u.adventures.map(a => ({ ...a, unitName: a.unitName || u.name })));
  }
  return (typeof ADVENTURES !== "undefined" ? ADVENTURES : []).map(a => ({ id: a.id, title: a.title, objective: a.subtitle, value: a.value, built: true }));
}
function fmtDate(d) {
  if (!d) return "";
  try { return new Date(d + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" }); } catch { return d; }
}
// Build a full lesson plan from an adventure's metadata.
function teacherPlan(a) {
  const theme = themeFor(a).id;
  const subjects = [];
  if (a.english) subjects.push(["🗣️ Language / English", a.english]);
  if (a.math) subjects.push(["🔢 Math", a.math]);
  subjects.push(["🔬 Science & Culture", THEME_FOCUS[theme] || "Explore and discover together"]);
  if (a.bible && S.faith) subjects.push(["📖 Bible", a.bible]);
  if (a.value) subjects.push(["💛 Value", a.value]);
  const mats = (MATERIALS_BY_THEME[theme] || ["Paper & crayons"]).slice();
  const special = LESSON_MATERIALS[a.id];
  const kids = personalActivities(a);
  return { theme, subjects, mats, special, kids };
}
function lessonSummaryText(a) {
  const p = teacherPlan(a);
  const L = [];
  L.push(`WONDER JOURNEY — Lesson Plan`);
  L.push(`${a.title}`);
  L.push(`Unit ${a.unit || ""}: ${a.unitName || ""} · ${a.day || ""} ${fmtDate(a.date)}`);
  L.push(``);
  L.push(`Objective: ${a.objective || ""}`);
  L.push(``);
  L.push(`Subjects woven in:`);
  p.subjects.forEach(([k, v]) => L.push(`  - ${k.replace(/^[^ ]+ /, "")}: ${v}`));
  L.push(``);
  L.push(`Materials to prepare:`);
  p.mats.forEach(m => L.push(`  - ${m}`));
  if (p.special) { L.push(`  ${p.special.heading}:`); p.special.items.forEach(i => L.push(`    · ${i}`)); }
  L.push(``);
  L.push(`Personalized activities:`);
  p.kids.forEach(k => L.push(`  - ${k.name}: ${k.text}`));
  return L.join("\n");
}
function copyLesson(id) {
  const a = allMapAdventures().find(x => x.id === id);
  if (!a) return;
  const text = lessonSummaryText(a);
  const done = () => toast("📋 Lesson plan copied!");
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
function fallbackCopy(text, cb) {
  try { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); cb && cb(); } catch { alert(text); }
}
window.copyLesson = copyLesson;

function lessonCardHTML(a, opts = {}) {
  const p = teacherPlan(a);
  const badge = a.built ? `<span class="lp-badge built">interactive ✓</span>` : `<span class="lp-badge">plan ready</span>`;
  const open = opts.open ? " open" : "";
  return `<details class="lesson-card"${open}>
    <summary>
      <span class="lp-when">${esc(a.day || "")} · ${esc(fmtDate(a.date))}</span>
      <span class="lp-title">${esc(a.title)}</span>
      ${badge}
    </summary>
    <div class="lp-body">
      <p class="lp-obj">🎯 <b>Objective:</b> ${esc(a.objective || "")}</p>
      <div class="lp-subjects">
        ${p.subjects.map(([k, v]) => `<div class="lp-sub"><b>${k}</b><span>${esc(v)}</span></div>`).join("")}
      </div>
      <div class="lp-cols">
        <div class="lp-mats">
          <h4>🧰 Materials to prepare</h4>
          <ul>${p.mats.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
          ${p.special ? `<div class="lp-special"><b>${esc(p.special.heading)}</b><ul>${p.special.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>` : ""}
        </div>
        <div class="lp-kids">
          <h4>🌟 Personalized activities</h4>
          ${p.kids.map(k => `<div class="lp-kid"><span>${k.icon}</span><div><b>${esc(k.name)}</b> — ${esc(k.text)}</div></div>`).join("")}
        </div>
      </div>
      <div class="lp-actions">
        <button class="btn btn-ghost" onclick="copyLesson('${a.id}')">📋 Copy lesson plan</button>
        ${a.built ? `<button class="btn btn-ocean" onclick="openAdventure('${a.id}')">▶ Open Adventure</button>` : `<span class="lp-soon">Full interactive lesson coming — plan is ready to teach from now.</span>`}
      </div>
    </div>
  </details>`;
}

function viewTeacher() {
  const advs = allMapAdventures();
  const units = {};
  advs.forEach(a => { (units[a.unit] = units[a.unit] || { name: a.unitName, items: [] }).items.push(a); });
  const builtCount = advs.filter(a => a.built).length;
  // This week's upcoming lessons
  const todayISO = new Date().toISOString().slice(0, 10);
  const upcoming = advs.filter(a => a.date && a.date >= todayISO).slice(0, 3);
  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">👩‍🏫 Teacher Portal</h1>
      <p style="color:var(--ink-soft);margin:6px 0 4px">Everything you need to prepare and teach — objectives, materials, ingredients, personalized activities and a copy-ready plan for all <b>${advs.length}</b> adventures.</p>
      <div class="callout" style="margin:10px 0 18px">💡 <b>Tip:</b> ${builtCount} adventures are fully interactive; the rest come with a ready-to-teach plan from the curriculum map. Turn on <b>Teacher Mode</b> in Settings for the in-lesson timer & answer key.</div>

      ${upcoming.length ? `<div class="section-title"><span class="em">📅</span> Coming up next</div>
        <div class="grid" style="gap:12px">${upcoming.map(a => lessonCardHTML(a, { open: false })).join("")}</div>` : ""}

      ${Object.keys(units).sort((x, y) => x - y).map(un => {
        const u = units[un];
        return `<div class="section-title" style="margin-top:22px"><span class="em">📚</span> Unit ${un} · ${esc(u.name || "")}</div>
          <div class="grid" style="gap:12px">${u.items.map(a => lessonCardHTML(a)).join("")}</div>`;
      }).join("")}
    </div>`;
}

function viewParent() {
  const advs = allMapAdventures();
  const done = Object.keys(S.completed).length, total = advs.length;
  const pct = Math.round((done / total) * 100);
  const todayISO = new Date().toISOString().slice(0, 10);
  const upcoming = advs.filter(a => a.date && a.date >= todayISO).slice(0, 3);
  // Aggregate materials to prepare for the upcoming lessons
  const prep = new Set();
  upcoming.forEach(a => { const p = teacherPlan(a); p.mats.forEach(m => prep.add(m)); if (p.special) p.special.items.forEach(i => prep.add(i)); });
  // Recently completed (for after-class summary), newest first by date
  const recent = advs.filter(a => S.completed[a.id]).sort((x, y) => (S.completed[y.id].date || "").localeCompare(S.completed[x.id].date || "")).slice(0, 5);
  const lvl = typeof levelInfo === "function" ? levelInfo() : null;

  root().innerHTML = `
    <div class="view">
      <h1 style="font-size:26px">📊 Parent Dashboard</h1>
      <p style="color:var(--ink-soft);margin:6px 0 16px">A calm at-a-glance view of your family's learning — progress, what to prepare next, and a copy-ready recap to share.</p>

      <div class="section-title"><span class="em">🌟</span> Progress at a glance</div>
      <div class="prog-hero card">
        <div class="prog-ring" style="--pct:${pct}"><span>${pct}%</span></div>
        <div class="prog-facts">
          <div><b>${done}/${total}</b><small>Adventures</small></div>
          <div><b>${S.xp}</b><small>Total XP</small></div>
          <div><b>${S.badges.length}/${BADGES.length}</b><small>Badges</small></div>
          <div><b>${S.stamps.length}</b><small>Stamps</small></div>
          ${lvl ? `<div><b>${lvl.cur.emoji} ${esc(lvl.cur.name)}</b><small>Level</small></div>` : ""}
        </div>
      </div>

      <div class="section-title" style="margin-top:22px"><span class="em">📅</span> Coming up — preview &amp; prep</div>
      ${upcoming.length ? `
        <div class="grid g-auto">
          ${upcoming.map(a => `<div class="card" style="padding:16px">
            <div style="font-size:12px;font-weight:800;color:var(--ink-soft)">${esc(a.day || "")} · ${esc(fmtDate(a.date))}</div>
            <h3 style="margin:4px 0 6px">${esc(a.title)}</h3>
            <p style="color:var(--ink-soft);font-size:14px">${esc(a.objective || "")}</p>
            <div style="margin-top:8px"><span class="tag">💛 ${esc(a.value || "")}</span></div>
          </div>`).join("")}
        </div>
        <div class="card" style="padding:18px;margin-top:12px">
          <h4 style="margin:0 0 8px">🧰 Prepare these for the week</h4>
          <div class="prep-chips">${[...prep].map(m => `<span class="prep-chip">${esc(m)}</span>`).join("")}</div>
          <button class="btn btn-ghost" style="margin-top:12px" onclick="go('teacher')">👩‍🏫 Full lesson plans →</button>
        </div>` : `<div class="card empty"><div class="em">🎉</div><p>You've reached the end of the schedule — what a journey!</p></div>`}

      <div class="section-title" style="margin-top:22px"><span class="em">💌</span> After-class summary</div>
      ${recent.length ? `
        <div class="card" style="padding:18px">
          <p style="color:var(--ink-soft);margin:0 0 10px">A warm recap of your latest adventures — copy it to share with family or save to your records.</p>
          <div id="acSummary" class="ac-summary">${esc(afterClassSummary(recent))}</div>
          <button class="btn btn-primary" style="margin-top:12px" onclick="copyAfterClass()">📋 Copy summary</button>
        </div>` : `<div class="card empty"><div class="em">🌱</div><p>Finish your first adventure and a friendly recap will appear here, ready to share.</p><button class="btn btn-primary" style="margin-top:12px" onclick="go('map')">Start an Adventure 🗺️</button></div>`}
    </div>`;
}
function afterClassSummary(recent) {
  const lines = ["🌏 Wonder Journey — Family Learning Recap", ""];
  recent.forEach(a => {
    const c = S.completed[a.id] || {};
    lines.push(`• ${a.title}${c.date ? ` (${fmtDate(c.date)})` : ""}`);
    if (a.objective) lines.push(`   Learned: ${a.objective}`);
    if (a.value) lines.push(`   Value: ${a.value}`);
    if (c.total) lines.push(`   Quiz: ${c.score}/${c.total}`);
  });
  lines.push("", `Total: ${Object.keys(S.completed).length} adventures · ${S.xp} XP · ${S.badges.length} badges earned. 💛`);
  return lines.join("\n");
}
function copyAfterClass() {
  const advs = allMapAdventures();
  const recent = advs.filter(a => S.completed[a.id]).sort((x, y) => (S.completed[y.id].date || "").localeCompare(S.completed[x.id].date || "")).slice(0, 5);
  const text = afterClassSummary(recent);
  const done = () => toast("📋 Summary copied!");
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  else fallbackCopy(text, done);
}
window.copyAfterClass = copyAfterClass;

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

/* ---------- family storybook ---------- */
function storyPage(a, i) {
  const refl = (S.reflections[a.id] || []);
  const date = S.completed[a.id]?.date || "";
  const subs = [...new Set(a.sections.filter(s => !(s.faith && !S.faith)).map(s => s.subject.split(/[—-]/)[0].trim()))];
  const answered = a.reflect.map((q, qi) => ({ q, ans: (refl[qi] || "").trim() })).filter(r => r.ans);
  return `
    <div class="card story-page" style="padding:24px;margin-bottom:18px">
      <div style="display:flex;align-items:flex-start;gap:16px">
        <div style="font-size:46px;line-height:1">${a.emoji}</div>
        <div style="flex:1;min-width:0">
          <span class="tag">Chapter ${i + 1}${date ? " · " + esc(date) : ""}</span>
          <h2 style="font-size:22px;margin:6px 0 2px">${esc(a.title)}</h2>
          <div style="color:var(--ink-soft);font-size:13px">${esc(a.region)} · 💛 We learned <b>${esc(a.value)}</b></div>
        </div>
        <div style="text-align:center;flex-shrink:0">
          <div style="width:66px;height:66px;border-radius:16px;border:3px solid var(--coral);display:grid;place-items:center;font-size:34px;background:color-mix(in srgb,var(--coral) 8%,var(--card))">${a.stamp.emoji}</div>
          <small style="font-size:11px;font-weight:800;color:var(--ink-soft)">${esc(a.stamp.name)}</small>
        </div>
      </div>
      <div style="margin-top:16px">
        <h3 style="font-size:14px;margin-bottom:6px">🌈 What we explored</h3>
        <div class="tags">${subs.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
      </div>
      ${answered.length ? `
      <div style="margin-top:16px">
        <h3 style="font-size:14px;margin-bottom:6px">📝 In our own words</h3>
        ${answered.map(r => `<div class="callout" style="margin:8px 0"><b style="display:block;font-size:12.5px;color:var(--ink-soft);margin-bottom:2px">${esc(r.q)}</b>${esc(r.ans)}</div>`).join("")}
      </div>` : ""}
    </div>`;
}

function viewStorybook() {
  const done = ADVENTURES.filter(a => isDone(a.id));
  const famName = S.family[0]?.name ? S.family.map(f => f.name).slice(0, 2).join(" & ") : "Our";
  const grats = [];
  Object.keys(S.blessings).sort().forEach(k => (S.blessings[k].gratitude || []).forEach(g => grats.push(g)));

  root().innerHTML = `
    <div class="view">
      <div class="hero story-hero">
        <h1>📖 The ${esc(famName)} Family Storybook</h1>
        <p>A keepsake of every adventure we've taken together on our Wonder Journey through the Philippines 🇵🇭.</p>
        <div class="no-print" style="margin-top:18px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
          <button class="btn btn-ghost" onclick="go('map')">Add more chapters 🗺️</button>
        </div>
      </div>

      ${done.length
        ? done.map((a, i) => storyPage(a, i)).join("")
        : `<div class="card empty"><div class="em">📖</div><p>Your storybook is waiting for its first chapter.<br/>Finish an adventure and it will appear here automatically!</p>
           <button class="btn btn-primary no-print" style="margin-top:12px" onclick="go('map')">Start an Adventure 🗺️</button></div>`}

      ${grats.length ? `
      <div class="card story-page" style="padding:24px;margin-bottom:18px">
        <h2 style="font-size:20px">💛 Our Gratitude Memories</h2>
        <p style="color:var(--ink-soft);font-size:13px;margin-top:2px">Little things our family was thankful for along the way.</p>
        <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px">
          ${grats.slice(-16).map(g => `<div class="callout" style="margin:0;display:flex;gap:10px;align-items:center"><span class="tag" style="background:color-mix(in srgb,var(--sun) 22%,transparent);color:var(--ink)">${esc(g.name)}</span><span>${esc(g.text)}</span></div>`).join("")}
        </div>
      </div>` : ""}

      ${done.length ? `<p class="no-print" style="text-align:center;color:var(--ink-soft);font-size:13px;margin-top:10px">Tip: “Print / Save as PDF” makes a beautiful keepsake you can keep or print. 📚</p>` : ""}
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
        <h3 style="margin-bottom:6px">👨‍👩‍👧‍👦 Family Members &amp; 🎂 Birthdays</h3>
        <p style="color:var(--ink-soft);font-size:14px;margin-bottom:10px">Add each child and grown-up, pick an emoji avatar, and set each person's <b>🎂 birthday</b> (the date box) — Wonder Journey will celebrate them with confetti on their special day.</p>
        <div id="famList">
          ${S.family.map((f, i) => `
            <div class="fam-editor">
              <input value="${esc(f.emoji)}" maxlength="2" style="width:56px;text-align:center;font-size:20px" data-f="${i}" data-k="emoji" />
              <input value="${esc(f.name)}" placeholder="Name" data-f="${i}" data-k="name" />
              <input value="${esc(f.role)}" placeholder="Role" data-f="${i}" data-k="role" style="max-width:120px" />
              <input type="date" value="${esc(f.birthday || "")}" data-f="${i}" data-k="birthday" title="Birthday (optional)" style="max-width:160px" />
              <button class="del" onclick="removeFamily(${i})" title="Remove">✕</button>
            </div>`).join("")}
        </div>
        <button class="btn btn-ghost" onclick="addFamily()">➕ Add Member</button>
        <button class="btn btn-ocean" style="margin-left:8px" onclick="saveFamily()">💾 Save Family</button>
      </div>

      <div class="card" style="padding:22px;margin-top:16px">
        <h3 style="margin-bottom:6px">👩‍🏫 Teacher Tools</h3>
        <div class="toggle-row">
          <div class="t-txt"><b>Teacher Mode</b><small>Adds a lesson timer & quiz answer key inside adventures. Turn OFF for the family's clean view.</small></div>
          <div class="sw ${S.teacherMode ? "on" : ""}" onclick="toggleTeacher(this)"></div>
        </div>
        <div class="toggle-row">
          <div class="t-txt"><b>Mascot Guide (Sinag ☀️)</b><small>Shows a friendly guide who cheers the children on in Cinematic Mode.</small></div>
          <div class="sw ${S.mascot ? "on" : ""}" onclick="toggleMascot(this)"></div>
        </div>
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
    if (!S.family[i]) return;
    row.querySelectorAll("input").forEach(inp => {
      const k = inp.dataset.k, v = inp.value;
      if (k === "birthday") { if (v) S.family[i].birthday = v; else delete S.family[i].birthday; }
      else if (v) S.family[i][k] = v;
    });
  });
  save(); renderTop();
  const b = event.target; const o = b.textContent; b.textContent = "Saved! ✓"; setTimeout(() => b.textContent = o, 1400);
};
function pickColor() { const c = ["#0e7c86", "#e5674f", "#3f9d54", "#7a5cc4", "#f4a821", "#12a3af"]; return c[Math.floor(Math.random() * c.length)]; }

window.toggleFaith = (sw) => { S.faith = !S.faith; sw.classList.toggle("on", S.faith); save(); };
window.toggleTeacher = (sw) => { S.teacherMode = !S.teacherMode; sw.classList.toggle("on", S.teacherMode); save(); };
window.toggleMascot = (sw) => { S.mascot = !S.mascot; sw.classList.toggle("on", S.mascot); save(); };

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

/* ---------- teacher mode: lesson timer ---------- */
let lessonSeconds = 0, lessonRunning = false, lessonTick = null;
const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
function updateTimerLabel() { const e = document.getElementById("lessonTime"); if (e) e.textContent = fmtTime(lessonSeconds); }
function updateTimerBtn() { const e = document.getElementById("timerBtn"); if (e) e.textContent = lessonRunning ? "⏸ Pause" : "▶ Start"; }
function stopTimer() { lessonRunning = false; clearInterval(lessonTick); }
window.timerToggle = () => {
  lessonRunning = !lessonRunning; clearInterval(lessonTick);
  if (lessonRunning) lessonTick = setInterval(() => { lessonSeconds++; updateTimerLabel(); }, 1000);
  updateTimerBtn();
};
window.timerReset = () => { lessonRunning = false; clearInterval(lessonTick); lessonSeconds = 0; updateTimerLabel(); updateTimerBtn(); };

function teacherToolbar() {
  if (!S.teacherMode) return "";
  return `
    <div class="card no-print" style="padding:16px;margin-top:12px;border:1px solid color-mix(in srgb,var(--grape) 35%,transparent);background:color-mix(in srgb,var(--grape) 8%,transparent)">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <span class="tag" style="background:var(--grape);color:#fff">👩‍🏫 Teacher Mode</span>
        <div style="display:flex;align-items:center;gap:8px;margin-left:auto">
          <span id="lessonTime" style="font-family:ui-monospace,monospace;font-size:22px;font-weight:800;font-variant-numeric:tabular-nums">00:00</span>
          <button class="btn btn-ghost" style="padding:8px 14px" id="timerBtn" onclick="timerToggle()">▶ Start</button>
          <button class="btn btn-ghost" style="padding:8px 14px" onclick="timerReset()">Reset</button>
        </div>
      </div>
      <p style="font-size:13px;color:var(--ink-soft);margin-top:10px">💡 <b>Teacher tip:</b> Expand each subject card as you teach, pause for the “Try it” activities, and let a different child answer each quiz question. The timer & answer key show <b>only in Teacher Mode</b> — the family sees the clean view.</p>
    </div>`;
}

/* ---------- theme ---------- */
function applyTheme() { document.body.classList.toggle("dark", S.theme === "dark"); }
$("#themeBtn").addEventListener("click", () => { S.theme = S.theme === "dark" ? "light" : "dark"; save(); applyTheme(); renderTop(); });

/* ---------- router ---------- */
const VIEWS = { home: viewHome, blessings: viewBlessings, map: viewMap, passport: viewPassport, badges: viewBadges, celebrations: viewCelebrations, tree: viewTree, cookbook: viewCookbook, storybook: viewStorybook, teacher: viewTeacher, parent: viewParent, family: viewFamily, settings: viewSettings };
function go(view) {
  stopTimer();
  (VIEWS[view] || viewHome)();
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  closeNav();
  window.scrollTo(0, 0);
  if (pendingMilestone()) setTimeout(checkMilestones, 450);
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
checkBirthdays();
