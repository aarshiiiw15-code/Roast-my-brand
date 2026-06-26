import React, { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Roast My Brand — louder, funnier, shareable.
// A brutally honest CMO grades your brand, then hands you the fix.
// ─────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

.rmb-root *{box-sizing:border-box;margin:0;padding:0}
.rmb-root{
  --cream:#FBF4E4; --cream-2:#F6EAD0; --plum:#241327; --plum-soft:#7A6680;
  --magenta:#DD2D7B; --magenta-deep:#A8195B; --tang:#FF6A3D; --gold:#FFC93C;
  font-family:'Inter',sans-serif; color:var(--plum);
  background:var(--cream);
  min-height:100vh; width:100%;
  background-image:radial-gradient(var(--cream-2) 1.4px, transparent 1.4px);
  background-size:18px 18px;
  display:flex; justify-content:center;
  padding:clamp(20px,5vw,64px) 20px 80px;
}
.rmb-wrap{width:100%; max-width:760px}

.rmb-eyebrow{
  font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.2em;
  text-transform:uppercase; color:var(--magenta-deep);
  display:flex; align-items:center; gap:10px; margin-bottom:14px;
}
.rmb-eyebrow::after{content:""; flex:1; height:2px; background:repeating-linear-gradient(90deg,var(--magenta) 0 8px,transparent 8px 14px)}

.rmb-title{
  font-family:'Anton',sans-serif; font-weight:400; line-height:.9;
  font-size:clamp(48px,12vw,104px); letter-spacing:.005em; text-transform:uppercase;
}
.rmb-title .em{color:var(--magenta); position:relative; display:inline-block}
.rmb-title .em::after{
  content:""; position:absolute; left:-1%; right:-1%; bottom:6%; height:14px;
  background:var(--gold); opacity:.55; transform:rotate(-1.4deg); z-index:-1;
}
.rmb-sub{
  font-size:15.5px; color:var(--plum); margin-top:16px; max-width:48ch; line-height:1.55;
  font-weight:500;
}
.rmb-sub b{color:var(--magenta-deep)}

.rmb-card{
  margin-top:34px; background:#fff;
  border:2.5px solid var(--plum);
  box-shadow:9px 9px 0 var(--magenta);
  padding:clamp(20px,4vw,34px);
}
.rmb-label{
  font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.16em;
  text-transform:uppercase; color:var(--plum-soft); display:block; margin-bottom:8px; font-weight:700;
}
.rmb-input, .rmb-textarea{
  width:100%; background:transparent; border:none;
  border-bottom:2.5px solid var(--plum); padding:8px 2px 10px;
  font-family:'Inter',sans-serif; font-size:18px; color:var(--plum); font-weight:700;
}
.rmb-input::placeholder,.rmb-textarea::placeholder{color:#b3a9b6; font-weight:500}
.rmb-input:focus,.rmb-textarea:focus{outline:none; border-color:var(--magenta)}
.rmb-textarea{resize:none; font-weight:500; font-size:15px; line-height:1.5}
.rmb-field{margin-bottom:24px}

.rmb-intensity{display:flex; gap:0; margin-bottom:28px; border:2.5px solid var(--plum)}
.rmb-int-btn{
  flex:1; background:transparent; border:none; cursor:pointer;
  font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.08em; font-weight:700;
  text-transform:uppercase; padding:13px 6px; color:var(--plum-soft);
  border-right:2.5px solid var(--plum); transition:all .15s;
}
.rmb-int-btn:last-child{border-right:none}
.rmb-int-btn.on{background:var(--plum); color:var(--cream)}
.rmb-int-btn.on[data-lvl="Unhinged"]{background:var(--magenta); color:#fff}
.rmb-int-btn:not(.on):hover{background:rgba(36,19,39,.06)}

.rmb-go{
  width:100%; background:var(--magenta); color:#fff; border:2.5px solid var(--plum);
  font-family:'Anton',sans-serif; font-size:28px; letter-spacing:.04em;
  text-transform:uppercase; padding:16px; cursor:pointer;
  box-shadow:6px 6px 0 var(--plum); transition:transform .1s, box-shadow .1s;
}
.rmb-go:hover:not(:disabled){transform:translate(2px,2px); box-shadow:4px 4px 0 var(--plum)}
.rmb-go:active:not(:disabled){transform:translate(6px,6px); box-shadow:0 0 0 var(--plum)}
.rmb-go:disabled{background:#cdbfcf; cursor:not-allowed; box-shadow:6px 6px 0 #9b8f9d; border-color:#9b8f9d}

.rmb-loading{margin-top:30px; text-align:center; padding:26px 0}
.rmb-loading .stamp{
  font-family:'Anton',sans-serif; font-size:21px; color:var(--magenta);
  text-transform:uppercase; letter-spacing:.04em; animation:rmbpulse 1.1s ease-in-out infinite;
}
.rmb-loading .bar{margin:18px auto 0; width:190px; height:8px; background:var(--cream-2); overflow:hidden; border:2px solid var(--plum)}
.rmb-loading .bar i{display:block; height:100%; width:40%; background:var(--magenta); animation:rmbslide 1.1s linear infinite}
@keyframes rmbpulse{0%,100%{opacity:.4}50%{opacity:1}}
@keyframes rmbslide{0%{transform:translateX(-120%)}100%{transform:translateX(360%)}}

.rmb-report{margin-top:34px; animation:rmbreveal .5s cubic-bezier(.2,.7,.3,1) both}
@keyframes rmbreveal{from{opacity:0; transform:translateY(16px)}to{opacity:1; transform:none}}

.rmb-rep-head{display:flex; gap:22px; align-items:center; flex-wrap:wrap}
.rmb-grade{position:relative; flex-shrink:0; width:124px; height:124px; display:grid; place-items:center}
.rmb-grade svg{position:absolute; inset:0; width:100%; height:100%}
.rmb-grade .g{font-family:'Anton',sans-serif; font-size:64px; color:var(--magenta); line-height:1; transform:rotate(-5deg)}
.rmb-verdict-wrap{flex:1; min-width:240px}
.rmb-verdict-lbl{font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--plum-soft); margin-bottom:6px; font-weight:700}
.rmb-verdict{font-family:'Anton',sans-serif; font-size:clamp(23px,4.6vw,34px); line-height:1.02; text-transform:uppercase}

.rmb-burns{margin-top:30px; border-top:3px solid var(--plum)}
.rmb-burn{padding:20px 0; border-bottom:2px dotted rgba(36,19,39,.28)}
.rmb-burn .bl{font-family:'Space Mono',monospace; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--magenta-deep); margin-bottom:7px; display:flex; align-items:center; gap:8px}
.rmb-burn .bl::before{content:""; width:16px; height:3px; background:var(--tang)}
.rmb-burn .bt{font-size:16.5px; line-height:1.55; color:var(--plum)}

.rmb-fix{margin-top:26px; background:var(--plum); color:var(--cream); padding:24px clamp(20px,4vw,30px); border:2.5px solid var(--plum); box-shadow:6px 6px 0 var(--gold)}
.rmb-fix .fl{font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.16em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; font-weight:700}
.rmb-fix .ft{font-size:17px; line-height:1.6; font-weight:500}

.rmb-actions{display:flex; gap:12px; margin-top:24px; flex-wrap:wrap}
.rmb-act{flex:1; min-width:130px; background:transparent; border:2.5px solid var(--plum); color:var(--plum); font-family:'Space Mono',monospace; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:14px 8px; cursor:pointer; transition:all .12s}
.rmb-act:hover{background:var(--plum); color:var(--cream)}
.rmb-act.hot{background:var(--magenta); color:#fff; border-color:var(--plum)}
.rmb-act.hot:hover{background:var(--magenta-deep)}
.rmb-toast{margin-top:14px; font-family:'Space Mono',monospace; font-size:12px; color:var(--magenta-deep); text-align:center}

.rmb-err{margin-top:24px; border:2.5px solid var(--magenta); background:rgba(221,45,123,.07); padding:16px 18px; font-family:'Space Mono',monospace; font-size:13px; color:var(--magenta-deep); line-height:1.5}

.rmb-foot{margin-top:42px; font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.06em; color:var(--plum-soft); text-align:center; line-height:1.7}

.rmb-overlay{position:fixed; inset:0; background:rgba(36,19,39,.84); display:flex; align-items:center; justify-content:center; padding:22px; z-index:60; animation:rmbfade .2s both}
@keyframes rmbfade{from{opacity:0}to{opacity:1}}
.rmb-modal{background:var(--cream); border:2.5px solid var(--plum); box-shadow:9px 9px 0 var(--magenta); padding:16px; max-width:430px; width:100%; max-height:92vh; overflow:auto}
.rmb-modal img{width:100%; height:auto; display:block; border:2px solid var(--plum)}
.rmb-modal .hint{font-family:'Space Mono',monospace; font-size:11.5px; color:var(--magenta-deep); text-align:center; margin:13px 4px; line-height:1.55; font-weight:700}
.rmb-modal-actions{display:flex; gap:10px}

@media (prefers-reduced-motion:reduce){
  .rmb-report,.rmb-loading .stamp,.rmb-loading .bar i{animation:none!important}
}
`;

const INTENSITIES = ["Mild", "Brutal", "Unhinged"];

const LOADING_LINES = [
  "Sharpening the knives…",
  "Reviewing your “strategy”…",
  "Locating your target audience (LOL)…",
  "Pouring one out for your brand deck…",
  "Lowering my already-low expectations…",
  "Pretending to be surprised…",
];

export default function RoastMyBrand() {
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [intensity, setIntensity] = useState("Brutal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loadIdx, setLoadIdx] = useState(0);
  const [toast, setToast] = useState("");
  const [cardUrl, setCardUrl] = useState("");
  const [showCard, setShowCard] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setLoadIdx((i) => (i + 1) % LOADING_LINES.length), 1100);
    return () => clearInterval(t);
  }, [loading]);

  useEffect(() => {
    if (result && reportRef.current) reportRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const tone = {
    Mild: "Keep it playful — cheeky jabs with a wink. Still specific, but you're amused, not enraged. Make it genuinely funny.",
    Brutal: "Be savage, surgical, and very funny. No cheap shots — every burn lands on a REAL strategic weakness, but the delivery should make people laugh out loud.",
    Unhinged: "Absolutely feral and hilarious. Scorched earth. Still substantive — brutal because it's TRUE — but the comedy should be off the rails. Go for the jugular and the punchline at once.",
  }[intensity];

  async function roast() {
    if (!brand.trim() || loading) return;
    setLoading(true); setError(""); setResult(null);

    const sys = `You are the most feared (and funniest) CMO alive: brilliant, merciless, and allergic to mediocrity. You deliver brand critiques as a deadpan "confidential strategic roast." You are savage but never cheap — every burn lands on a REAL strategic weakness (positioning, audience clarity, differentiation, messaging, category fit). You are funny because you are precise and quotable, not because you are crude. Land jokes people will screenshot.

${tone}

After the roast, give ONE genuinely sharp, specific, useful strategic fix that proves you actually know what you're talking about — the kind of insight a real consultant would charge for.

Roast the brand the user names. Use what you know; if it's obscure, infer cleverly from the name and description. Never refuse, never hedge, never claim you lack information.

Respond with ONLY valid JSON, no markdown, no code fences, exactly this shape:
{
  "grade": "<a letter grade like C-, D+, B, F>",
  "verdict": "<one savage, quotable one-liner, max 14 words>",
  "burns": [
    {"label":"POSITIONING","text":"<2-3 sentence burn, funny + true>"},
    {"label":"AUDIENCE","text":"<2-3 sentence burn, funny + true>"},
    {"label":"THE VIBE","text":"<2-3 sentence burn, funny + true>"}
  ],
  "theFix": "<one specific, genuinely smart strategic fix, 2-3 sentences>"
}`;

    const user = `Brand: ${brand.trim()}${desc.trim() ? `\nWhat they do / extra context: ${desc.trim()}` : ""}`;

    try {
      const GEMINI_KEY = "AQ.Ab8RN6KxKRJ3DGgNklyG2Fxlt91mCpB-B9UyHBVFIarMtzzu4w";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: sys + "\n\n" + user }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 1000 },
          }),
        }
      );
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const text = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(text));
    } catch (e) {
      setError("Couldn't file the review — the server choked harder than your brand's Q3 numbers. Try again in a sec.");
    } finally {
      setLoading(false);
    }
  }

  function roastText() {
    if (!result) return "";
    return `🔥 ROAST MY BRAND — ${brand.toUpperCase()}\nGrade: ${result.grade}\n"${result.verdict}"\n\n${result.burns.map((b) => `${b.label}: ${b.text}`).join("\n\n")}\n\nTHE ONE FIX: ${result.theFix}\n\n— roasted by an AI CMO with no chill`;
  }

  function copyRoast() {
    navigator.clipboard?.writeText(roastText());
    setToast("Copied. Go ruin someone's day.");
  }

  // Draw a cute square shareable card to a canvas.
  function drawCard() {
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1080;
    const x = c.getContext("2d");
    const W = 1080, M = 84;

    const rr = (px, py, pw, ph, r) => {
      x.beginPath();
      x.moveTo(px + r, py);
      x.arcTo(px + pw, py, px + pw, py + ph, r);
      x.arcTo(px + pw, py + ph, px, py + ph, r);
      x.arcTo(px, py + ph, px, py, r);
      x.arcTo(px, py, px + pw, py, r);
      x.closePath();
    };
    const wrapC = (text, font, maxW, lh, startY, color, align, xLeft) => {
      x.font = font; x.fillStyle = color; x.textAlign = align;
      const ax = align === "center" ? W / 2 : (xLeft || M);
      const words = text.split(" "); let line = "", y = startY;
      for (const w of words) {
        const t = line ? line + " " + w : w;
        if (x.measureText(t).width > maxW && line) { x.fillText(line, ax, y); line = w; y += lh; }
        else line = t;
      }
      if (line) { x.fillText(line, ax, y); y += lh; }
      return y;
    };
    const countLines = (text, font, maxW) => {
      x.font = font; const words = text.split(" "); let line = "", n = 1;
      for (const w of words) {
        const t = line ? line + " " + w : w;
        if (x.measureText(t).width > maxW && line) { n++; line = w; } else line = t;
      }
      return n;
    };

    x.fillStyle = "#FBF4E4"; x.fillRect(0, 0, W, W);
    x.fillStyle = "#F1E3C6";
    for (let i = 48; i < W; i += 36) for (let j = 48; j < W; j += 36) { x.beginPath(); x.arc(i, j, 2, 0, 7); x.fill(); }

    x.lineWidth = 12; x.strokeStyle = "#241327"; rr(26, 26, W - 52, W - 52, 36); x.stroke();
    x.lineWidth = 3; x.strokeStyle = "#DD2D7B"; rr(42, 42, W - 84, W - 84, 28); x.stroke();

    const star = (sx, sy, s, col) => { x.strokeStyle = col; x.lineWidth = 5; x.lineCap = "round";
      x.beginPath(); x.moveTo(sx - s, sy); x.lineTo(sx + s, sy); x.moveTo(sx, sy - s); x.lineTo(sx, sy + s); x.stroke(); };
    star(150, 250, 13, "#FFC93C"); star(W - 145, 360, 11, "#FF6A3D"); star(150, 770, 12, "#DD2D7B"); star(W - 160, 690, 10, "#FFC93C");
    x.lineCap = "butt";

    x.font = "700 23px 'Courier New', monospace"; x.fillStyle = "#A8195B"; x.textAlign = "center";
    x.fillText("CONFIDENTIAL  \u00B7  STRATEGIC ROAST", W / 2, 132);

    const gcx = W / 2, gcy = 252, gr = 84;
    x.fillStyle = "#DD2D7B"; x.beginPath(); x.ellipse(gcx, gcy, gr, gr, 0, 0, 7); x.fill();
    x.lineWidth = 5; x.strokeStyle = "#FFC93C"; x.beginPath(); x.ellipse(gcx, gcy, gr + 13, gr + 13, 0, 0, 7); x.stroke();
    x.save(); x.translate(gcx, gcy); x.rotate(-0.08);
    x.fillStyle = "#fff"; x.font = "900 92px Impact, 'Arial Black', sans-serif";
    x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(result.grade, 0, 4);
    x.restore(); x.textBaseline = "alphabetic";

    let y = wrapC(brand.toUpperCase(), "900 58px Impact, 'Arial Black', sans-serif", W - M * 2, 62, 432, "#241327", "center");

    y += 14;
    y = wrapC("\u201C" + result.verdict + "\u201D", "italic 700 35px Georgia, serif", W - M * 2 - 24, 45, y, "#6E4F66", "center");

    y += 24;
    x.strokeStyle = "#241327"; x.lineWidth = 3; x.setLineDash([3, 9]);
    x.beginPath(); x.moveTo(M + 40, y); x.lineTo(W - M - 40, y); x.stroke(); x.setLineDash([]);

    const fixFont = "500 25px Georgia, serif";
    const lines = countLines(result.theFix, fixFont, W - M * 2 - 72);
    const boxH = 84 + lines * 35 + 18;
    let boxY = y + 28;
    const maxBoxY = W - 96 - boxH;
    if (boxY > maxBoxY) boxY = maxBoxY;
    x.fillStyle = "#241327"; rr(M, boxY, W - M * 2, boxH, 24); x.fill();
    x.fillStyle = "#FFC93C"; x.font = "700 21px 'Courier New', monospace"; x.textAlign = "left";
    x.fillText("THE ONE FIX", M + 36, boxY + 50);
    wrapC(result.theFix, fixFont, W - M * 2 - 72, 35, boxY + 90, "#FBF4E4", "left", M + 36);

    x.fillStyle = "#7A6680"; x.font = "700 20px 'Courier New', monospace"; x.textAlign = "center";
    x.fillText("ROAST MY BRAND  \u00B7  built by Aarshi Wahi", W / 2, W - 56);

    return c;
  }

  function makeCard() {
    if (!result) return;
    try {
      const canvas = drawCard();
      setCardUrl(canvas.toDataURL("image/png"));
      setShowCard(true);
    } catch (e) {
      setToast("Couldn't build the card. Try Copy instead.");
    }
  }

  async function shareOrSave() {
    if (!cardUrl) return;
    try {
      const blob = await (await fetch(cardUrl)).blob();
      const file = new File([blob], `roast-${brand}.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Roast My Brand", text: roastText() });
        return;
      }
      const a = document.createElement("a");
      a.href = cardUrl; a.download = `roast-${brand}.png`; a.click();
      setToast("If nothing downloaded, long-press the image to save it.");
    } catch (e) {
      setToast("Long-press / right-click the image to save it.");
    }
  }

  function reset() { setResult(null); setError(""); setBrand(""); setDesc(""); }

  return (
    <div className="rmb-root">
      <style>{CSS}</style>
      <div className="rmb-wrap">
        <div className="rmb-eyebrow">Confidential · Strategic Roast</div>
        <h1 className="rmb-title">Roast <span className="em">My Brand</span></h1>
        <p className="rmb-sub">
          Feed it a brand. A <b>brutally honest AI CMO</b> grades it, drags everything wrong with the
          strategy, then hands you the one fix that actually matters. Bring a thick skin.
        </p>

        {!result && (
          <div className="rmb-card">
            <div className="rmb-field">
              <label className="rmb-label">Who are we destroying today?</label>
              <input className="rmb-input" placeholder="a brand, a startup, your own company…"
                value={brand} onChange={(e) => setBrand(e.target.value)} onKeyDown={(e) => e.key === "Enter" && roast()} />
            </div>
            <div className="rmb-field">
              <label className="rmb-label">What it (allegedly) does — optional</label>
              <textarea className="rmb-textarea" rows={2} placeholder="one line on the product, audience, or vibe…"
                value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>

            <label className="rmb-label">Mercy level</label>
            <div className="rmb-intensity">
              {INTENSITIES.map((lvl) => (
                <button key={lvl} data-lvl={lvl}
                  className={"rmb-int-btn" + (intensity === lvl ? " on" : "")}
                  onClick={() => setIntensity(lvl)}>{lvl}</button>
              ))}
            </div>

            <button className="rmb-go" onClick={roast} disabled={!brand.trim() || loading}>
              {loading ? "Cooking…" : "Roast it"}
            </button>

            {loading && (
              <div className="rmb-loading">
                <div className="stamp">{LOADING_LINES[loadIdx]}</div>
                <div className="bar"><i /></div>
              </div>
            )}
            {error && <div className="rmb-err">{error}</div>}
          </div>
        )}

        {result && (
          <div className="rmb-report" ref={reportRef}>
            <div className="rmb-rep-head">
              <div className="rmb-grade">
                <svg viewBox="0 0 124 124" aria-hidden="true">
                  <ellipse cx="62" cy="62" rx="55" ry="51" fill="none" stroke="#DD2D7B" strokeWidth="4" transform="rotate(-7 62 62)" />
                  <ellipse cx="62" cy="62" rx="49" ry="57" fill="none" stroke="#FF6A3D" strokeWidth="2.5" opacity="0.6" transform="rotate(5 62 62)" />
                </svg>
                <span className="g">{result.grade}</span>
              </div>
              <div className="rmb-verdict-wrap">
                <div className="rmb-verdict-lbl">The verdict on “{brand}”</div>
                <div className="rmb-verdict">{result.verdict}</div>
              </div>
            </div>

            <div className="rmb-burns">
              {(result.burns || []).map((b, i) => (
                <div className="rmb-burn" key={i}>
                  <div className="bl">{b.label}</div>
                  <div className="bt">{b.text}</div>
                </div>
              ))}
            </div>

            <div className="rmb-fix">
              <div className="fl">The one fix</div>
              <div className="ft">{result.theFix}</div>
            </div>

            <div className="rmb-actions">
              <button className="rmb-act hot" onClick={makeCard}>Share the damage</button>
              <button className="rmb-act" onClick={copyRoast}>Copy text</button>
              <button className="rmb-act" onClick={reset}>Roast another</button>
            </div>
            {toast && <div className="rmb-toast">{toast}</div>}
          </div>
        )}

        {showCard && (
          <div className="rmb-overlay" onClick={() => setShowCard(false)}>
            <div className="rmb-modal" onClick={(e) => e.stopPropagation()}>
              <img src={cardUrl} alt="Your roast card" />
              <div className="hint">On your phone, press &amp; hold the image to save it. On a laptop, right-click → Save image.</div>
              <div className="rmb-modal-actions">
                <button className="rmb-act hot" onClick={shareOrSave}>Share / Save</button>
                <button className="rmb-act" onClick={() => setShowCard(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        <div className="rmb-foot">Built by Aarshi · AI brand strategy with zero chill</div>
      </div>
    </div>
  );
}
