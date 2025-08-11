// year
document.getElementById('year').textContent = new Date().getFullYear?.() || new Date().getFullYear();

// rotating taglines
const taglines = [
  "Admit the 🚩 first. Flirt second.",
  "Match by mayhem. Own your chaos.",
  "If they still want you after this… game on."
];
const tl = document.getElementById('tagline');
let ti = 0;
setInterval(() => {
  tl.classList.add('fade');
  setTimeout(() => { ti = (ti + 1) % taglines.length; tl.textContent = taglines[ti]; tl.classList.remove('fade'); }, 250);
}, 6500);

// mock profiles rail
const profiles = [
  {name:'Jamie, 27', img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80', chaos:72, badges:['Still texts ex','Drama magnet','Ghosts sometimes']},
  {name:'Andre, 31', img:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=1200&q=80', chaos:58, badges:['Financial chaos','Sleeps till 2PM']},
  {name:'Rae, 25',   img:'https://images.unsplash.com/photo-1541534401786-2077eed87a57?auto=format&fit=crop&w=1200&q=80', chaos:81, badges:['Ghosts for months','Receipts ready']},
  {name:'Leo, 29',   img:'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80', chaos:46, badges:['Commitment? eh.']},
  {name:'Maya, 26',  img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80', chaos:67, badges:['Drama magnet','Most ghosted']},
  {name:'Sam, 30',   img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80', chaos:74, badges:['Partied too hard','Second Chance Champ']},
];
const rail = document.getElementById('rail');
const fallback = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80';

function renderCard(p){
  const el = document.createElement('div'); el.className='card';
  el.innerHTML = `
    <img src="${p.img}" alt="" onerror="this.onerror=null;this.src='${fallback}'">
    <div class="body">
      <div class="top"><strong>${p.name}</strong><span class="meta">${Math.round(p.chaos/10)}/10</span></div>
      <div class="badges">
        ${p.badges.slice(0,3).map(b=>{
          const cls = /ghost|drama|party|ex|fire|chaos/i.test(b) ? 'badge red' : 'badge';
          return `<span class="${cls}">${b}</span>`;
        }).join('')}
      </div>
      <div class="meter"><div class="fill" style="width:${p.chaos}%"></div></div>
    </div>`;
  return el;
}
[...profiles, ...profiles].forEach(p => rail.appendChild(renderCard(p)));

// quiz modal
document.getElementById('openQuiz').addEventListener('click', () => {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#0008;backdrop-filter:blur(3px);z-index:60';
  modal.innerHTML = `
    <div role="dialog" aria-modal="true" style="width:min(560px,92vw);background:#13131a;border:1px solid rgba(255,255,255,.08);border-radius:16px;box-shadow:0 14px 36px rgba(0,0,0,.35);padding:18px">
      <h3 style="margin:0 0 8px">Red Flag Quiz</h3>
      <div class="q"><h4>1) Ex texts “u up?” at 2am. You…</h4>
        <label class="qopt"><input type="radio" name="q1" value="0"> Block and sleep like a saint</label>
        <label class="qopt"><input type="radio" name="q1" value="1"> Reply “who dis” (you know who dis)</label>
        <label class="qopt"><input type="radio" name="q1" value="2"> Uber there in pajamas</label>
      </div>
      <div class="q"><h4>2) Your texting style?</h4>
        <label class="qopt"><input type="radio" name="q2" value="0"> Replies within daylight hours</label>
        <label class="qopt"><input type="radio" name="q2" value="1"> Vanish for 3 days, return with memes</label>
        <label class="qopt"><input type="radio" name="q2" value="2"> Double texts, triple vibes</label>
      </div>
      <div class="q"><h4>3) First date pay?</h4>
        <label class="qopt"><input type="radio" name="q3" value="0"> Split it clean</label>
        <label class="qopt"><input type="radio" name="q3" value="1"> “Forgot” wallet (again)</label>
        <label class="qopt"><input type="radio" name="q3" value="2"> Crypto only, baby</label>
      </div>
      <div id="qResult" class="note" style="opacity:.8;margin-top:8px"></div>
      <div style="display:flex;gap:10px;margin-top:12px;justify-content:flex-end">
        <button id="closeQuiz" class="navbtn">Close</button>
        <button id="submitQuiz" class="navbtn cta" style="background:#E11D2A;border:none">See my flags</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#closeQuiz').onclick = () => modal.remove();
  modal.querySelector('#submitQuiz').onclick = () => {
    const vals = ['q1','q2','q3'].map(n => {
      const el = modal.querySelector(`input[name=${n}]:checked`); return el ? parseInt(el.value,10) : 0;
    });
    const score = vals.reduce((a,b)=>a+b,0);
    modal.querySelector('#qResult').textContent = `Your starting red flags: ${score} / 6`;
  };
});

// join form (FormSubmit feedback only)
const form = document.getElementById('joinForm'); const msg = document.getElementById('joinMsg');
form.addEventListener('submit', async (e)=>{
  e.preventDefault(); msg.textContent='Sending…';
  try{
    const res = await fetch(form.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(form)});
    if(res.ok){ form.reset(); msg.classList.remove('warn'); msg.classList.add('ok'); msg.textContent='You’re in. Check your inbox.'; }
    else{ msg.classList.remove('ok'); msg.classList.add('warn'); msg.textContent='Couldn’t send. Try again.'; }
  }catch{
    msg.classList.remove('ok'); msg.classList.add('warn'); msg.textContent='Network hiccup. Try again.';
  }
});
