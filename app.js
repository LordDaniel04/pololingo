/* Pololingo: App-Logik. Alles läuft lokal im Browser, gespeichert in localStorage. */
(function () {
  "use strict";

  const KEY = "pololingo-v1";
  const { DAY, MIN } = FSRS;
  const $ = (sel, el = document) => el.querySelector(sel);
  const app = $("#app");

  // ---------- Zustand ----------
  const defaults = () => ({
    version: 1,
    settings: { name: "", gender: "", newPerDay: 8, retention: 0.9, autoplay: true, rate: 1, voice: "", listenText: false },
    cards: {},        // "sentId:kind" -> Karte
    introduced: {},   // sentId -> Zeitpunkt
    custom: [],       // eigene Sätze
    log: [],          // [Zeit, cardId, Bewertung, Zustand vorher]
    daily: { day: 0, newSent: 0, shadow: 0 }
  });
  let S = load();
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const d = JSON.parse(raw);
      const base = defaults();
      return Object.assign(base, d, { settings: Object.assign(base.settings, d.settings || {}) });
    } catch (e) { return defaults(); }
  }
  function save() {
    if (S.log.length > 20000) S.log = S.log.slice(-20000);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Speichern fehlgeschlagen: " + e.message); }
  }
  function today() {
    const d = FSRS.startOfDay(Date.now());
    if (S.daily.day !== d) S.daily = { day: d, newSent: 0, shadow: 0 };
    return S.daily;
  }

  // ---------- Sätze ----------
  let SENT = {}, ORDER = [];
  function buildSentences() {
    SENT = {}; ORDER = [];
    for (const c of S.custom) {
      SENT[c.id] = { id: c.id, pl: c.pl, de: c.de, note: c.note || "", lesson: "Meine Sätze", custom: true };
      ORDER.push(c.id);
    }
    LESSONS.forEach((L, li) => {
      L.s.forEach((x, i) => {
        const id = L.id + "-" + String(i + 1).padStart(2, "0");
        SENT[id] = { id, pl: x[0], de: x[1], note: x[2] || "", lesson: L.title, lessonIdx: li };
        ORDER.push(id);
      });
    });
  }
  buildSentences();

  function fill(t) {
    const g = S.settings.gender === "f" ? 1 : 0;
    return String(t)
      .replace(/\{([^{}\/]*)\/([^{}]*)\}/g, (_, m, f) => (g ? f : m))
      .replace(/\{NAME\}/g, S.settings.name || "Tomek");
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const PL = id => fill(SENT[id].pl);
  const DE = id => fill(SENT[id].de);

  // ---------- Sprache: Ausgabe ----------
  let voices = [];
  function loadVoices() {
    voices = (speechSynthesis.getVoices() || []).filter(v => /^pl/i.test(v.lang));
  }
  let voicesChecked = false;
  if ("speechSynthesis" in window) {
    loadVoices();
    voicesChecked = voices.length > 0;
    speechSynthesis.onvoiceschanged = () => { loadVoices(); voicesChecked = true; if (!cur && view !== "mine") render(); };
    setTimeout(() => { if (!voicesChecked) { voicesChecked = true; if (!cur && view !== "mine") render(); } }, 2500);
  }
  function pickVoice() {
    if (!voices.length) return null;
    const chosen = voices.find(v => v.name === S.settings.voice);
    if (chosen) return chosen;
    return voices.find(v => /natural/i.test(v.name)) || voices.find(v => /online/i.test(v.name)) || voices[0];
  }
  function speak(text, rate, onend) {
    if (!("speechSynthesis" in window)) { onend && onend(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[–—]/g, ","));
    u.lang = "pl-PL";
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = (rate || 1) * (S.settings.rate || 1);
    if (onend) { u.onend = onend; u.onerror = onend; }
    speechSynthesis.speak(u);
  }

  // ---------- Sprache: Erkennung ----------
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  function listen() {
    return new Promise((resolve, reject) => {
      if (!Rec) return reject(new Error("Spracherkennung wird von diesem Browser nicht unterstützt."));
      speechSynthesis && speechSynthesis.cancel();
      const r = new Rec();
      r.lang = "pl-PL"; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
      let got = false;
      r.onresult = e => {
        got = true;
        const alts = [];
        for (const res of e.results) for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
        resolve(alts);
      };
      r.onerror = e => reject(new Error(e.error === "not-allowed" ? "Mikrofon nicht erlaubt." : e.error === "no-speech" ? "Nichts gehört. Nochmal?" : "Fehler: " + e.error));
      r.onend = () => { if (!got) reject(new Error("Nichts gehört. Nochmal?")); };
      r.start();
    });
  }
  const strip = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L");
  const words = s => s.toLowerCase().replace(/[.,!?…„”"“–—:;()\-]/g, " ").split(/\s+/).filter(Boolean);
  function compare(target, said) {
    const t = words(target), h = words(said);
    const eq = (a, b) => a === b ? 2 : strip(a) === strip(b) ? 1 : 0;
    // LCS mit Gewichtung
    const n = t.length, m = h.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
      const e = eq(t[i], h[j]);
      dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1], e ? e + dp[i + 1][j + 1] : 0);
    }
    const marks = [];
    let i = 0, j = 0;
    while (i < n) {
      if (j < m && eq(t[i], h[j]) && dp[i][j] === eq(t[i], h[j]) + dp[i + 1][j + 1]) { marks.push([t[i], eq(t[i], h[j]) === 2 ? "ok" : "near"]); i++; j++; }
      else if (j < m && dp[i][j + 1] >= dp[i + 1][j]) j++;
      else { marks.push([t[i], "miss"]); i++; }
    }
    const score = n ? marks.reduce((a, [, k]) => a + (k === "ok" ? 1 : k === "near" ? 0.7 : 0), 0) / n : 0;
    return { score, marks, said };
  }
  function bestMatch(target, alts) {
    return alts.map(a => compare(target, a)).sort((a, b) => b.score - a.score)[0];
  }
  function diffHtml(res) {
    return `<div class="heard"><div class="label">Erkannt: „${esc(res.said)}“ · <span class="score">${Math.round(res.score * 100)} %</span></div>
      <div class="diff">${res.marks.map(([w, k]) => `<span class="${k}">${esc(w)}</span>`).join(" ")}</div></div>`;
  }

  // ---------- Aufnahme ----------
  let mediaRec = null, recChunks = [], recUrl = null;
  async function toggleRecord(btn, onDone) {
    if (mediaRec && mediaRec.state === "recording") { mediaRec.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recChunks = [];
      mediaRec = new MediaRecorder(stream);
      mediaRec.ondataavailable = e => recChunks.push(e.data);
      mediaRec.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (recUrl) URL.revokeObjectURL(recUrl);
        recUrl = URL.createObjectURL(new Blob(recChunks, { type: mediaRec.mimeType }));
        btn && btn.classList.remove("on");
        if (btn) btn.innerHTML = "⏺ Aufnehmen";
        onDone && onDone();
      };
      speechSynthesis.cancel();
      mediaRec.start();
      if (btn) { btn.classList.add("on"); btn.innerHTML = "⏹ Stopp"; }
    } catch (e) { toast("Mikrofon nicht verfügbar: " + e.message); }
  }
  function playMine(cb) {
    if (!recUrl) { toast("Noch keine Aufnahme."); return; }
    const a = new Audio(recUrl);
    if (cb) a.onended = cb;
    a.play();
  }

  // ---------- Karten ----------
  function newCard(sentId, kind, due) {
    return { id: sentId + ":" + kind, sent: sentId, kind, state: "new", due, s: 0, d: 0, reps: 0, lapses: 0, last: 0, step: 0 };
  }
  function introduce(sentId, known) {
    const now = Date.now();
    S.introduced[sentId] = now;
    today().newSent++;
    const tomorrow = FSRS.startOfDay(now) + DAY + 4 * 60 * MIN;
    if (known) {
      for (const kind of ["listen", "speak"]) {
        const c = newCard(sentId, kind, 0);
        S.cards[c.id] = Object.assign(c, { state: "review", s: 8, d: 4, reps: 1, last: now, ivl: 7, due: now + (5 + Math.random() * 5) * DAY });
      }
    } else {
      const sp = newCard(sentId, "speak", now + 45 * 1000);
      const li = newCard(sentId, "listen", tomorrow);
      S.cards[sp.id] = sp;
      S.cards[li.id] = li;
    }
    save();
  }
  function opts() { return { retention: S.settings.retention || 0.9 }; }
  function rateCard(card, g) {
    const now = Date.now();
    const next = FSRS.schedule(card, g, now, opts());
    S.cards[card.id] = next;
    S.log.push([now, card.id, g, card.state]);
    save();
  }
  function sentStatus(id) {
    const cs = [S.cards[id + ":speak"], S.cards[id + ":listen"]].filter(Boolean);
    if (!cs.length) return "new";
    if (cs.every(c => c.state === "review" && c.s >= 21)) return "mature";
    if (cs.some(c => c.state === "review")) return "review";
    return "learning";
  }
  const STATUS_LABEL = { new: "neu", learning: "lernt", review: "kann ich", mature: "gefestigt" };

  function fmtIvl(ms) {
    const m = ms / MIN;
    if (m < 1.5) return "<1 Min";
    if (m < 60) return Math.round(m) + " Min";
    const h = m / 60;
    if (h < 20) return Math.round(h) + " Std";
    const d = ms / DAY;
    if (d < 30) return Math.round(d) + " T";
    if (d < 365) return (Math.round(d / 30 * 10) / 10).toString().replace(".", ",") + " Mon";
    return (Math.round(d / 365 * 10) / 10).toString().replace(".", ",") + " J";
  }

  // ---------- Lern-Session ----------
  let cur = null; // { type: 'intro'|'card', id, card, revealed, result }
  let sinceNew = 0;
  function counts() {
    const now = Date.now();
    let learn = 0, review = 0, aheadSoon = 0;
    for (const c of Object.values(S.cards)) {
      if (c.suspended || !SENT[c.sent]) continue;
      if (c.state === "review" && c.due <= now) review++;
      else if (c.state !== "review" && c.due <= now) learn++;
      else if (c.state !== "review" && c.due <= now + 20 * MIN) aheadSoon++;
    }
    const newLeft = Math.max(0, (S.settings.newPerDay | 0) - today().newSent);
    const nextNew = ORDER.filter(id => !S.introduced[id]).slice(0, newLeft);
    return { learn, review, aheadSoon, newLeft: nextNew.length, nextNew };
  }
  function pickNext() {
    const now = Date.now();
    const all = Object.values(S.cards).filter(c => !c.suspended && SENT[c.sent]);
    const dueLearn = all.filter(c => c.state !== "review" && c.due <= now).sort((a, b) => a.due - b.due);
    const dueRev = all.filter(c => c.state === "review" && c.due <= now).sort((a, b) => a.due - b.due);
    const { nextNew } = counts();
    // Lernkarten zuerst, neue Sätze ins Wiederholen einstreuen
    if (dueLearn.length) return { type: "card", card: dueLearn[0] };
    if (nextNew.length && (sinceNew >= 3 || !dueRev.length)) { sinceNew = 0; return { type: "intro", id: nextNew[0] }; }
    if (dueRev.length) { sinceNew++; return { type: "card", card: dueRev[0] }; }
    const ahead = all.filter(c => c.state !== "review" && c.due <= now + 20 * MIN).sort((a, b) => a.due - b.due);
    if (ahead.length) return { type: "card", card: ahead[0] };
    return null;
  }
  function advance() {
    cur = pickNext();
    if (cur) { cur.revealed = false; cur.result = null; }
    render();
    if (cur && S.settings.autoplay) {
      if (cur.type === "intro") speak(PL(cur.id));
      else if (cur.card.kind === "listen") speak(PL(cur.card.sent));
    }
  }

  // ---------- Views ----------
  let view = "learn";
  function setView(v) {
    view = v;
    const sub = ["lessons", "sounds", "stats", "settings"].includes(v);
    document.querySelectorAll("#nav button").forEach(b => b.classList.toggle("active", b.dataset.view === v || (sub && b.dataset.view === "more")));
    speechSynthesis && speechSynthesis.cancel();
    stopStory();
    if (v === "learn") { cur = null; }
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    const fn = VIEWS[view] || VIEWS.learn;
    app.innerHTML = fn();
    if (needsSetup()) showSetup();
  }

  function voiceWarning() {
    if (!("speechSynthesis" in window)) return `<div class="warnbox">Dieser Browser kann keine Sprache ausgeben. Bitte öffne Pololingo in Microsoft Edge.</div>`;
    if (!voicesChecked || voices.length) return "";
    if (/android/i.test(navigator.userAgent)) return `<div class="warnbox">Keine polnische Stimme gefunden. Am Handy: <b>Einstellungen → Sprachausgabe (Text-in-Sprache) → Google → Sprachdaten installieren → Polnisch</b>. Danach die App neu öffnen.</div>`;
    return `<div class="warnbox">Keine polnische Stimme gefunden. Am PC gibt es in Microsoft Edge gute polnische Online-Stimmen (Zofia, Marek), oder du installierst unter Windows-Einstellungen → Zeit und Sprache → Sprache „Polnisch“ mit Sprachausgabe.</div>`;
    return "";
  }

  const VIEWS = {};

  VIEWS.learn = function () {
    if (cur) return studyHtml();
    const c = counts();
    const totalIntro = Object.keys(S.introduced).length;
    const any = c.learn + c.review + c.newLeft;
    return `
      <h1>Dzień dobry${S.settings.name ? ", " + esc(S.settings.name) : ""}!</h1>
      <p class="muted">Heute: Wiederholen, was fällig ist, und ein paar neue Sätze laut sprechen.</p>
      ${voiceWarning()}
      <div class="today">
        <div class="stat"><b>${c.review + c.learn}</b><span>fällige Karten</span></div>
        <div class="stat"><b>${c.newLeft}</b><span>neue Sätze heute</span></div>
        <div class="stat"><b>${totalIntro}</b><span>Sätze bisher</span></div>
      </div>
      ${any ? `<button class="btn primary reveal" data-act="start">Los geht's</button>
        <p class="hint">Tipp: Sprich jede Antwort <b>laut</b> aus, bevor du aufdeckst. Das trainiert genau das, was du im Gespräch brauchst.</p>`
        : `<div class="card done"><div class="big">✓</div><h2>Für heute alles erledigt.</h2>
          <p class="muted">Jetzt bringt dir Input am meisten: Lies eine <a href="#" data-view-link="stories">Geschichte</a> oder mach eine Runde <a href="#" data-view-link="shadow">Shadowing</a>.</p>
          ${c.aheadSoon ? `<p class="small muted">${c.aheadSoon} Karte(n) kommen in den nächsten Minuten nochmal.</p>` : ""}
          <button class="btn" data-act="extra">+ 5 neue Sätze extra</button></div>`}
      <h2>So funktioniert's</h2>
      <div class="card small">
        <p><b>Neuer Satz:</b> Hören, zweimal laut nachsprechen, Bedeutung merken.</p>
        <p><b>Sprechen-Karte:</b> Du siehst Deutsch und sagst den Satz auf Polnisch. Mit 🎙 prüft die Spracherkennung, wie nah du dran warst.</p>
        <p><b>Hören-Karte:</b> Du hörst Polnisch und sagst dir, was es bedeutet.</p>
        <p style="margin:0"><b>Bewerten:</b> „Nochmal“, wenn du es nicht wusstest. „Gut“, wenn es geklappt hat. Der FSRS-Algorithmus zeigt dir jede Karte genau dann wieder, wenn du sie sonst vergessen würdest.</p>
      </div>`;
  };

  function studyHtml() {
    const c = counts();
    const left = c.learn + c.review + c.newLeft + c.aheadSoon;
    const hdr = `<div class="row small muted" style="margin-bottom:10px">
        <span>Noch ${left} · neu ${c.newLeft} · fällig ${c.review + c.learn}</span><span class="spacer"></span>
        <button class="btn ghost small" data-act="stop">Pause</button></div>`;
    if (!cur) return "";
    if (cur.type === "intro") {
      const id = cur.id, s = SENT[id];
      return hdr + `<div class="card study">
        <div class="kind"><span class="tag">Neuer Satz</span> · ${esc(s.lesson)}</div>
        <div class="prompt pl">${esc(PL(id))}</div>
        <div class="de" style="font-size:19px;color:var(--muted)">${esc(DE(id))}</div>
        ${s.note ? `<div class="note">${esc(fill(s.note))}</div>` : ""}
        <div class="row" style="margin-top:18px">
          <button class="btn" data-act="play">🔊 Anhören <kbd>R</kbd></button>
          <button class="btn" data-act="slow">🐢 Langsam <kbd>S</kbd></button>
          ${Rec ? `<button class="btn" data-act="mic">🎙 Nachsprechen prüfen <kbd>M</kbd></button>` : ""}
        </div>
        <div id="micres">${cur.result ? diffHtml(cur.result) : ""}</div>
        <ol class="steps" style="margin-top:16px">
          <li>Anhören und den Satz zweimal laut nachsprechen, gern mit Blick auf den Text.</li>
          <li>Achte auf Betonung (vorletzte Silbe) und die Laute.</li>
        </ol>
        <div class="controls row">
          <button class="btn" data-act="known">Kenne ich schon</button>
          <span class="spacer"></span>
          <button class="btn primary" data-act="introok">Weiter <kbd>Leertaste</kbd></button>
        </div></div>`;
    }
    const card = cur.card, id = card.sent, s = SENT[id];
    const isSpeak = card.kind === "speak";
    const pv = FSRS.preview(card, Date.now(), opts());
    const sugg = cur.result ? (cur.result.score >= 0.95 ? 3 : cur.result.score >= 0.7 ? 2 : 1) : 0;
    const front = isSpeak
      ? `<div class="kind"><span class="tag">Sprechen</span> · Sag es auf Polnisch</div>
         <div class="prompt">${esc(DE(id))}</div>
         ${!cur.revealed && Rec ? `<div class="row" style="margin-top:8px"><button class="btn rec" data-act="mic">🎙 Laut sagen &amp; prüfen <kbd>M</kbd></button></div>` : ""}`
      : `<div class="kind"><span class="tag">Hören</span> · Was bedeutet das?</div>
         <div class="row" style="margin-top:16px">
           <button class="btn" data-act="play">🔊 Nochmal <kbd>R</kbd></button>
           <button class="btn" data-act="slow">🐢 Langsam <kbd>S</kbd></button>
           ${!cur.revealed && !cur.showText ? `<button class="btn ghost" data-act="showtext">Text zeigen</button>` : ""}
         </div>
         ${(cur.showText || S.settings.listenText) && !cur.revealed ? `<div class="prompt pl">${esc(PL(id))}</div>` : ""}`;
    const back = cur.revealed ? `<div class="answer">
        <div class="pl">${esc(PL(id))}</div>
        <div class="de">${esc(DE(id))}</div>
        ${s.note ? `<div class="note">${esc(fill(s.note))}</div>` : ""}
        ${isSpeak ? `<div class="row" style="margin-top:12px">
          <button class="btn" data-act="play">🔊 <kbd>R</kbd></button><button class="btn" data-act="slow">🐢 <kbd>S</kbd></button>
          ${Rec ? `<button class="btn" data-act="mic">🎙 Nochmal sprechen</button>` : ""}</div>` : ""}
      </div>` : "";
    const ctrls = cur.revealed
      ? `<div class="rate">${[[1, "Nochmal"], [2, "Schwer"], [3, "Gut"], [4, "Leicht"]].map(([g, l]) =>
          `<button data-g="${g}" class="${sugg === g ? "sugg" : ""}"><b>${l}</b><small>${fmtIvl(pv[g])} · <kbd>${g}</kbd></small></button>`).join("")}</div>`
      : `<button class="btn primary reveal" data-act="reveal">Aufdecken <kbd>Leertaste</kbd></button>`;
    return hdr + `<div class="card study">
      ${front}
      <div id="micres">${cur.result ? diffHtml(cur.result) : ""}</div>
      ${back}
      <div class="controls">${ctrls}
      ${!cur.revealed && isSpeak ? `<p class="hint">Erst laut sagen, dann aufdecken. Raten ist erlaubt, Schweigen nicht.</p>` : ""}</div>
    </div>`;
  }

  VIEWS.lessons = function () {
    return `<h1>Lektionen</h1>
      <p class="muted">Die Sätze kommen in dieser Reihenfolge dran, sortiert nach Nutzen fürs Sprechen. Eigene Sätze haben Vorrang.</p>
      ${LESSONS.map((L, li) => {
        const ids = ORDER.filter(id => SENT[id].lessonIdx === li);
        const done = ids.filter(id => S.introduced[id]).length;
        return `<details class="lesson"><summary>
          <div style="flex:1"><b>${li + 1}. ${esc(L.title)}</b><div class="small muted">${esc(L.goal)}</div></div>
          <span class="small muted">${done}/${ids.length}</span>
          <div class="progressbar meter"><i style="width:${done / ids.length * 100}%"></i></div></summary>
          <div class="body list">${ids.map(id => sentRow(id)).join("")}</div></details>`;
      }).join("")}`;
  };
  function sentRow(id, extra) {
    const st = sentStatus(id);
    return `<div class="item"><button class="btn icon ghost" data-say="${esc(id)}" title="Anhören">🔊</button>
      <div class="txt"><div class="pl">${esc(PL(id))}</div><div class="de">${esc(DE(id))}</div></div>
      <span class="badge ${st}">${STATUS_LABEL[st]}</span>${extra || ""}</div>`;
  }

  // Geschichten
  let storyId = null, storyPlaying = false, storyShowDe = false;
  function stopStory() { storyPlaying = false; }
  VIEWS.stories = function () {
    if (!storyId) {
      return `<h1>Geschichten</h1>
        <p class="muted">Verständlicher Input: kurze Texte, knapp über deinem Niveau. Erst nur hören, dann mitlesen, dann die Übersetzung prüfen. Klick auf ＋, um einen Satz in deine Karten aufzunehmen.</p>
        ${voiceWarning()}
        <div class="list card">${STORIES.map(st => `<div class="item" style="cursor:pointer" data-story="${st.id}">
          <div class="txt"><div class="pl">${esc(st.title)}</div><div class="de">${st.lines.length} Sätze · ${esc(st.level)}</div></div>
          <span class="btn ghost">Öffnen →</span></div>`).join("")}</div>`;
    }
    const st = STORIES.find(x => x.id === storyId);
    const minedSet = new Set(S.custom.map(c => c.pl));
    const isMined = l => minedSet.has(l[0].replace(/^[–—-]\s*/, ""));
    return `<div class="row"><button class="btn ghost" data-act="storyback">← Alle Geschichten</button></div>
      <h1 style="margin-top:10px">${esc(st.title)}</h1>
      <div class="row" style="margin:12px 0 16px">
        <button class="btn primary" data-act="storyplay">${storyPlaying ? "⏹ Stopp" : "▶ Alles vorlesen"}</button>
        <button class="btn" data-act="storyslow">🐢 Langsam vorlesen</button>
        <span class="spacer"></span>
        <button class="btn ghost" data-act="storyde">${storyShowDe ? "Übersetzung ausblenden" : "Übersetzung zeigen"}</button>
      </div>
      <div class="card ${storyShowDe ? "" : "hide-de"}" id="storybox">
        ${st.lines.map((l, i) => `<div class="story-line" data-line="${i}">
          <div style="flex:1"><div class="pl">${esc(l[0])}</div><div class="de">${esc(l[1])}</div></div>
          <div class="tools">
            <button class="btn icon ghost" data-act="linede" data-i="${i}" title="Übersetzung">DE</button>
            <button class="btn icon ghost" data-act="mine" data-i="${i}" title="Als Karte speichern" ${isMined(l) ? "disabled" : ""}>${isMined(l) ? "✓" : "＋"}</button>
          </div></div>`).join("")}
      </div>
      <p class="small muted" style="margin-top:12px">Klick auf einen Satz spielt ihn ab. Gut für Shadowing: Satz abspielen, Pause, laut nachsprechen.</p>`;
  };
  function playStory(rate) {
    const st = STORIES.find(x => x.id === storyId);
    storyPlaying = true; render();
    let i = 0;
    const next = () => {
      document.querySelectorAll(".story-line").forEach(el => el.classList.remove("playing"));
      if (!storyPlaying || view !== "stories" || i >= st.lines.length) { storyPlaying = false; if (view === "stories") render(); return; }
      const el = document.querySelector(`.story-line[data-line="${i}"]`);
      el && el.classList.add("playing");
      speak(st.lines[i][0], rate, () => { i++; setTimeout(next, 500); });
    };
    next();
  }

  // Shadowing
  let shadowPool = "learned", shadowId = null, shadowRes = null;
  function shadowCandidates() {
    if (shadowPool === "learned") {
      const ids = ORDER.filter(id => S.introduced[id]);
      if (ids.length) return ids;
    }
    if (shadowPool.startsWith("L")) return ORDER.filter(id => id.startsWith(shadowPool + "-"));
    return ORDER;
  }
  function nextShadow() {
    const c = shadowCandidates();
    let id = c[Math.floor(Math.random() * c.length)];
    if (c.length > 1 && id === shadowId) id = c[(c.indexOf(id) + 1) % c.length];
    shadowId = id; shadowRes = null;
    if (recUrl) { URL.revokeObjectURL(recUrl); recUrl = null; }
  }
  VIEWS.shadow = function () {
    if (!shadowId || !SENT[shadowId]) nextShadow();
    const id = shadowId;
    return `<h1>Shadowing</h1>
      <p class="muted">Sprich gleichzeitig mit der Stimme mit, wie ein Schatten. Das trainiert Aussprache, Rhythmus und Sprechtempo schneller als stilles Lernen.</p>
      ${voiceWarning()}
      <div class="row" style="margin-bottom:14px">
        <select id="shadowpool" style="max-width:320px">
          <option value="learned" ${shadowPool === "learned" ? "selected" : ""}>Meine gelernten Sätze</option>
          <option value="all" ${shadowPool === "all" ? "selected" : ""}>Alle Sätze</option>
          ${LESSONS.map((L, i) => `<option value="${L.id}" ${shadowPool === L.id ? "selected" : ""}>Lektion ${i + 1}: ${esc(L.title)}</option>`).join("")}
        </select>
        <span class="spacer"></span><span class="small muted">Heute: ${today().shadow} Sätze</span>
      </div>
      <div class="card study">
        <div class="shadow-text">${esc(PL(id))}</div>
        <div class="muted">${esc(DE(id))}</div>
        <div class="row" style="margin-top:20px">
          <button class="btn" data-act="play">▶ Normal</button>
          <button class="btn" data-act="slow">🐢 Langsam</button>
          <button class="btn" data-act="loop">🔁 3× mit Pause</button>
        </div>
        <div class="row" style="margin-top:10px">
          <button class="btn rec" id="recbtn" data-act="rec">⏺ Aufnehmen</button>
          <button class="btn" data-act="mine-play" ${recUrl ? "" : "disabled"}>▶ Meine Aufnahme</button>
          <button class="btn" data-act="compare" ${recUrl ? "" : "disabled"}>⇄ Vergleichen</button>
          ${Rec ? `<button class="btn" data-act="mic">🎙 Prüfen</button>` : ""}
        </div>
        <div id="micres">${shadowRes ? diffHtml(shadowRes) : ""}</div>
        <div class="controls row"><span class="spacer"></span><button class="btn primary" data-act="shadownext">Nächster Satz →</button></div>
      </div>
      <h2>Ablauf</h2>
      <ol class="steps">
        <li><b>Hören:</b> Einmal normal anhören, ohne mitzusprechen.</li>
        <li><b>Langsam mitsprechen:</b> 🐢 und dabei gleichzeitig laut mitreden.</li>
        <li><b>Im Tempo mitsprechen:</b> 🔁 spielt den Satz dreimal, mit Pause zum Nachsprechen.</li>
        <li><b>Aufnehmen und vergleichen:</b> Wo klingt es anders? Meist bei ś/sz, ć/cz, ę/ą und der Betonung.</li>
      </ol>`;
  };

  // Eigene Sätze
  VIEWS.mine = function () {
    return `<h1>Meine Sätze</h1>
      <p class="muted">Sentence Mining: Sätze, die dir in Serien, Podcasts, Chats oder Gesprächen begegnen, werden hier zu Karten. Eigene Sätze kommen beim Lernen zuerst dran.</p>
      <div class="card">
        <label class="f"><span>Polnisch</span><input type="text" id="m-pl" placeholder="z. B. Nie mogę się doczekać!"></label>
        <label class="f"><span>Deutsch</span><input type="text" id="m-de" placeholder="z. B. Ich kann es kaum erwarten!"></label>
        <label class="f"><span>Notiz (optional)</span><input type="text" id="m-note" placeholder="Wo gehört? Grammatik-Hinweis?"></label>
        <div class="row"><button class="btn" data-act="m-say">🔊 Probehören</button><span class="spacer"></span><button class="btn primary" data-act="m-add">Satz hinzufügen</button></div>
        <p class="small muted" style="margin:12px 0 0">Gute Sätze: kurz, mit genau einem neuen Wort, und etwas, das du selbst sagen würdest.</p>
      </div>
      <h2>${S.custom.length} eigene Sätze</h2>
      <div class="card list">${S.custom.length ? S.custom.slice().reverse().map(c =>
        sentRow(c.id, `<button class="btn icon ghost" data-del="${esc(c.id)}" title="Löschen">✕</button>`)).join("")
        : `<p class="muted" style="margin:0">Noch keine. Probier's in den <a href="#" data-view-link="stories">Geschichten</a> mit ＋.</p>`}</div>`;
  };
  function addCustom(pl, de, note) {
    pl = pl.trim(); de = de.trim();
    if (!pl || !de) { toast("Bitte Polnisch und Deutsch ausfüllen."); return false; }
    if (S.custom.some(c => c.pl === pl)) { toast("Den Satz hast du schon."); return false; }
    S.custom.push({ id: "C" + Date.now().toString(36), pl, de, note: (note || "").trim(), created: Date.now() });
    save(); buildSentences();
    return true;
  }

  // Aussprache
  VIEWS.sounds = function () {
    return `<h1>Aussprache</h1>
      <p class="muted">Polnisch wird fast so gesprochen, wie es geschrieben wird. Wenn du diese Laute kannst, kannst du jedes Wort vorlesen.</p>
      ${voiceWarning()}
      <div class="card"><table><thead><tr><th>Laut</th><th>So klingt's</th><th>Beispiel</th><th></th></tr></thead><tbody>
      ${SOUNDS.map((x, i) => `<tr><td><b style="font-size:18px">${esc(x[0])}</b></td><td>${esc(x[1])}</td>
        <td><div>${esc(x[2])}</div><div class="small muted">${esc(x[3])}</div></td>
        <td style="white-space:nowrap"><button class="btn icon ghost" data-sound="${i}">🔊</button><button class="btn icon ghost" data-sound="${i}" data-rate="0.6">🐢</button></td></tr>`).join("")}
      </tbody></table></div>
      <h2>Die drei Zisch-Reihen</h2>
      <div class="card small">
        <p>Der größte Unterschied zum Deutschen. Hör dir die Paare an und sprich sie nach:</p>
        <div class="row">${["sz – ś – s", "cz – ć – c", "ż – ź – z"].map(p => `<button class="btn" data-text="${p.replace(/ – /g, ", ")}">🔊 ${p}</button>`).join("")}</div>
        <p style="margin:12px 0 0"><b>Hart</b> (sz, cz, ż): Zunge nach hinten, Lippen leicht rund. <b>Weich</b> (ś, ć, ź): Zunge nach vorne an die Zähne, Lippen breit wie beim Lächeln.</p>
      </div>`;
  };

  // Mehr (Handy-Menü)
  VIEWS.more = function () {
    const items = [["lessons", "🗂️", "Lektionen", "Alle Sätze nach Themen"], ["sounds", "👄", "Aussprache", "Die polnischen Laute zum Anhören"],
      ["stats", "📈", "Fortschritt", "Was du schon sagen kannst"], ["settings", "⚙️", "Einstellungen", "Name, Tempo, Stimme, Sicherung"]];
    return `<h1>Mehr</h1><div class="card list more-list">${items.map(([v, i, t, d]) =>
      `<div class="item" data-view-link="${v}"><i>${i}</i><div class="txt"><div class="pl">${t}</div><div class="de">${d}</div></div><span class="muted">›</span></div>`).join("")}</div>`;
  };

  // Fortschritt
  VIEWS.stats = function () {
    const now = Date.now();
    const cards = Object.values(S.cards);
    const rev = cards.filter(c => c.state === "review");
    const mature = rev.filter(c => c.s >= 21).length;
    const introIds = Object.keys(S.introduced).filter(id => SENT[id]);
    const vocab = new Set();
    introIds.forEach(id => words(PL(id)).forEach(w => vocab.add(w)));
    const since = now - 30 * DAY;
    const recentRev = S.log.filter(l => l[0] >= since && l[3] === "review");
    const retention = recentRev.length ? Math.round(recentRev.filter(l => l[2] > 1).length / recentRev.length * 100) : null;
    // Wiederholungen der letzten 14 Tage
    const day0 = FSRS.startOfDay(now);
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const a = day0 - i * DAY, b = a + DAY;
      days.push({ n: S.log.filter(l => l[0] >= a && l[0] < b).length, d: new Date(a + 12 * 3600e3) });
    }
    const maxN = Math.max(1, ...days.map(x => x.n));
    // Vorschau nächste 7 Tage
    const fut = [];
    for (let i = 0; i < 7; i++) {
      const b = day0 + (i + 1) * DAY + 4 * 3600e3;
      const a = i === 0 ? 0 : day0 + i * DAY + 4 * 3600e3;
      fut.push({ n: cards.filter(c => !c.suspended && c.state !== "new" && c.due >= a && c.due < b).length, d: new Date(day0 + i * DAY + 12 * 3600e3) });
    }
    const maxF = Math.max(1, ...fut.map(x => x.n));
    const wd = d => d.toLocaleDateString("de-DE", { weekday: "short" }).slice(0, 2);
    const streak = (() => {
      let n = 0;
      for (let i = 0; ; i++) {
        const a = day0 - i * DAY, b = a + DAY;
        if (S.log.some(l => l[0] >= a && l[0] < b)) n++; else if (i > 0) break; else continue;
        if (i > 3650) break;
      }
      return n;
    })();
    return `<h1>Fortschritt</h1>
      <p class="muted">Keine Punkte, keine Ligen. Nur das, was zählt: Wie viel kannst du sagen und verstehen?</p>
      <div class="today">
        <div class="stat"><b>${introIds.length}</b><span>Sätze gelernt</span></div>
        <div class="stat"><b>${vocab.size}</b><span>verschiedene Wörter</span></div>
        <div class="stat"><b>${mature}</b><span>Karten gefestigt (≥ 3 Wochen)</span></div>
        <div class="stat"><b>${retention === null ? "–" : retention + " %"}</b><span>Trefferquote (30 Tage)</span></div>
        <div class="stat"><b>${rev.length}</b><span>Karten im Langzeitgedächtnis</span></div>
        <div class="stat"><b>${streak}</b><span>Tage in Folge gelernt</span></div>
      </div>
      <div class="card"><h3>Wiederholungen, letzte 14 Tage</h3>
        <div class="bars">${days.map(x => `<div class="${x.n ? "" : "zero"}" style="height:${x.n / maxN * 100}%" title="${x.n}"></div>`).join("")}</div>
        <div class="bars-labels">${days.map(x => `<span>${wd(x.d)}</span>`).join("")}</div></div>
      <div class="card"><h3>Fällig in den nächsten 7 Tagen</h3>
        <div class="bars">${fut.map(x => `<div class="${x.n ? "" : "zero"}" style="height:${x.n / maxF * 100}%" title="${x.n}"></div>`).join("")}</div>
        <div class="bars-labels">${fut.map((x, i) => `<span>${i === 0 ? "heute" : wd(x.d)} · ${x.n}</span>`).join("")}</div></div>
      <p class="small muted" style="margin-top:14px">Trefferquote um 90 % ist ideal. Deutlich darüber: Du könntest mehr neue Sätze pro Tag nehmen. Deutlich darunter: weniger neue Sätze.</p>`;
  };

  // Einstellungen
  VIEWS.settings = function () {
    const st = S.settings;
    return `<h1>Einstellungen</h1>
      <div class="card">
        <label class="f"><span>Dein Name (für „Mam na imię …“)</span><input type="text" id="s-name" value="${esc(st.name)}"></label>
        <div class="f"><span class="small muted" style="display:block;margin-bottom:4px">Wie sprichst du über dich? (byłem / byłam, zmęczony / zmęczona)</span>
          <div class="seg"><button data-gender="m" class="${st.gender !== "f" ? "on" : ""}">männliche Formen</button><button data-gender="f" class="${st.gender === "f" ? "on" : ""}">weibliche Formen</button></div></div>
        <label class="f" style="margin-top:14px"><span>Neue Sätze pro Tag (jeder Satz = 2 Karten)</span><input type="number" id="s-new" min="0" max="50" value="${st.newPerDay}"></label>
        <label class="f"><span>Ziel-Trefferquote (höher = öfter wiederholen)</span>
          <select id="s-ret">${[0.85, 0.88, 0.9, 0.92, 0.95].map(r => `<option value="${r}" ${st.retention == r ? "selected" : ""}>${Math.round(r * 100)} %</option>`).join("")}</select></label>
      </div>
      <div class="card">
        ${voiceWarning()}
        <label class="f"><span>Polnische Stimme</span><select id="s-voice"><option value="">Automatisch (beste)</option>
          ${voices.map(v => `<option value="${esc(v.name)}" ${st.voice === v.name ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
        <label class="f"><span>Sprechtempo: <b id="ratev">${st.rate}</b></span><input type="range" id="s-rate" min="0.6" max="1.3" step="0.05" value="${st.rate}" style="width:100%"></label>
        <label class="row" style="margin-bottom:10px"><input type="checkbox" id="s-auto" ${st.autoplay ? "checked" : ""}> Sätze automatisch vorlesen</label>
        <label class="row"><input type="checkbox" id="s-listentext" ${st.listenText ? "checked" : ""}> Bei Hören-Karten den Text gleich zeigen (leichter)</label>
        <div class="row" style="margin-top:14px"><button class="btn" data-text="Dzień dobry! Jak się masz? Szczęście, rzeka, cześć.">🔊 Stimme testen</button></div>
      </div>
      <div class="card">
        <h3>Daten</h3>
        <p class="small muted">Alles liegt nur in diesem Browser. Mach ab und zu eine Sicherung.</p>
        <div class="row"><button class="btn" data-act="export">⬇ Sicherung speichern</button>
          <label class="btn">⬆ Sicherung laden<input type="file" id="importfile" accept=".json,application/json" hidden></label>
          <span class="spacer"></span><button class="btn" data-act="reset" style="color:var(--bad)">Alles zurücksetzen</button></div>
      </div>`;
  };

  // ---------- Erststart ----------
  function needsSetup() { return !S.settings.gender && !$(".modal-bg"); }
  function showSetup() {
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<div class="card modal">
      <h1>Witaj! 👋</h1>
      <p class="muted">Zwei kurze Fragen, damit die Sätze zu dir passen.</p>
      <label class="f"><span>Wie heißt du?</span><input type="text" id="su-name" placeholder="Vorname"></label>
      <div class="f"><span class="small muted" style="display:block;margin-bottom:6px">Polnisch unterscheidet beim Sprechen über sich selbst: „byłem“ (Mann) oder „byłam“ (Frau). Welche Formen willst du lernen?</span>
        <div class="seg"><button data-su="m">männliche Formen</button><button data-su="f">weibliche Formen</button></div></div>
      <label class="f" style="margin-top:14px"><span>Neue Sätze pro Tag</span>
        <select id="su-new"><option value="5">5 (entspannt, ca. 10 Min.)</option><option value="8" selected>8 (empfohlen, ca. 15–20 Min.)</option><option value="12">12 (intensiv, ca. 30 Min.)</option></select></label>
      <div class="row"><span class="spacer"></span><button class="btn primary" id="su-go" disabled>Starten</button></div></div>`;
    document.body.appendChild(bg);
    let g = "";
    bg.querySelectorAll("[data-su]").forEach(b => b.onclick = () => {
      g = b.dataset.su;
      bg.querySelectorAll("[data-su]").forEach(x => x.classList.toggle("on", x === b));
      $("#su-go", bg).disabled = false;
    });
    $("#su-go", bg).onclick = () => {
      S.settings.gender = g;
      S.settings.name = $("#su-name", bg).value.trim();
      S.settings.newPerDay = +$("#su-new", bg).value;
      save(); bg.remove(); render();
    };
  }

  // ---------- Ereignisse ----------
  function curText() {
    if (view === "shadow") return PL(shadowId);
    if (!cur) return null;
    return PL(cur.type === "intro" ? cur.id : cur.card.sent);
  }
  async function doMic() {
    const target = curText();
    if (!target) return;
    const box = $("#micres");
    if (box) box.innerHTML = `<div class="heard"><span class="label">🎙 Ich höre zu … sprich jetzt.</span></div>`;
    try {
      const alts = await listen();
      const res = bestMatch(target, alts);
      if (view === "shadow") shadowRes = res; else if (cur) cur.result = res;
      if (view === "learn" && cur && cur.type === "card" && cur.card.kind === "speak" && !cur.revealed) { cur.revealed = true; render(); speak(target); return; }
      const b = $("#micres"); if (b) b.innerHTML = diffHtml(res);
    } catch (e) {
      const b = $("#micres"); if (b) b.innerHTML = `<div class="heard"><span class="label">${esc(e.message)}</span></div>`;
    }
  }
  function reveal() {
    if (!cur || cur.type !== "card" || cur.revealed) return;
    cur.revealed = true; render();
    if (cur.card.kind === "speak" && S.settings.autoplay) speak(PL(cur.card.sent));
  }
  function rate(g) {
    if (!cur || cur.type !== "card" || !cur.revealed) return;
    rateCard(cur.card, g);
    advance();
  }
  function introOk() {
    if (!cur || cur.type !== "intro") return;
    introduce(cur.id, false);
    advance();
  }

  document.addEventListener("click", e => {
    const t = e.target.closest("button, [data-story], [data-view-link], .story-line, a");
    if (!t) return;
    if (t.matches("#nav button")) return setView(t.dataset.view);
    if (t.dataset.viewLink) { e.preventDefault(); return setView(t.dataset.viewLink); }
    if (t.dataset.g) return rate(+t.dataset.g);
    if (t.dataset.say) return speak(PL(t.dataset.say));
    if (t.dataset.text) return speak(t.dataset.text);
    if (t.dataset.sound) { const x = SOUNDS[+t.dataset.sound]; return speak(x[2], +(t.dataset.rate || 1)); }
    if (t.dataset.story) { storyId = t.dataset.story; storyShowDe = false; return render(); }
    if (t.dataset.del) {
      if (!confirm("Diesen Satz und seine Karten löschen?")) return;
      const id = t.dataset.del;
      S.custom = S.custom.filter(c => c.id !== id);
      delete S.cards[id + ":speak"]; delete S.cards[id + ":listen"]; delete S.introduced[id];
      save(); buildSentences(); return render();
    }
    if (t.dataset.gender) { S.settings.gender = t.dataset.gender; save(); return render(); }
    if (t.classList.contains("story-line") && !e.target.closest("button")) {
      const st = STORIES.find(x => x.id === storyId);
      return speak(st.lines[+t.dataset.line][0]);
    }
    const a = t.dataset.act;
    if (!a) return;
    const text = curText();
    switch (a) {
      case "start": sinceNew = 0; return advance();
      case "stop": cur = null; speechSynthesis.cancel(); return render();
      case "extra": S.settings.newPerDay = (S.settings.newPerDay | 0); today().newSent = Math.max(0, today().newSent - 5); save(); return advance();
      case "play": return text && speak(text);
      case "slow": return text && speak(text, 0.65);
      case "mic": return doMic();
      case "reveal": return reveal();
      case "showtext": cur.showText = true; return render();
      case "introok": return introOk();
      case "known": introduce(cur.id, true); toast("Als bekannt markiert."); return advance();
      case "storyback": storyId = null; stopStory(); speechSynthesis.cancel(); return render();
      case "storyplay": if (storyPlaying) { stopStory(); speechSynthesis.cancel(); return render(); } return playStory(1);
      case "storyslow": stopStory(); return playStory(0.7);
      case "storyde": storyShowDe = !storyShowDe; return render();
      case "linede": { const el = t.closest(".story-line"); el.classList.toggle("show"); return; }
      case "mine": {
        const st = STORIES.find(x => x.id === storyId), l = st.lines[+t.dataset.i];
        const pl = l[0].replace(/^[–—-]\s*/, ""), de = l[1].replace(/^[–—-]\s*/, "");
        if (addCustom(pl, de, "Aus: " + st.title)) { toast("Gespeichert. Kommt beim nächsten Lernen dran."); t.textContent = "✓"; t.disabled = true; }
        return;
      }
      case "loop": {
        let n = 0;
        const go = () => { if (n++ < 3 && view === "shadow") speak(text, 1, () => setTimeout(go, Math.max(1500, text.length * 90))); };
        go(); today().shadow++; save(); return;
      }
      case "rec": return toggleRecord(t, () => { today().shadow++; save(); render(); });
      case "mine-play": return playMine();
      case "compare": return speak(text, 1, () => setTimeout(() => playMine(), 300));
      case "shadownext": nextShadow(); return render();
      case "m-say": { const v = $("#m-pl").value.trim(); return v && speak(v); }
      case "m-add":
        if (addCustom($("#m-pl").value, $("#m-de").value, $("#m-note").value)) { toast("Satz hinzugefügt."); render(); }
        return;
      case "export": {
        const blob = new Blob([JSON.stringify(S)], { type: "application/json" });
        const a2 = document.createElement("a");
        a2.href = URL.createObjectURL(blob);
        a2.download = "pololingo-sicherung-" + new Date().toISOString().slice(0, 10) + ".json";
        a2.click(); return;
      }
      case "reset":
        if (confirm("Wirklich ALLES löschen? Fortschritt und eigene Sätze sind dann weg.") && confirm("Ganz sicher?")) {
          localStorage.removeItem(KEY); S = defaults(); buildSentences(); cur = null; render();
        }
        return;
    }
  });

  document.addEventListener("change", e => {
    const t = e.target, st = S.settings;
    if (t.id === "shadowpool") { shadowPool = t.value; nextShadow(); return render(); }
    if (t.id === "s-name") st.name = t.value.trim();
    else if (t.id === "s-new") st.newPerDay = Math.max(0, Math.min(50, +t.value | 0));
    else if (t.id === "s-ret") st.retention = +t.value;
    else if (t.id === "s-voice") st.voice = t.value;
    else if (t.id === "s-auto") st.autoplay = t.checked;
    else if (t.id === "s-listentext") st.listenText = t.checked;
    else if (t.id === "s-rate") st.rate = +t.value;
    else if (t.id === "importfile") {
      const f = t.files[0]; if (!f) return;
      f.text().then(txt => {
        const d = JSON.parse(txt);
        if (!d.cards || !d.settings) throw new Error("Keine Pololingo-Sicherung.");
        S = Object.assign(defaults(), d); buildSentences(); save(); toast("Sicherung geladen."); render();
      }).catch(err => toast("Laden fehlgeschlagen: " + err.message));
      return;
    } else return;
    save();
  });
  document.addEventListener("input", e => { if (e.target.id === "s-rate") $("#ratev").textContent = e.target.value; });

  document.addEventListener("keydown", e => {
    if ((e.target.matches && e.target.matches("input, textarea, select")) || e.ctrlKey || e.metaKey || e.altKey || $(".modal-bg")) return;
    const k = e.key.toLowerCase();
    if (view === "learn" && cur) {
      if (k === " " || k === "enter") {
        e.preventDefault();
        if (cur.type === "intro") introOk(); else if (!cur.revealed) reveal(); else rate(3);
      } else if (["1", "2", "3", "4"].includes(k) && cur.type === "card" && cur.revealed) rate(+k);
      else if (k === "r") speak(curText());
      else if (k === "s") speak(curText(), 0.65);
      else if (k === "m" && Rec) doMic();
    } else if (view === "shadow") {
      if (k === "r") speak(curText()); else if (k === "s") speak(curText(), 0.65);
    }
  });

  let toastT;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => (el.hidden = true), 2600);
  }

  render();
})();
