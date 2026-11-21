// FSRS-5 (Free Spaced Repetition Scheduler), Standardparameter.
// Rating: 1 = Nochmal, 2 = Schwer, 3 = Gut, 4 = Leicht
(function () {
  const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
    1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const DECAY = -0.5;
  const FACTOR = 19 / 81;
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;
  const LEARN_STEPS = [1, 10];   // Minuten
  const RELEARN_STEPS = [10];    // Minuten

  const clampD = d => Math.min(10, Math.max(1, d));
  const clampS = s => Math.max(0.1, s);

  function retrievability(elapsedDays, s) {
    return Math.pow(1 + FACTOR * elapsedDays / s, DECAY);
  }
  function intervalDays(s, retention, maxIvl) {
    const ivl = s / FACTOR * (Math.pow(retention, 1 / DECAY) - 1);
    return Math.min(maxIvl, Math.max(1, Math.round(ivl)));
  }
  function initS(g) { return clampS(W[g - 1]); }
  function initD(g) { return clampD(W[4] - Math.exp(W[5] * (g - 1)) + 1); }
  function nextD(d, g) {
    const delta = -W[6] * (g - 3);
    const dp = d + delta * (10 - d) / 9;
    return clampD(W[7] * initD(4) + (1 - W[7]) * dp);
  }
  function recallS(d, s, r, g) {
    const hard = g === 2 ? W[15] : 1;
    const easy = g === 4 ? W[16] : 1;
    return clampS(s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) *
      (Math.exp(W[10] * (1 - r)) - 1) * hard * easy));
  }
  function forgetS(d, s, r) {
    const sf = W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r));
    return clampS(Math.min(sf, s));
  }
  function shortTermS(s, g) {
    return clampS(s * Math.exp(W[17] * (g - 3 + W[18])));
  }

  // Gibt eine NEUE Karte zurück (Original bleibt unverändert).
  function schedule(card, g, now, opts) {
    const retention = (opts && opts.retention) || 0.9;
    const maxIvl = (opts && opts.maxIvl) || 3650;
    const c = Object.assign({}, card);
    const elapsed = c.last ? (now - c.last) / DAY : 0;
    c.reps = (c.reps || 0) + 1;

    const graduate = () => {
      c.state = "review";
      c.step = 0;
      const days = intervalDays(c.s, retention, maxIvl);
      c.ivl = days;
      c.due = startOfDay(now) + days * DAY + 4 * 60 * MIN; // ab 4 Uhr fällig
    };

    if (c.state === "new" || !c.state) {
      c.s = initS(g);
      c.d = initD(g);
      c.state = "learning";
      c.step = 0;
      if (g === 4) graduate();
      else if (g === 1) { c.step = 0; c.due = now + LEARN_STEPS[0] * MIN; }
      else if (g === 2) { c.step = 0; c.due = now + Math.round((LEARN_STEPS[0] + LEARN_STEPS[1]) / 2) * MIN; }
      else { c.step = 1; c.due = now + LEARN_STEPS[1] * MIN; }
    } else if (c.state === "learning" || c.state === "relearning") {
      const steps = c.state === "learning" ? LEARN_STEPS : RELEARN_STEPS;
      c.d = nextD(c.d, g);
      c.s = shortTermS(c.s, g);
      if (g === 1) { c.step = 0; c.due = now + steps[0] * MIN; }
      else if (g === 2) { c.due = now + steps[Math.min(c.step, steps.length - 1)] * MIN; }
      else if (g === 4) graduate();
      else {
        c.step += 1;
        if (c.step >= steps.length) graduate();
        else c.due = now + steps[c.step] * MIN;
      }
    } else { // review
      const r = retrievability(elapsed, c.s);
      c.d = nextD(c.d, g);
      if (g === 1) {
        c.lapses = (c.lapses || 0) + 1;
        c.s = forgetS(card.d, card.s, r);
        c.state = "relearning";
        c.step = 0;
        c.due = now + RELEARN_STEPS[0] * MIN;
      } else {
        c.s = recallS(card.d, card.s, r, g);
        graduate();
      }
    }
    c.last = now;
    return c;
  }

  function startOfDay(t) {
    const d = new Date(t);
    // Lerntag beginnt um 4 Uhr nachts
    if (d.getHours() < 4) d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  // Für die Buttons: wie lange bis zur nächsten Wiederholung?
  function preview(card, now, opts) {
    const out = {};
    for (const g of [1, 2, 3, 4]) out[g] = schedule(card, g, now, opts).due - now;
    return out;
  }

  window.FSRS = { schedule, preview, retrievability, startOfDay, DAY, MIN };
})();
