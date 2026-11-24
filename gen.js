/* 달라진 그림 찾기 — 자동 생성기
   같은 (주제, 번호, 난이도)이면 어느 기기에서나 똑같은 그림과 정답이 나옵니다. */
(function(){
const W=1600, H=1000, OL="#2d2430";let UID=0;
const PAL=["#ef5350","#ffa726","#ffd54f","#66bb6a","#42a5f5","#ab47bc","#f48fb1","#26c6da"];
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const rgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]};const cdist=(a,b)=>{const p=rgb(a),q=rgb(b);return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])};
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.round(k<0?v*(1+k):v+(255-v)*k);return"#"+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1)}
const S=`stroke="${OL}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"`;
const eye=(x,y,r=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${OL}"/><circle cx="${x+r*.35}" cy="${y-r*.35}" r="${r*.35}" fill="#fff"/>`;
const star5=(r,ri)=>{let p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?ri:r;p.push((Math.cos(a)*q).toFixed(1)+","+(Math.sin(a)*q).toFixed(1))}return p.join(" ")};

/* ---------- 아이콘: (-50..50) 상자 안에 그림, 선반용은 바닥이 y=50 ---------- */
const I={
 /* 장난감 선반 */
 cup:c=>`<path d="M-22 -5h40v40a12 12 0 0 1-12 12h-16a12 12 0 0 1-12-12z" fill="${c}" ${S}/><path d="M18 5a12 12 0 0 1 0 24" fill="none" ${S} stroke-width="6"/><path d="M18 5a12 12 0 0 1 0 24" fill="none" stroke="${c}" stroke-width="2"/><polygon points="${star5(8,3.5)}" transform="translate(-2 20)" fill="#fff"/>`,
 plant:c=>`<circle cx="-14" cy="-22" r="12" fill="#66bb6a" ${S}/><circle cx="14" cy="-26" r="12" fill="#66bb6a" ${S}/><path d="M0 8V-36M0 -10L-14 -22M0 -14L14 -26" ${S} fill="none"/><circle cx="0" cy="-38" r="9" fill="#81c784" ${S}/><path d="M-24 8h48l-7 42h-34z" fill="${c}" ${S}/>`,
 clock:c=>`<circle cx="0" cy="8" r="36" fill="${c}" ${S}/><circle cx="0" cy="8" r="27" fill="#fff8ec" ${S}/><path d="M0 8V-9M0 8l12 6" ${S}/><path d="M-26 44l8-10M26 44l-8-10" ${S}/><circle cx="-26" cy="-26" r="8" fill="${c}" ${S}/><circle cx="26" cy="-26" r="8" fill="${c}" ${S}/>`,
 gift:c=>`<rect x="-30" y="-8" width="60" height="58" rx="4" fill="${c}" ${S}/><rect x="-34" y="-18" width="68" height="14" rx="3" fill="${shade(c,-.15)}" ${S}/><rect x="-6" y="-18" width="12" height="68" fill="#fff" ${S}/><path d="M0 -18c-18-22-30-4-14 0M0 -18c18-22 30-4 14 0" fill="#fff" ${S}/>`,
 books:c=>`<rect x="-34" y="30" width="68" height="20" rx="3" fill="${c}" ${S}/><rect x="-28" y="10" width="58" height="20" rx="3" fill="#90a4ae" ${S}/><rect x="-32" y="-10" width="62" height="20" rx="3" fill="${shade(c,.35)}" ${S}/><path d="M-26 40h44M-20 20h40" stroke="#fff" stroke-width="3"/>`,
 ball:c=>`<circle cx="0" cy="16" r="34" fill="${c}" ${S}/><path d="M-33 8c20 10 46 10 66 0" fill="none" stroke="#fff" stroke-width="7"/><path d="M-33 8c20 10 46 10 66 0" fill="none" ${S}/><circle cx="-12" cy="-2" r="6" fill="#ffffff88"/>`,
 lamp:c=>`<path d="M-22 -40h44l12 34h-68z" fill="${c}" ${S}/><path d="M0 -6v44" ${S} stroke-width="6"/><rect x="-20" y="38" width="40" height="12" rx="5" fill="${shade(c,-.25)}" ${S}/>`,
 duck:c=>`<path d="M-36 20c0-22 20-26 34-20 4-30 40-30 40-2 0 10-8 16-14 18 10 8 8 34-26 34-26 0-34-14-34-30z" fill="${c}" ${S}/><path d="M38 -6l16 4-16 6z" fill="#ff7043" ${S}/>${eye(24,-10)}<path d="M-14 22c8 10 22 10 26 0" fill="none" ${S}/>`,
 robot:c=>`<rect x="-26" y="-20" width="52" height="40" rx="8" fill="${c}" ${S}/><path d="M0 -20v-14" ${S}/><circle cx="0" cy="-38" r="6" fill="#ff7043" ${S}/>${eye(-11,-2,6)}${eye(11,-2,6)}<rect x="-18" y="22" width="36" height="28" rx="5" fill="${shade(c,-.2)}" ${S}/><circle cx="0" cy="36" r="5" fill="#ffd54f" ${S}/>`,
 trophy:c=>`<path d="M-24 -40h48v14a24 24 0 0 1-48 0z" fill="${c}" ${S}/><path d="M-24 -32h-12a12 14 0 0 0 16 20M24 -32h12a12 14 0 0 1-16 20" fill="none" ${S}/><path d="M-6 -4h12v26h-12z" fill="${shade(c,-.2)}" ${S}/><rect x="-22" y="22" width="44" height="28" rx="4" fill="#8d6e63" ${S}/><polygon points="${star5(9,4)}" transform="translate(0 -24)" fill="#fff"/>`,
 vase:c=>`<path d="M-14 -16h28c0 12 14 18 14 40s-14 26-28 26-28-6-28-26 14-28 14-40z" fill="${c}" ${S}/><path d="M-6 -16c-6-14-14-18-14-30M6 -16c4-12 14-18 20-26" fill="none" ${S}/><circle cx="-20" cy="-46" r="7" fill="#f48fb1" ${S}/><circle cx="20" cy="-42" r="7" fill="#ffd54f" ${S}/><path d="M-20 20h40" stroke="#fff" stroke-width="4"/>`,
 /* 빵집 */
 cupcake:c=>`<path d="M-28 6h56l-8 44h-40z" fill="${c}" ${S}/><path d="M-18 6l3 44M0 6v44M18 6l-3 44" stroke="${shade(c,-.25)}" stroke-width="3"/><path d="M-32 8c-8-22 12-26 16-24 2-16 30-16 32 0 6-2 24 2 16 24z" fill="#fff6f0" ${S}/><circle cx="0" cy="-30" r="8" fill="#e53935" ${S}/>`,
 donut:c=>`<ellipse cx="0" cy="24" rx="40" ry="26" fill="#d7a26b" ${S}/><path d="M-36 18c0-18 72-18 72 0 0 10-10 8-14 14-6-6-12 2-20-2-10 6-14-4-24 0-6-6-14 0-14-12z" fill="${c}" ${S}/><ellipse cx="0" cy="16" rx="12" ry="6" fill="#fff8ec" ${S}/><path d="M-22 10l5-3M18 6l4 4M-4 2l5 1M8 22l4-3M-18 22l5 2" stroke="#fff" stroke-width="3.5"/>`,
 cake:c=>`<path d="M-40 50V8L36 -14V50z" fill="#fff3e0" ${S}/><path d="M-40 8L36 -14V4L-40 26z" fill="${c}" ${S}/><path d="M-40 38h76" stroke="${c}" stroke-width="8"/><circle cx="20" cy="-22" r="8" fill="#e53935" ${S}/>`,
 croissant:c=>`<path d="M-46 30c6-40 86-40 92 0-10 4-16-6-22-4-4-14-12-16-24-16s-20 2-24 16c-6-2-12 8-22 4z" fill="${c}" ${S}/><path d="M-20 10l6 16M0 4v18M20 10l-6 16" ${S}/>`,
 macaron:c=>`<ellipse cx="0" cy="34" rx="34" ry="14" fill="${c}" ${S}/><rect x="-32" y="14" width="64" height="12" rx="6" fill="#fff8ec" ${S}/><ellipse cx="0" cy="6" rx="34" ry="14" fill="${c}" ${S}/><ellipse cx="-10" cy="2" rx="10" ry="4" fill="#ffffff66"/>`,
 bread:c=>`<path d="M-44 50v-40c0-28 88-28 88 0v40z" fill="${c}" ${S}/><path d="M-26 -8l12 16M-4 -12l12 16M18 -8l12 16" stroke="${shade(c,.45)}" stroke-width="5" stroke-linecap="round"/>`,
 lolli:c=>`<path d="M0 50V0" stroke="#fff" stroke-width="7"/><path d="M0 50V0" ${S} stroke-width="1.5"/><circle cx="0" cy="-16" r="30" fill="${c}" ${S}/><path d="M0 -16m-18 0a18 18 0 1 1 18 18a10 10 0 1 1-10-10" fill="none" stroke="#fff" stroke-width="5"/>`,
 cone:c=>`<path d="M-22 4L0 50L22 4z" fill="#e0a96d" ${S}/><path d="M-14 12l20 20M-4 4l22 20M10 6L-10 30" stroke="#b07a45" stroke-width="2.5"/><circle cx="0" cy="-14" r="26" fill="${c}" ${S}/><circle cx="8" cy="-40" r="7" fill="#e53935" ${S}/>`,
 cookie:c=>`<circle cx="0" cy="18" r="32" fill="${c}" ${S}/><circle cx="-12" cy="8" r="5" fill="#5d4037"/><circle cx="10" cy="4" r="4" fill="#5d4037"/><circle cx="12" cy="26" r="5" fill="#5d4037"/><circle cx="-8" cy="32" r="4" fill="#5d4037"/>`,
 /* 바다 */
 fish:c=>`<path d="M-40 0c14-30 52-30 64 0-12 30-50 30-64 0z" fill="${c}" ${S}/><path d="M24 0l22-20v40z" fill="${shade(c,-.2)}" ${S}/><path d="M-4 -24c6 8 6 40 0 48" fill="none" stroke="${shade(c,.4)}" stroke-width="4"/>${eye(-24,-4,5)}`,
 starfish:c=>`<polygon points="${star5(44,18)}" fill="${c}" ${S}/><circle cx="-8" cy="-6" r="3" fill="#fff"/><circle cx="8" cy="2" r="3" fill="#fff"/><circle cx="-2" cy="12" r="3" fill="#fff"/>`,
 shell:c=>`<path d="M0 30L-40 -6a40 40 0 0 1 80 0z" fill="${c}" ${S}/><path d="M0 30L-22 -26M0 30V-30M0 30L22 -26M0 30L-36 -12M0 30L36 -12" ${S} fill="none"/><rect x="-10" y="26" width="20" height="10" rx="3" fill="${shade(c,-.2)}" ${S}/>`,
 crab:c=>`<ellipse cx="0" cy="8" rx="32" ry="20" fill="${c}" ${S}/><path d="M-24 22l-14 14M-14 26l-8 16M24 22l14 14M14 26l8 16" ${S}/><path d="M-26 -4l-14-18M26 -4l14-18" ${S}/><path d="M-50 -34a12 12 0 1 1 20 10l-8-6z" fill="${c}" ${S}/><path d="M50 -34a12 12 0 1 0-20 10l8-6z" fill="${c}" ${S}/><path d="M-10 -10v-12M10 -10v-12" ${S}/>${eye(-10,-24)}${eye(10,-24)}`,
 octopus:c=>`<path d="M-30 0a30 32 0 0 1 60 0v8c0 6 10 16 4 28-8-6-8-16-16-14 0 10-2 18-10 20-4-8 0-16-8-18-8 2-4 10-8 18-8-2-10-10-10-20-8-2-8 8-16 14-6-12 4-22 4-28z" fill="${c}" ${S}/>${eye(-10,-2,6)}${eye(10,-2,6)}<circle cx="-20" cy="10" r="4" fill="#ff8a80"/><circle cx="20" cy="10" r="4" fill="#ff8a80"/>`,
 jelly:c=>`<path d="M-34 0a34 32 0 0 1 68 0c-6 6-10-2-17 4-6-6-11 2-17-2-6 4-11-4-17 2-7-6-11 2-17-4z" fill="${c}" fill-opacity=".85" ${S}/><path d="M-20 6c-6 14 6 22-2 40M-6 6c4 14-6 24 2 40M8 6c-4 14 6 24-2 40M22 6c6 14-6 22 2 40" fill="none" ${S} stroke="${shade(c,-.3)}"/>${eye(-10,-10,4)}${eye(10,-10,4)}`,
 turtle:c=>`<ellipse cx="34" cy="-4" rx="14" ry="11" fill="#a5d6a7" ${S}/><path d="M-26 18l-14 16M18 18l12 16M-22 -18l-14-14M14 -20l12-14" stroke="#a5d6a7" stroke-width="12" stroke-linecap="round"/><ellipse cx="-4" cy="0" rx="34" ry="26" fill="${c}" ${S}/><path d="M-4 -26v52M-36 0h64M-22 -18l36 36M14 -18l-36 36" stroke="${shade(c,-.25)}" stroke-width="3"/>${eye(38,-6,3.5)}`,
 coral:c=>`<path d="M-4 50V10c0-14-20-14-20-34M-4 18c0-16 22-10 22-32M-4 30c-14 0-28-8-28-26M18 -14c0-10 10-12 10-24M-24 -24c0-8-8-10-8-20" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/><path d="M-4 50V10" fill="none" ${S}/>`,
 weed:c=>`<path d="M-8 50c-12-20 10-30-2-52s8-30 2-46" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/><path d="M12 50c-8-16 10-24 2-42" fill="none" stroke="${shade(c,-.2)}" stroke-width="10" stroke-linecap="round"/>`,
 /* 우주 */
 planet:c=>`<circle cx="0" cy="0" r="30" fill="${c}" ${S}/><path d="M-22 -8c14 4 30 4 44 0M-26 10c18 4 34 4 50 0" stroke="${shade(c,-.2)}" stroke-width="5" fill="none"/><ellipse cx="0" cy="4" rx="50" ry="12" fill="none" stroke="${shade(c,.4)}" stroke-width="7" transform="rotate(-14)"/>`,
 rocket:c=>`<path d="M0 -48c22 18 22 52 14 74h-28c-8-22-8-56 14-74z" fill="#eceff1" ${S}/><path d="M-14 26l-16 18 4-26zM14 26l16 18-4-26z" fill="${c}" ${S}/><circle cx="0" cy="-8" r="10" fill="#81d4fa" ${S}/><path d="M-10 28l10 22 10-22z" fill="#ffa726" ${S}/><path d="M-12 -30h24" stroke="${c}" stroke-width="7"/>`,
 star:c=>`<polygon points="${star5(42,18)}" fill="${c}" ${S}/>${eye(-8,0,4)}${eye(8,0,4)}<path d="M-5 10q5 5 10 0" fill="none" ${S} stroke-width="2.5"/>`,
 astro:c=>`<rect x="-24" y="0" width="48" height="40" rx="14" fill="#fafafa" ${S}/><circle cx="0" cy="-16" r="28" fill="#fafafa" ${S}/><rect x="-20" y="-28" width="40" height="24" rx="12" fill="${c}" ${S}/><path d="M-24 10l-18 10M24 10l14-16" stroke="#fafafa" stroke-width="12" stroke-linecap="round"/><rect x="-10" y="12" width="20" height="12" rx="3" fill="${shade(c,.3)}" ${S}/><path d="M-12 -22h8" stroke="#fff" stroke-width="4"/>`,
 ufo:c=>`<path d="M-18 -6a18 18 0 0 1 36 0z" fill="#b3e5fc" ${S}/><ellipse cx="0" cy="4" rx="46" ry="14" fill="${c}" ${S}/><circle cx="-24" cy="4" r="4" fill="#ffd54f"/><circle cx="0" cy="8" r="4" fill="#ffd54f"/><circle cx="24" cy="4" r="4" fill="#ffd54f"/><path d="M-14 18l-10 26h48l-10-26z" fill="#fff59d" opacity=".45"/>`,
 moon:c=>`<path d="M10 -40a40 40 0 1 0 22 70a32 32 0 1 1-22-70z" fill="${c}" ${S}/><circle cx="-10" cy="16" r="5" fill="${shade(c,-.15)}"/>`,
 comet:c=>`<path d="M14 -10L-44 -30M14 0L-48 4M14 10L-40 30" stroke="${shade(c,.4)}" stroke-width="8" stroke-linecap="round"/><circle cx="20" cy="0" r="20" fill="${c}" ${S}/>`,
 sat:c=>`<rect x="-46" y="-12" width="28" height="24" fill="${c}" ${S}/><rect x="18" y="-12" width="28" height="24" fill="${c}" ${S}/><path d="M-18 0h36M-32 -12v24M32 -12v24" ${S}/><rect x="-12" y="-14" width="24" height="28" rx="4" fill="#cfd8dc" ${S}/><path d="M0 -14v-14" ${S}/><circle cx="0" cy="-30" r="5" fill="#ef5350" ${S}/>`,
 /* 정원 */
 flower:c=>`<path d="M0 50V0" stroke="#43a047" stroke-width="6"/><path d="M0 34c-14-4-20-14-18-20 10 0 18 8 18 20z" fill="#66bb6a" ${S}/>${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-31" rx="11" ry="15" fill="${c}" ${S} transform="rotate(${a} 0 -14)"/>`).join("")}<circle cx="0" cy="-14" r="10" fill="#ffd54f" ${S}/>`,
 tulip:c=>`<path d="M0 50V-6" stroke="#43a047" stroke-width="6"/><path d="M0 40c-2-18-18-22-24-20 2 14 12 20 24 20z" fill="#66bb6a" ${S}/><path d="M-20 -36l10 10 10-14 10 14 10-10v20c0 14-10 22-20 22s-20-8-20-22z" fill="${c}" ${S}/>`,
 butterfly:c=>`<path d="M0 -4c-10-30-44-30-40-6 2 14 28 12 40 6zM0 -4c10-30 44-30 40-6-2 14-28 12-40 6zM0 0c-6 16-30 30-32 14-2-12 22-14 32-14zM0 0c6 16 30 30 32 14 2-12-22-14-32-14z" fill="${c}" ${S}/><ellipse cx="0" cy="0" rx="5" ry="20" fill="${OL}"/><path d="M-2 -18l-8-14M2 -18l8-14" ${S}/><circle cx="-24" cy="-14" r="5" fill="#fff"/><circle cx="24" cy="-14" r="5" fill="#fff"/>`,
 mushroom:c=>`<path d="M-12 10h24l4 40h-32z" fill="#fff8ec" ${S}/><path d="M-42 12c0-34 84-34 84 0z" fill="${c}" ${S}/><circle cx="-18" cy="-4" r="6" fill="#fff"/><circle cx="8" cy="-12" r="5" fill="#fff"/><circle cx="24" cy="2" r="5" fill="#fff"/>`,
 ladybug:c=>`<circle cx="30" cy="4" r="12" fill="${OL}"/><ellipse cx="0" cy="4" rx="32" ry="26" fill="${c}" ${S}/><path d="M28 4H-32" ${S}/><circle cx="-12" cy="-8" r="5" fill="${OL}"/><circle cx="10" cy="-10" r="5" fill="${OL}"/><circle cx="-14" cy="16" r="5" fill="${OL}"/><circle cx="12" cy="18" r="5" fill="${OL}"/><path d="M36 -6l8-12M38 2l12-6" ${S}/>`,
 snail:c=>`<path d="M-44 40h70c12 0 16-8 16-14V8" fill="#ffe0b2" ${S} stroke-width="3.5"/><path d="M42 8l-4-18M46 10l8-16" ${S}/><circle cx="-6" cy="10" r="30" fill="${c}" ${S}/><path d="M-6 10m0-18a18 18 0 1 1-18 18a10 10 0 1 1 10 10" fill="none" ${S}/>`,
 bird:c=>`<path d="M-36 4c0-26 34-36 52-16 10-2 18 2 22 8l-14 4c4 22-16 36-38 34-14-2-22-14-22-30z" fill="${c}" ${S}/><path d="M-36 0l-14-10 2 20z" fill="${shade(c,-.2)}" ${S}/><path d="M-14 6c10 18 26 12 26 0z" fill="${shade(c,.35)}" ${S}/>${eye(12,-8,4)}<path d="M38 -4l12 4-12 4z" fill="#ffa726" ${S}/>`,
 bee:c=>`<ellipse cx="-6" cy="-24" rx="14" ry="18" fill="#e3f2fd" ${S} transform="rotate(-20 -6 -24)"/><ellipse cx="12" cy="-22" rx="12" ry="16" fill="#e3f2fd" ${S} transform="rotate(20 12 -22)"/><ellipse cx="0" cy="4" rx="34" ry="24" fill="${c}" ${S}/><path d="M-10 -18v44M8 -18v44" stroke="${OL}" stroke-width="8"/><path d="M-34 4l-12 0" ${S}/>${eye(22,-2,4)}`,
 cloud:c=>`<path d="M-40 20a16 16 0 0 1 4-30a22 22 0 0 1 40-8a18 18 0 0 1 32 16a14 14 0 0 1 0 22z" fill="${c}" ${S}/>`,
 /* 밤 도시 */
 win:c=>`<rect x="-40" y="-40" width="80" height="80" rx="6" fill="${c}" ${S}/><path d="M0 -40v80M-40 0h80" stroke="${OL}" stroke-width="5"/>`,
 cat:c=>`<path d="M-26 40c-4-30 6-48 26-48s30 18 26 48z" fill="${c}" ${S}/><path d="M-20 -14l-2-22 14 12M20 -14l2-22-14 12" fill="${c}" ${S}/><circle cx="0" cy="-14" r="20" fill="${c}" ${S}/><circle cx="-7" cy="-16" r="3.5" fill="#ffd54f"/><circle cx="7" cy="-16" r="3.5" fill="#ffd54f"/><path d="M26 34c18 0 22-18 14-26" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
 balloon:c=>`<path d="M0 22c-4 10 4 18-2 28" fill="none" ${S} stroke-width="2"/><ellipse cx="0" cy="-12" rx="26" ry="32" fill="${c}" ${S}/><path d="M-5 20h10l-5-6z" fill="${c}" ${S}/><ellipse cx="-10" cy="-24" rx="6" ry="10" fill="#ffffff66"/>`
};
const ASYM=new Set(["cup","duck","cake","fish","crab","turtle","comet","moon","snail","bird","bee","ladybug","cat","planet"]);

