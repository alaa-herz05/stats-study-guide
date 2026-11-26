(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,K=document.body.dataset.p;
const hd=$('header'),sh=()=>document.documentElement.style.setProperty('--hh',hd.offsetHeight+'px');sh();addEventListener('resize',sh);
const sp=$('#sp'),oS=()=>{const h=document.documentElement;sp.style.width=h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100+'%'};addEventListener('scroll',oS,{passive:true});oS();
/* floating math symbols */
const bg=$('#bg'),bx=bg.getContext('2d'),SY=['Σ','π','μ','σ','∫','√','x̄','∞','%','P(A)','n!','±','≈','λ','Δ','θ','∪','∩','|x|','½','Ω','ȳ','s²','C(n,m)'];let P=[];
const rs=()=>{bg.width=innerWidth;bg.height=innerHeight;P=[...Array(Math.min(30,Math.floor(innerWidth/50)))].map(()=>({x:Math.random()*bg.width,y:Math.random()*bg.height,s:Math.random()+.6,v:Math.random()*.25+.05,t:SY[Math.floor(Math.random()*SY.length)],r:Math.random()*6}))};addEventListener('resize',rs);rs();
const fb=()=>{bx.clearRect(0,0,bg.width,bg.height);bx.fillStyle='rgba(255,210,31,.075)';P.forEach(p=>{bx.font=`italic ${p.s*26}px Cambria Math,Georgia,serif`;bx.fillText(p.t,p.x+Math.sin(p.r)*14,p.y);if(!RM){p.y-=p.v;p.r+=.004;if(p.y<-30){p.y=bg.height+30;p.x=Math.random()*bg.width}}});if(!RM)requestAnimationFrame(fb)};fb();
/* hero animation per chapter */
const hv=$('#hv');if(hv){const c=hv.getContext('2d');let W,H;const rz=()=>{const r=hv.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;hv.width=W*d;hv.height=H*d;c.setTransform(d,0,0,d,0,0)};rz();addEventListener('resize',rz);
const Y='#ffd21f',B=H=>H-26,nrm=(z,s)=>Math.exp(-.5*(z/s)**2)/(s*2.5066);
const tx=(s,x,y,col,f)=>{c.fillStyle=col||'#ddd';c.font=f||'13px Cambria Math,Georgia,serif';c.fillText(s,x,y)};
const ln=(a,b,d,e,col,w,dash)=>{c.strokeStyle=col;c.lineWidth=w||1;c.setLineDash(dash||[]);c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke();c.setLineDash([])};
const curve=(m,s,col,fill)=>{c.beginPath();for(let x=0;x<=W;x+=3){const z=(x/W-m)*8,y=B(H)-nrm(z,s)*1.35*(H-70);x?c.lineTo(x,y):c.moveTo(x,y)}c.strokeStyle=col;c.lineWidth=2.5;c.stroke();if(fill){c.lineTo(W,B(H));c.lineTo(0,B(H));c.fillStyle=fill;c.fill()}};
const ax=()=>ln(0,B(H),W,B(H),'#555',1);
const D={
'00':t=>{ax();const s=1.1+.4*Math.sin(t/1400);curve(.5,s,Y,'rgba(255,210,31,.14)');[-1,1].forEach(k=>ln(W*(.5+k*s/8),B(H),W*(.5+k*s/8),B(H)-nrm(s,s)*1.35*(H-70),'#fff',1,[4,4]));tx('μ',W/2-4,H-8,Y);tx('σ = '+s.toFixed(2),W*.5+s/8*W+6,B(H)-30,'#fff')},
'01':t=>{ax();const d=[-3,-2.2,-1.6,-1.2,-.7,-.3,0,.4,.9,1.3,1.8],o=3.6+Math.sin(t/900)*1.4,a=[...d,o],m=a.reduce((x,y)=>x+y)/a.length,md=[...a].sort((x,y)=>x-y)[6],X=v=>W*(.5+v/9);a.forEach((v,i)=>{c.beginPath();c.arc(X(v),B(H)-14-(i%3)*18,7,0,7);c.fillStyle=i==a.length-1?'#ff9f1c':Y;c.fill()});ln(X(m),30,X(m),B(H),Y,2,[6,4]);ln(X(md),30,X(md),B(H),'#fff',2);tx('mean x̄',X(m)+5,48,Y);tx('median',X(md)-52,68,'#fff');tx('outlier moves the mean, not the median',W-290,H-8,'#999','12px system-ui')},
'02':t=>{ax();const s=.8+.5*Math.sin(t/1200);curve(.5,.7+(1.5-s),'#fff');curve(.5,s,Y,'rgba(255,210,31,.12)');tx('small s² = tight',20,H-8,'#fff');tx('large s² = spread',W-150,H-8,Y)},
'03':t=>{const k=2+Math.floor(t/700)%11,g=Math.min(26,(H-60)/6);for(let i=1;i<7;i++)for(let j=1;j<7;j++){const on=i+j==k;c.beginPath();c.arc(W-230+j*g,26+i*g,on?7+Math.sin(t/120):4,0,7);c.fillStyle=on?Y:'#555';c.fill()}tx('S = 36 outcomes',W-230,H-14,'#ddd');tx('sum = '+k+'   P = '+(6-Math.abs(k-7))+'/36',W-230,18,Y)},
'04':t=>{const d=34+26*Math.sin(t/1100),r=48,cx=W-150,cy=H/2+16;c.fillStyle='rgba(255,210,31,.25)';[-1,1].forEach(s=>{c.beginPath();c.arc(cx+s*d,cy,r,0,7);c.fill();c.strokeStyle=Y;c.stroke()});c.save();c.beginPath();c.arc(cx-d,cy,r,0,7);c.clip();c.beginPath();c.arc(cx+d,cy,r,0,7);c.fillStyle='rgba(255,255,255,.7)';c.fill();c.restore();tx('A',cx-d-r+10,cy-r+4,Y);tx('B',cx+d+r-18,cy-r+4,Y);tx('A∩B',cx-12,cy+4,'#000');tx('P(A∪B)=P(A)+P(B)−P(A∩B)',W-300,H-8,'#ddd','12px Cambria Math')},
'05':t=>{const d=30,r=50,cx=W-150,cy=H/2+16,p=.5+.5*Math.sin(t/900);c.beginPath();c.arc(cx+d,cy,r,0,7);c.fillStyle='rgba(255,210,31,.3)';c.fill();c.strokeStyle='#fff';c.lineWidth=2;c.stroke();c.beginPath();c.arc(cx-d,cy,r,0,7);c.strokeStyle=Y;c.lineWidth=1.5;c.stroke();c.save();c.beginPath();c.arc(cx+d,cy,r,0,7);c.clip();c.beginPath();c.arc(cx-d,cy,r,0,7);c.fillStyle='rgba(255,210,31,'+(.35+p*.5)+')';c.fill();c.restore();tx('B (given)',cx+d-18,cy-r-6,'#fff');tx('P(A|B) = P(A∩B) / P(B)',W-290,H-8,Y,'14px Cambria Math')},
'06':t=>{const L=['ABC','ACB','BAC','BCA','CAB','CBA'],k=Math.floor(t/800)%6;L[k].split('').forEach((ch,i)=>{c.fillStyle='#1a1500';c.fillRect(W-210+i*58,50,48,48);c.strokeStyle=Y;c.strokeRect(W-210+i*58,50,48,48);tx(ch,W-196+i*58,86,Y,'30px Cambria Math')});tx('3! = 3×2×1 = 6  ('+(k+1)+'/6)',W-210,130,'#ddd','15px Cambria Math');tx('C(n,m) = n! / (m!(n−m)!)',W-210,155,'#999','13px Cambria Math')},
'07':t=>{const v=[1,3,3,1],e=Math.min(1,t/900),bw=34;ax();v.forEach((p,i)=>{const h=p/3*(H-90)*e,x=W-230+i*(bw+14);c.fillStyle=Y;c.fillRect(x,B(H)-h,bw,h);tx(''+i,x+13,H-8,'#fff');tx(p+'/8',x+4,B(H)-h-6,'#fff')});tx('X = heads in 3 tosses',W-230,22,Y)},
'08':t=>{const n=12,p=.5+.3*Math.sin(t/1300),a=[...Array(n+1)].map((_,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r*p**k*(1-p)**(n-k)}),mx=Math.max(...a),bw=(W/2.2)/(n+1);ax();a.forEach((q,k)=>{c.fillStyle=Y;c.fillRect(W-W/2.2-10+k*bw,B(H)-q/mx*(H-80),bw-3,q/mx*(H-80))});tx('X ~ Bin(12, p='+p.toFixed(2)+')   μ = np = '+(n*p).toFixed(1),W-W/2.2-10,20,'#fff','14px Cambria Math')}};
D['09']=D['00'];const f=D[K]||D['00'];const L=t=>{c.clearRect(0,0,W,H);f(t);if(!RM)requestAnimationFrame(L)};requestAnimationFrame(L)}
/* reveal on scroll */
const rv=$$('h2,details,.tip,.w,.card,.q,table');rv.forEach(e=>e.classList.add('rv'));
if('IntersectionObserver'in window&&!RM){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});rv.forEach(e=>io.observe(e))}else rv.forEach(e=>e.classList.add('in'));
/* toc highlight */
const tc=$$('.toc a');if(tc.length){const hs=tc.map(a=>$(a.getAttribute('href'))),so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){tc.forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id))}}),{rootMargin:'-20% 0px -70% 0px'});hs.forEach(h=>h&&so.observe(h))}
/* copy formulas */
$$('.f code').forEach(e=>e.onclick=()=>{try{navigator.clipboard.writeText(e.textContent)}catch(x){}e.classList.add('cp');setTimeout(()=>e.classList.remove('cp'),900)});
/* card glow */
$$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
/* keyboard: arrows = prev/next, A = Arabic */
addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)||e.ctrlKey||e.metaKey)return;const L=$$('header nav a'),i=L.findIndex(a=>a.classList.contains('on'));if(e.key=='ArrowRight'&&L[i+1])location.href=L[i+1].href;if(e.key=='ArrowLeft'&&L[i-1])location.href=L[i-1].href;if(e.key=='a'||e.key=='A')$('#tr').click()});
})();
