// ---------- data -> DOM
const SK=[["Frontend",[["React","⚛","#61dafb",90],["Next.js","N","#ffffff",85],["Tailwind","≈","#38bdf8",88],["Framer","◢","#c4b5fd",70]]],["Backend",[["Node.js","⬢","#7fd13b",85],["Express","ex","#cbd5e1",82],["Java","☕","#f89820",75],["Spring Boot","❀","#6db33f",72]]],["Tools & Others",[["Git","◆","#f05033",85],["GitHub","●","#ffffff",88],["Linux","▲","#fcc624",70],["MySQL","◉","#4aa3d8",78]]]];
let d=0;document.getElementById('sk').innerHTML=SK.map(([g,a])=>`<div class="grp"><h4>${g}</h4><div class="tiles">${a.map(([n,i,c,l])=>`<div class="tile tilt" style="--k:${c}55;--d:${d++}"><u style="color:${c}">${i}</u>${n}<div class="bar" style="--k:${c};--w:${l}%"><i></i></div></div>`).join('')}</div></div>`).join('');
const PR=[["Bright Side Academy","Landing Page",140],["Flow State","Task Manager",200],["Visit Ethiopia","Tourism Platform",100],["GameOn","Gaming Platform",270],["Egremenged","Logistics Marketplace",30]];
document.getElementById('pj').innerHTML=PR.map((p,i)=>`<div class="pj rv ${i?'':'on'}" style="--i:${i+1}" data-k="${i}"><u style="background:linear-gradient(135deg,hsl(${p[2]},70%,50%),hsl(${p[2]+50},70%,25%))"></u><span><b>${p[0]}</b><small>${p[1]}</small></span></div>`).join('');
document.getElementById('tl').innerHTML=[["2025 – Present","EasyFi Technologies","Full-stack Developer"],["2026","INSA Weekend Program","Cyber Talent Program"],["2023 – 2025","BSIA","High School "]].map(e=>`<div><small>${e[0]}</small><b>${e[1]}</b>${e[2]}</div>`).join('');
document.getElementById('sv').innerHTML=[["🌐","Website Development","Static & Dynamic"],["▣","Web Application","Custom Solutions"],["📱","Mobile App Development","iOS & Android"],["✎","UI/UX Design","Modern & Clean"]].map((s,i)=>`<div class="card tilt rv" style="--i:${i+1}"><em>${s[0]}</em><b>${s[1]}</b><br><small>${s[2]}</small></div>`).join('');

// reveal + 3D tilt cards
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.2});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
document.addEventListener('pointermove',e=>{document.querySelectorAll('.tilt').forEach(t=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 t.style.transform=Math.abs(x)<1&&Math.abs(y)<1.2?`rotateY(${x*28}deg) rotateX(${-y*28}deg) scale(1.06)`:''})});

