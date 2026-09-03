const fs=require('fs'); const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const INK='#211C17',CREAM='#F7F3EC',TERRA='#C15D2F',MUTE='#6B6154';
const ic=(p,s=44,c=TERRA)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const P={
 flag:'<path d="M4 21V4"/><path d="M4 5h13l-2.2 4L17 13H4"/>',
 chat:'<path d="M21 12a8 8 0 1 1-3.2-6.4"/><path d="M21 4v5h-5"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>',
 truck:'<path d="M1 4h13v12H1z"/><path d="M14 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
 back:'<path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-6.7L3 9"/>',
 shield:'<path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5z"/><path d="M9 12l2 2 4-4"/>'};
const rows=[
 [P.flag,'Entreprise française déclarée','Un entrepreneur identifié, une adresse, un numéro.'],
 [P.chat,'Support en français','Une vraie personne vous répond par e-mail, sous 24 h ouvrées.'],
 [P.truck,'Expédiée de France, colis neutre','Colissimo suivi. Aucune mention du produit sur le carton.'],
 [P.back,'30 jours pour changer d’avis','Remboursement intégral, sans avoir à se justifier.'],
 [P.shield,'Garantie 2 ans','Défaut de fabrication couvert, remplacement sans frais.']];
const HEAD=`<meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800&display=swap">
<style>*{box-sizing:border-box;margin:0;padding:0}body{width:1080px;height:1080px;overflow:hidden;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}</style>`;
const html=`<div style="width:1080px;height:1080px;padding:70px 66px;display:flex;flex-direction:column;background:${CREAM};color:${INK}">
<div style="font-size:26px;letter-spacing:4px;text-transform:uppercase;font-weight:700;color:${TERRA};margin-bottom:12px">Pourquoi nous faire confiance</div>
<h1 style="font-family:Fraunces,Georgia,serif;font-weight:500;font-size:56px;line-height:1.08;letter-spacing:-.01em">Une vraie marque,<br>un vrai SAV.</h1>
<div style="margin-top:30px;display:flex;flex-direction:column;gap:12px">
${rows.map(r=>`<div style="display:flex;gap:24px;align-items:flex-start;background:#fff;border:2px solid rgba(33,28,23,.09);border-radius:16px;padding:19px 24px">
 <div style="flex:none;margin-top:2px">${ic(r[0])}</div>
 <div><div style="font-size:33px;font-weight:700;line-height:1.18;margin-bottom:6px">${r[1]}</div>
 <div style="font-size:27px;line-height:1.32;color:${MUTE}">${r[2]}</div></div></div>`).join('')}
</div>
<div style="margin-top:auto;padding-top:20px;font-size:25px;line-height:1.4;color:${MUTE}">Raselio · Dylan Ulry, entrepreneur individuel · SIREN 982 367 286</div></div>`;
(async()=>{ const b=await chromium.launch();
 fs.writeFileSync(`${__dirname}/card-confiance.html`,`<!doctype html><html><head>${HEAD}</head><body>${html}</body></html>`);
 const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:2});
 await p.goto('file://'+__dirname+'/card-confiance.html');
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1800);
 await p.screenshot({path:`${__dirname}/card-confiance.png`}); await b.close(); console.log('ok'); })().catch(e=>{console.error('ERR',e.message);process.exit(1)});