/* ---------- 주제 ---------- */
const THEMES={
 shelf:{name:"장난감 선반",layout:"shelf",icons:["cup","plant","clock","gift","books","ball","lamp","duck","robot","trophy","vase"],
  bg:()=>`<rect width="${W}" height="${H}" fill="#2b2140"/><rect x="60" y="50" width="1480" height="900" rx="26" fill="#6d4c41"/><rect x="84" y="74" width="1432" height="852" rx="14" fill="#e9a98c"/>${Array.from({length:24},(_,i)=>`<path d="M${130+i*58} 74v852" stroke="#d9927a" stroke-width="3"/>`).join("")}`,
  shelfC:"#8d5a3b",rows:[300,580,880],x0:150,x1:1450},
 bakery:{name:"빵집 진열대",layout:"shelf",icons:["cupcake","donut","cake","croissant","macaron","bread","lolli","cone","cookie"],
  colors:["#f06292","#ffb74d","#ba68c8","#4dd0e1","#81c784","#fff176","#a1887f","#ffffff"],
  bg:()=>`<rect width="${W}" height="${H}" fill="#fff1e6"/>${Array.from({length:16},(_,i)=>`<path d="M${i*100} 0h50l-10 60h-30z" fill="${i%2?"#f06292":"#fff"}"/>`).join("")}<rect x="0" y="56" width="${W}" height="8" fill="#c2185b"/><rect x="70" y="100" width="1460" height="860" rx="24" fill="#c8e6f5" stroke="#90a4ae" stroke-width="10"/><rect x="90" y="120" width="1420" height="820" rx="14" fill="#eaf6fd"/><path d="M180 160l140 640M520 160l100 400" stroke="#ffffff" stroke-width="26" opacity=".6"/>`,
  shelfC:"#b0bec5",rows:[360,640,910],x0:170,x1:1430},
 sea:{name:"바다 속",layout:"scatter",icons:["fish","fish","starfish","shell","crab","octopus","jelly","turtle","coral","weed"],
  zones:{any:[90,80,1510,820]},
  bg:r=>`<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fc3f7"/><stop offset="1" stop-color="#01579b"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#sea)"/><path d="M200 0l120 700M560 0l60 600M1000 0l-40 650M1300 0l-120 700" stroke="#fff" stroke-width="60" opacity=".07"/><path d="M0 880c200-50 400 20 600-10s500-40 1000 10V1000H0z" fill="#ffe0a3"/><path d="M0 920c300-30 500 20 800 0s500-10 800 10" stroke="#f2c97d" stroke-width="10" fill="none"/>${Array.from({length:14},()=>`<circle cx="${Math.round(r()*W)}" cy="${Math.round(r()*700+60)}" r="${Math.round(r()*5+3)}" fill="none" stroke="#e1f5fe" stroke-width="2" opacity=".6"/>`).join("")}`},
 space:{name:"우주",layout:"scatter",icons:["planet","rocket","star","astro","ufo","moon","comet","sat","star","planet"],
  zones:{any:[90,80,1510,920]},
  bg:r=>`<defs><radialGradient id="sp" cx=".3" cy=".3" r="1"><stop offset="0" stop-color="#3a2a7a"/><stop offset="1" stop-color="#0b0d2a"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#sp)"/>${Array.from({length:70},()=>`<circle cx="${Math.round(r()*W)}" cy="${Math.round(r()*H)}" r="${(r()*1.8+.8).toFixed(1)}" fill="#fff" opacity="${(r()*.5+.3).toFixed(2)}"/>`).join("")}<ellipse cx="1300" cy="1180" rx="700" ry="300" fill="#7e57c2" opacity=".35"/>`},
 garden:{name:"꽃밭",layout:"scatter",icons:["flower","flower","tulip","mushroom","ladybug","snail","butterfly","bird","bee","cloud"],
  zones:{sky:[120,90,1480,380],ground:[110,470,1490,930]},zoneOf:{butterfly:"sky",bird:"sky",bee:"sky",cloud:"sky"},
  colors:["#ef5350","#ffa726","#ffd54f","#ab47bc","#42a5f5","#f48fb1","#ffffff","#26c6da"],
  bg:()=>`<rect width="${W}" height="${H}" fill="#bde3fb"/><circle cx="1460" cy="110" r="70" fill="#ffe082"/><path d="M0 470c300-90 600-60 900-20s500-40 700-30V1000H0z" fill="#9ccc65"/><path d="M0 600c400-60 900 20 1600-40V1000H0z" fill="#7cb342"/><path d="M0 520h${W}" stroke="#a1887f" stroke-width="0"/>${Array.from({length:17},(_,i)=>`<rect x="${i*100+10}" y="420" width="22" height="80" rx="4" fill="#fff8e1" stroke="#bcaaa4" stroke-width="3"/>`).join("")}<rect x="0" y="440" width="${W}" height="12" fill="#fff8e1"/><rect x="0" y="474" width="${W}" height="12" fill="#fff8e1"/>`},
 city:{name:"밤의 도시",layout:"city",icons:["star","moon","ufo","balloon","comet","cat"],
  zones:{any:[100,70,1500,330]}}
};
const THEME_ORDER=["shelf","bakery","sea","space","garden","city"];