// ---------- 3D: ONE image that flips, dissolves and morphs between all 8 poses
const R=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,100);cam.position.z=7;
S.add(new THREE.AmbientLight(0xffffff,.8));const dl=new THREE.DirectionalLight(0xffffff,.9);dl.position.set(3,4,5);S.add(dl);
const TX=POSES.map(u=>new THREE.TextureLoader().load(u));
const FH=4.2,FW=FH*.8;
const U={tA:{value:TX[0]},tB:{value:TX[0]},m:{value:0},t:{value:0},o:{value:1}};
const mat=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,side:THREE.DoubleSide,
vertexShader:`varying vec2 v;uniform float m,t;
void main(){v=uv;vec3 p=position;
 float b=.4*exp(-(pow((uv.x-.5)/.28,2.)+pow((uv.y-.68)/.3,2.)))+.15*exp(-(pow((uv.x-.5)/.45,2.)+pow((uv.y-.3)/.35,2.)));
 p.z+=b+sin(m*3.14159)*.3*sin(uv.y*9.+t*6.)*sin(uv.x*5.);
 gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
fragmentShader:`varying vec2 v;uniform sampler2D tA,tB;uniform float m,o;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
void main(){vec2 u=gl_FrontFacing?v:vec2(1.-v.x,v.y);
 float n=h(floor(u*vec2(24.,32.))),k=smoothstep(.3,.7,m+(n-.5)*.5);
 vec3 c=mix(texture2D(tA,u).rgb,texture2D(tB,u).rgb,k);
 c+=vec3(.25,.4,.9)*sin(m*3.14159)*.35*(1.-abs(n-.5)*2.);
 float a=smoothstep(0.,.2,min(u.x,1.-u.x))*smoothstep(0.,.14,min(u.y,1.-u.y));
 gl_FragColor=vec4(c,a*o);}`});
const F=new THREE.Group(),body=new THREE.Mesh(new THREE.PlaneGeometry(FW,FH,48,64),mat);body.renderOrder=2;F.add(body);S.add(F);
const rg=c=>{const r=new THREE.Mesh(new THREE.TorusGeometry(FH*.38,.012,6,100),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.5}));r.position.set(0,FH*.12,-.4);F.add(r);return r};
const r1=rg(0x3d8bff),r2=rg(0xf6c026);
const XS=[1.9,.1,-2.3,1.6,2.3,-2.4,1.9,0],SC=[1,1.02,1.05,1.08,1.08,.9,.92,.9],RY=[-.25,.2,.3,-.15,-.3,.3,-.2,0];

// floating wireframe shapes
const GS=[new THREE.IcosahedronGeometry(.5),new THREE.OctahedronGeometry(.4),new THREE.TorusKnotGeometry(.35,.1,60,8),new THREE.TorusGeometry(.4,.1,8,24),new THREE.BoxGeometry(.5,.5,.5),new THREE.TetrahedronGeometry(.5),new THREE.DodecahedronGeometry(.4)];
const shapes=GS.map((g,i)=>{const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:i%2?0xf6c026:0x3d8bff,wireframe:true,transparent:true,opacity:.35}));m.userData={x:(i%2?1:-1)*(2+Math.random()*3.5),y:(Math.random()-.5)*5,z:-1-Math.random()*3,s:.0004+Math.random()*.0008};S.add(m);return m});
const pg=new THREE.BufferGeometry(),pa=[];for(let i=0;i<300;i++)pa.push((Math.random()-.5)*18,(Math.random()-.5)*10,(Math.random()-.9)*8);
pg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x7aa8ff,size:.04}));S.add(pts);

// floating 3D props: project screen (scene 3) + code panel (scene 7)
const edge=new THREE.MeshStandardMaterial({color:0x1a3a7a,metalness:.6,roughness:.3});
function prop(cv,w,h,at,x,y){const tx=new THREE.CanvasTexture(cv),m=new THREE.Mesh(new THREE.BoxGeometry(w,h,.07),[edge,edge,edge,edge,new THREE.MeshBasicMaterial({map:tx}),edge]);S.add(m);return{m,tx,at,x,y,s:0}}
const pc=document.createElement('canvas');pc.width=512;pc.height=340;
const pp=prop(pc,2.2,1.46,3,-2.4,.9);
function dp(k){const c=pc.getContext('2d'),P=PR[k],g=c.createLinearGradient(0,0,512,340);g.addColorStop(0,`hsl(${P[2]},70%,48%)`);g.addColorStop(1,`hsl(${P[2]+50},70%,18%)`);c.fillStyle=g;c.fillRect(0,0,512,340);
 c.fillStyle='#fff';c.font='bold 40px Poppins,sans-serif';c.fillText(P[0],28,76);c.font='22px Poppins,sans-serif';c.fillText(P[1],28,112);c.fillStyle='rgba(255,255,255,.22)';for(let r=0;r<3;r++)c.fillRect(28+r*158,160,142,130);pp.tx.needsUpdate=true}
dp(0);
document.getElementById('pj').addEventListener('click',e=>{const el=e.target.closest('.pj');if(!el)return;document.querySelectorAll('.pj').forEach(x=>x.classList.toggle('on',x===el));dp(+el.dataset.k)});
document.getElementById('pj').addEventListener('pointerover',e=>{const el=e.target.closest('.pj');if(el&&!el.classList.contains('on'))el.click()});
const cc=document.createElement('canvas');cc.width=512;cc.height=300;const cp=prop(cc,2.4,1.4,7,2.6,1.0);
const CODE=["const create = () => {","  return innovation;","};","","// ship it. repeat. grow."];let typed=0;
function dc(){const c=cc.getContext('2d');c.fillStyle='#0a1430';c.fillRect(0,0,512,300);c.strokeStyle='#3d8bff';c.lineWidth=4;c.strokeRect(2,2,508,296);c.font='26px monospace';let n=typed|0;
 CODE.forEach((l,i)=>{const s=l.slice(0,Math.max(0,n));n-=l.length;c.fillStyle=i==4?'#6b7fa8':i==1?'#f6c026':'#7aa8ff';c.fillText(s+(n>=0&&n<l.length+1&&s.length==l.length?'':''),26,60+i*44)});cp.tx.needsUpdate=true}

let idx=0,mx=0,my=0;const secs=[...document.querySelectorAll('section')],links=[...document.querySelectorAll('#fl a')];
function resize(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}resize();addEventListener('resize',resize);
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1});
function spy(){let b=0,best=1e9;secs.forEach((s,i)=>{const r=s.getBoundingClientRect(),k=Math.abs(r.top+r.height/2-innerHeight/2);if(k<best){best=k;b=i}});if(b!==idx){idx=b;if(b==7)typed=0}links.forEach((l,i)=>l.classList.toggle('on',i===idx))}
addEventListener('scroll',spy);spy();


let shown=0,want=0,tr=null,cx=XS[0],cs=1,cr=RY[0];
(function loop(now){requestAnimationFrame(loop);const t=now/1000,wide=innerWidth>800;
 // a new section came up -> start morphing from the pose on screen to the new pose
 if(idx!==want){want=idx;const b=tr?(tr.p>.5?tr.to:tr.from):shown;
  if(b===want){tr=null;shown=want;U.tA.value=TX[want];U.m.value=0}
  else{tr={from:b,to:want,s:t,p:0};shown=b;U.tA.value=TX[b];U.tB.value=TX[want]}}
 let pr=0;if(tr){tr.p=Math.min(1,(t-tr.s)/1.4);pr=tr.p;if(pr>=1){shown=tr.to;U.tA.value=TX[shown];tr=null;pr=0}}
 const e=pr<.5?4*pr*pr*pr:1-Math.pow(-2*pr+2,3)/2,sp=Math.sin(pr*Math.PI);
 U.m.value=tr?e:0;U.t.value=t;U.o.value=wide?1:.75;
 const sc=(wide?1:.7)*SC[want];
 cx+=((wide?XS[want]:0)-cx)*.06;cs+=(sc-cs)*.06;cr+=(RY[want]-cr)*.06;
 F.scale.setScalar(cs*(1+.1*sp));
 F.position.set(cx,FH*cs/2-2.3+(wide?0:.8)+Math.sin(t*1.4)*.04+sp*.35,0);
 F.rotation.y=cr+mx*.22+(tr?e*Math.PI*2:0);F.rotation.x=my*.08;
 r1.rotation.set(1.3,t*.4,0);r2.rotation.set(.5,-t*.3,t*.2);
 [pp,cp].forEach(q=>{q.s+=((wide&&idx===q.at&&!tr?1:0)-q.s)*.08;q.m.visible=q.s>.01;q.m.scale.setScalar(Math.max(.001,q.s));q.m.position.set(q.x,q.y+Math.sin(t*1.2)*.1,0);q.m.rotation.set(my*.1,-.3*Math.sign(q.x)+Math.sin(t*.8)*.18+mx*.2,0)});
 if(idx===7&&typed<30){typed+=.25;dc()}
 shapes.forEach((m,i)=>{const u=m.userData;m.position.set(u.x+mx*.2*(i%3),u.y-scrollY*u.s*2.5+Math.sin(t+i)*.2,u.z);m.rotation.x=t*.2+i;m.rotation.y=t*.3});
 pts.rotation.y=t*.02;pts.position.y=-scrollY*.0012;
 R.render(S,cam)})(performance.now());
