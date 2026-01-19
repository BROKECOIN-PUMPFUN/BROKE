const caText = document.getElementById("caText");
const copyBtn = document.getElementById("copyCA");
const termBody = document.getElementById("termBody");
const moreVibes = document.getElementById("moreVibes");
const toggleGlitch = document.getElementById("toggleGlitch");
const year = document.getElementById("year");
const banner = document.getElementById("banner");
const sparks = document.getElementById("sparks");

year.textContent = new Date().getFullYear();

const vibes = [
  "Day 1 of being BROKE: I started calling losses 'character development'.",
  "Portfolio: 0.00\nMood: cinematic.",
  "I survived crypto and all I got was this cracked coin.",
  "If you need me, I’m in the ruins — laughing so I don’t cry.",
  "BROKE: the only coin that matches my bank account.",
  "This is not financial advice — this is emotional support.",
  "My chart is a horror movie. BROKE is the soundtrack.",
  "We don’t moon. We cope. (with memes)",
];
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function typeLine(text){
  termBody.textContent = "";
  let i = 0;
  const tick = () => { termBody.textContent = text.slice(0, i++); if (i <= text.length) requestAnimationFrame(tick); };
  tick();
}
typeLine(randomFrom(vibes));
moreVibes.addEventListener("click", () => typeLine(randomFrom(vibes)));

let glitchOn = true;
toggleGlitch.addEventListener("click", () => {
  glitchOn = !glitchOn;
  document.body.classList.toggle("no-glitch", !glitchOn);
});

copyBtn.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(caText.textContent.trim());
    const prev = copyBtn.textContent;
    copyBtn.textContent = "✅ COPIED";
    setTimeout(() => copyBtn.textContent = prev, 1200);
  }catch(e){
    alert("Copy failed. Paste manually.");
  }
});

function spawnSparks(count = 42){
  for(let i=0;i<count;i++){
    const s = document.createElement("span");
    s.className = "spark";
    s.style.left = (Math.random()*100) + "%";
    s.style.top = (Math.random()*100) + "%";
    s.style.animationDuration = (4 + Math.random()*6) + "s";
    s.style.animationDelay = (-Math.random()*6) + "s";
    s.style.opacity = (0.15 + Math.random()*0.6).toFixed(2);
    s.dataset.tint = Math.random() > 0.75 ? "red" : "neon";
    sparks.appendChild(s);
  }
}
spawnSparks();

banner.addEventListener("mousemove", (e) => {
  const r = banner.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  banner.style.transform = `perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`;
});
banner.addEventListener("mouseleave", () => {
  banner.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
});