/* ---------- 배치 ---------- */
function farFrom(list,x,y,d){return list.every(o=>Math.hypot(o.x-x,o.y-y)>=d)}
function layoutShelf(T,r,dense,pal){
  const items=[],slots=[];const n=dense?6:5;
  T.rows.forEach(rowY=>{const step=(T.x1-T.x0)/(n-1);for(let i=0;i<n;i++)slots.push({x:Math.round(T.x0+i*step+(r()-.5)*40),y:rowY,s:dense?135:150})});
  const fill=dense?.8:.72;
  slots.forEach(sl=>{if(r()<fill)items.push({t:T.icons[Math.floor(r()*T.icons.length)],c:pal[Math.floor(r()*pal.length)],x:sl.x,y:sl.y-sl.s/2,s:sl.s,f:r()<.5,slot:sl})});
  const free=slots.filter(sl=>!items.some(it=>it.slot===sl));
  return {items,free:free.map(sl=>({x:sl.x,y:sl.y-sl.s/2,s:sl.s}))};
}
function layoutScatter(T,r,count,pal){
  const items=[];let tries=0;
  while(items.length<count&&tries<4000){tries++;
    const t=T.icons[Math.floor(r()*T.icons.length)], z=T.zones[(T.zoneOf&&T.zoneOf[t])||(T.zones.ground?"ground":"any")];
    const s=Math.round(110+r()*60), x=z[0]+r()*(z[2]-z[0]), y=z[1]+r()*(z[3]-z[1]);
    if(farFrom(items,x,y,(s+150)/2+8)) items.push({t,c:pal[Math.floor(r()*pal.length)],x:Math.round(x),y:Math.round(y),s,f:r()<.5});
  }
  const free=[];tries=0;
  while(free.length<8&&tries<3000){tries++;
    const t=T.icons[Math.floor(r()*T.icons.length)], zk=(T.zoneOf&&T.zoneOf[t])||(T.zones.ground?"ground":"any"), z=T.zones[zk];
    const x=z[0]+r()*(z[2]-z[0]), y=z[1]+r()*(z[3]-z[1]);
    if(farFrom(items,x,y,150)&&farFrom(free,x,y,170)) free.push({x:Math.round(x),y:Math.round(y),s:130,t});
  }
  return {items,free};
}
function layoutCity(T,r,dense){
  const items=[],bld=[];let x=40;const cols=["#37474f","#455a64","#4e342e","#3e2f5b","#263f5a"];
  while(1560-x>=150){let w=Math.round(170+r()*90);if(1560-x-w<150)w=1560-x;const h=Math.round(380+r()*260),c=cols[Math.floor(r()*cols.length)];bld.push({x,w,h,c});x+=w+Math.round(10+r()*20)}
  const winS=dense?44:54;
  bld.forEach(b=>{const top=H-b.h,nc=Math.max(2,Math.floor((b.w-30)/(winS*1.6))),nr=Math.floor((b.h-70)/(winS*1.7));
    for(let i=0;i<nc;i++)for(let j=0;j<nr;j++){const wx=b.x+(b.w-(nc-1)*winS*1.6)/2+i*winS*1.6,wy=top+50+j*winS*1.7;if(wy>H-60)continue;items.push({t:"win",c:r()<.55?"#ffd76a":"#22304a",x:Math.round(wx),y:Math.round(wy),s:winS,f:false,win:1})}});
  let tries=0;const sky=[];
  while(sky.length<(dense?7:5)&&tries<2000){tries++;const t=T.icons[Math.floor(r()*(T.icons.length-1))],z=T.zones.any,s=Math.round(100+r()*40),x=z[0]+r()*(z[2]-z[0]),y=z[1]+r()*(z[3]-z[1]);
    const roof=Math.min(...bld.filter(b=>x>b.x-60&&x<b.x+b.w+60).map(b=>H-b.h));
    if(y+s/2<roof-10&&farFrom(sky,x,y,s+20))sky.push({t,c:t==="moon"?"#fff3b0":t==="star"?"#ffe066":PAL[Math.floor(r()*PAL.length)],x:Math.round(x),y:Math.round(y),s,f:r()<.5})}
  const b=bld[Math.floor(r()*bld.length)];sky.push({t:"cat",c:"#1b1b22",x:Math.round(b.x+b.w*(.3+r()*.4)),y:H-b.h-50,s:100,f:r()<.5});
  const r2=rng(7);
  const bg=`<defs><linearGradient id="nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1240"/><stop offset="1" stop-color="#4a2d6b"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#nt)"/>${Array.from({length:50},()=>`<circle cx="${Math.round(r2()*W)}" cy="${Math.round(r2()*500)}" r="1.6" fill="#fff" opacity=".6"/>`).join("")}${bld.map(b=>`<rect x="${b.x}" y="${H-b.h}" width="${b.w}" height="${b.h+20}" rx="6" fill="${b.c}" stroke="${OL}" stroke-width="5"/>`).join("")}`;
  return {items:items.concat(sky),free:[],bg,sky};
}

