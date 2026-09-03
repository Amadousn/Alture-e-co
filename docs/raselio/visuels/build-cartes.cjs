const fs=require('fs'); const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const INK='#211C17',CREAM='#F7F3EC',TERRA='#C15D2F',SAND='#EFE6D8',MUTE='#6B6154';
const HEAD=`<meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&display=swap">
<style>*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{width:1080px;height:1080px;padding:76px 72px;display:flex;flex-direction:column}
.eb{font-size:26px;letter-spacing:4px;text-transform:uppercase;font-weight:700;color:${TERRA};margin-bottom:18px}
h1{font-family:Fraunces,Georgia,serif;font-weight:500;font-size:74px;line-height:1.08;letter-spacing:-.01em}
.foot{margin-top:auto;font-size:29px;line-height:1.4;font-weight:500}
svg{display:block}</style>`;
const ck=(c)=>`<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5.5 5.5L20 7"/></svg>`;
const cx=(c)=>`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

const rows=[['Lame pensée pour une peau fine et mobile'],['Tête arrondie qui suit la peau'],['Éclairage de la zone pendant la tonte'],['Hauteur de coupe réglable'],['Lame dédiée, jamais celle du visage']];
const A=`<div class="wrap" style="background:${CREAM};color:${INK}">
<div class="eb">Pourquoi pas votre tondeuse à barbe</div>
<h1 style="font-size:64px">Deux peaux.<br>Deux outils.</h1>
<div style="margin-top:34px;border-radius:18px;overflow:hidden;border:2px solid rgba(33,28,23,.12)">
 <div style="display:grid;grid-template-columns:1fr 236px 236px;background:${INK};color:${CREAM}">
  <div style="padding:20px 26px;font-size:26px;font-weight:600;opacity:.6">Sous la ceinture</div>
  <div style="padding:20px 10px;font-size:23px;font-weight:700;text-align:center;letter-spacing:1px;opacity:.65">TONDEUSE<br>À BARBE</div>
  <div style="padding:20px 10px;font-size:26px;font-weight:800;text-align:center;letter-spacing:2px;background:${TERRA}">RASELIO</div>
 </div>
 ${rows.map((r,i)=>`<div style="display:grid;grid-template-columns:1fr 236px 236px;align-items:center;background:${i%2?'rgba(33,28,23,.035)':'#fff'}">
  <div style="padding:19px 26px;font-size:29px;line-height:1.22;font-weight:500">${r[0]}</div>
  <div style="display:flex;justify-content:center;padding:15px 0">${cx(MUTE)}</div>
  <div style="display:flex;justify-content:center;padding:15px 0;background:rgba(193,93,47,.09)">${ck(TERRA)}</div>
 </div>`).join('')}
</div>
<div class="foot" style="color:${MUTE};padding-top:26px">La peau du visage est épaisse et tendue. Celle du maillot est fine et mobile.</div></div>`;

const zones=[['Maillot et aine','La zone la plus fine, la plus mobile'],['Testicules','Tête arrondie, sabot en place'],['Torse et ventre','Uniformément, sans repasser'],['Aisselles et dos','Les angles difficiles']];
const B=`<div class="wrap" style="background:${INK};color:${CREAM}">
<div class="eb">Où l'utiliser</div>
<h1 style="color:${CREAM}">Du maillot<br>au torse.</h1>
<div style="margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:24px">
${zones.map((z,i)=>`<div style="background:rgba(247,243,236,.06);border:2px solid rgba(247,243,236,.14);border-radius:18px;padding:42px 34px">
 <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px"><span style="width:16px;height:16px;border-radius:50%;background:${TERRA};display:block"></span>
 <span style="font-size:25px;font-weight:700;color:${TERRA};letter-spacing:1px">0${i+1}</span></div>
 <div style="font-size:40px;font-weight:700;line-height:1.15;margin-bottom:12px">${z[0]}</div>
 <div style="font-size:28px;line-height:1.35;opacity:.72">${z[1]}</div></div>`).join('')}
</div>
<div class="foot" style="opacity:.8">Une seule lame pour tout le corps. Jamais celle qui touche votre visage.</div></div>`;

const steps=[['Clipsez le sabot','Trois hauteurs. Vous tondez, vous ne rasez pas à blanc.'],['Passez sans appuyer','La LED éclaire, la tête arrondie suit la peau.'],['Rincez sous l’eau','Dix secondes. Rien à démonter, rien à nettoyer derrière.']];
const C=`<div class="wrap" style="background:${SAND};color:${INK}">
<div class="eb">5 minutes, sous la douche</div>
<h1>Trois gestes,<br>c’est fini.</h1>
<div style="margin-top:46px;display:flex;flex-direction:column;gap:34px">
${steps.map((s,i)=>`<div style="display:flex;gap:30px;align-items:flex-start;background:#fff;border-radius:18px;padding:32px 34px">
 <div style="font-family:Fraunces,serif;font-size:76px;line-height:.9;color:${TERRA};font-weight:600;flex:none;width:112px">0${i+1}</div>
 <div><div style="font-size:40px;font-weight:700;line-height:1.15;margin-bottom:9px">${s[0]}</div>
 <div style="font-size:29px;line-height:1.35;color:${MUTE}">${s[1]}</div></div></div>`).join('')}
</div>
<div class="foot" style="color:${MUTE}">Sous la douche ou à sec, comme vous préférez.</div></div>`;

const nums=[['3','hauteurs de coupe'],['90','minutes d’autonomie'],['100%','étanche, sous la douche'],['2 ans','de garantie'],['30 j','satisfait ou remboursé'],['0 €','de livraison']];
const D=`<div class="wrap" style="background:${CREAM};color:${INK}">
<div class="eb">Ce que vous obtenez</div>
<h1>Rien à croire<br>sur parole.</h1>
<div style="margin-top:50px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">
${nums.map(n=>`<div style="background:#fff;border:2px solid rgba(33,28,23,.1);border-radius:18px;padding:34px 24px;text-align:center">
 <div style="font-family:Fraunces,serif;font-size:76px;line-height:1;color:${TERRA};font-weight:600;margin-bottom:12px">${n[0]}</div>
 <div style="font-size:27px;line-height:1.3;font-weight:500;color:${MUTE}">${n[1]}</div></div>`).join('')}
</div>
<div class="foot">Emballage neutre et discret. Support en français.</div></div>`;

const cards={ 'card-comparatif':A, 'card-zones':B, 'card-etapes':C, 'card-chiffres':D };
(async()=>{ const b=await chromium.launch();
 for(const [name,html] of Object.entries(cards)){
   fs.writeFileSync(`${__dirname}/${name}.html`,`<!doctype html><html><head>${HEAD}</head><body>${html}</body></html>`);
   const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:2});
   await p.goto('file://'+__dirname+'/'+name+'.html');
   await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1800);
   await p.screenshot({path:`${__dirname}/${name}.png`}); await p.close();
   console.log('ok',name);
 } await b.close(); })().catch(e=>{console.error('ERR',e.message);process.exit(1)});