/* ---------- 달라진 곳 만들기 ---------- */
const DIFF={easy:{n:3,kinds:["remove","add","swap"],label:"쉬움"},normal:{n:4,kinds:["remove","add","swap","recolor"],label:"보통"},hard:{n:5,kinds:["remove","add","swap","recolor","flip","size","remove"],label:"어려움"}};

function make(theme,seed,level){
  const T=THEMES[theme], D=DIFF[level], r=rng(seed*31+THEME_ORDER.indexOf(theme)*7919+level.length);
  const pal=T.colors||PAL, dense=level==="hard";
  let L;
  if(T.layout==="shelf") L=layoutShelf(T,r,dense,pal);
  else if(T.layout==="scatter") L=layoutScatter(T,r,dense?20:level==="normal"?17:14,pal);
  else L=layoutCity(T,r,dense);
  const bg=L.bg||T.bg(r);
  const A=L.items.map((o,i)=>({...o,id:i})), B=A.map(o=>({...o})), ans=[], used=[];
  const okSpot=(x,y,s)=>used.every(u=>Math.hypot(u.x-x,u.y-y)>(u.s+s)/2+40);
  const kinds=[];for(let i=0;kinds.length<D.n&&i<50;i++)kinds.push(D.kinds[(i+Math.floor(r()*D.kinds.length))%D.kinds.length]);
  for(const k0 of kinds){
    let done=false;
    for(let attempt=0;attempt<60&&!done;attempt++){
      let k=attempt<20?k0:["remove","swap","recolor"][attempt%3]; if(T.layout==="city"){k=r()<.6?"recolor":(r()<.5?"remove":"swap")}
      if(k==="add"){
        const sp=L.free.filter(f=>okSpot(f.x,f.y,f.s));if(!sp.length)continue;
        const f=sp[Math.floor(r()*sp.length)];L.free.splice(L.free.indexOf(f),1);
        const t=f.t||T.icons[Math.floor(r()*T.icons.length)];
        const it={t,c:pal[Math.floor(r()*pal.length)],x:f.x,y:f.y,s:f.s,f:r()<.5,_new:1};
        (r()<.5?A:B).push(it);used.push(it);ans.push(it);done=true;break;
      }
      const cand=B.filter(o=>!o._new&&!o._ch&&A.some(q=>q.id===o.id)&&okSpot(o.x,o.y,o.s)&&(T.layout!=="city"||(k==="recolor"?o.win:!o.win)));
      if(!cand.length)continue;
      const o=cand[Math.floor(r()*cand.length)], a=A.find(q=>q.id===o.id);
      if(k==="remove"){if(o.win)continue;if(r()<.5)B.splice(B.indexOf(o),1);else{A.splice(A.indexOf(a),1);o._ch=1}const keep={x:a.x,y:a.y,s:a.s};used.push(keep);ans.push(keep);done=true;break}
      if(k==="recolor"){
        if(o.win){o.c=o.c==="#ffd76a"?"#22304a":"#ffd76a"}
        else{const opts=pal.filter(c=>cdist(c,o.c)>150);if(!opts.length)continue;o.c=opts[Math.floor(r()*opts.length)]}
      }
      else if(k==="swap"){const zn=t=>(T.zoneOf&&T.zoneOf[t])||"x";const opts=[...new Set(T.icons)].filter(t=>t!==o.t&&t!=="cat"&&zn(t)===zn(o.t));if(!opts.length)continue;o.t=opts[Math.floor(r()*opts.length)]}
      else if(k==="flip"){if(!ASYM.has(o.t))continue;o.f=!o.f}
      else if(k==="size"){if(T.layout==="shelf"){continue}o.s=Math.round(o.s*(r()<.5?.68:1.32))}
      o._ch=1;used.push(o);ans.push({x:o.x,y:o.y,s:Math.max(o.s,a.s)});done=true;
    }
  }
  // 정답 위치 순서를 섞어 둠(번호로 위치가 드러나지 않게)
  ans.sort((p,q)=>p.x-q.x);
  const draw=list=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="100%" height="100%">${bg}${list.map(o=>`<g transform="translate(${o.x} ${o.y}) scale(${(o.s/100*(o.f?-1:1)).toFixed(3)} ${(o.s/100).toFixed(3)})">${I[o.t](o.c)}</g>`).join("")}</svg>`;
  // 선반 주제는 선반 판을 그림 위가 아니라 배경 다음에 그려야 하므로 따로 처리
  const shelfLines=T.layout==="shelf"?T.rows.map(y=>`<rect x="84" y="${y}" width="1432" height="22" fill="${T.shelfC}"/><rect x="84" y="${y+22}" width="1432" height="8" fill="#00000022"/>`).join(""):"";
  const drawS=list=>{const u="u"+(++UID);return draw(list).replace(bg,bg+shelfLines).replace(/id="(\w+)"/g,`id="$1${u}"`).replace(/url\(#(\w+)\)/g,`url(#$1${u})`)};
  return {name:`${T.name} · ${D.label}`,ar:W/H,svgA:drawS(A),svgB:drawS(B),
    ans:ans.map(o=>[+(o.x/W).toFixed(4),+(o.y/H).toFixed(4),+(o.s*.58/W).toFixed(4),+(o.s*.58/H).toFixed(4)])};
}
window.SpotGen={make,THEMES,THEME_ORDER,DIFF};
})();
