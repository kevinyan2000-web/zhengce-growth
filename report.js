const articles=[...document.querySelectorAll('.report')];
const types={weekly:'周学习记录',biweekly:'双周教师反馈与评价',monthly:'月度成长报告',project:'作品集档案'};
const defaults={weekly:'w41',biweekly:'b08',monthly:'m2026-10',project:'p-island'};
const home=document.getElementById('home');const workspace=document.getElementById('workspace');
function route(){
 let id=decodeURIComponent(location.hash.slice(1)||'home');
 if(defaults[id])id=defaults[id];
 let report=articles.find(a=>a.id===id);
 if(!report)id='home';
 document.querySelectorAll('video').forEach(v=>v.pause());
 home.hidden=id!=='home';workspace.hidden=id==='home';
 articles.forEach(a=>a.hidden=a.id!==id);
 const type=report?.dataset.type;
 document.querySelectorAll('.tabs a').forEach(a=>a.setAttribute('aria-current',(a.dataset.type===type||(!report&&a.dataset.type==='home'))?'page':'false'));
 document.querySelectorAll('.periods').forEach(p=>p.hidden=p.dataset.type!==type);
 document.querySelectorAll('.periodpicker').forEach(p=>p.hidden=p.dataset.type!==type);
 document.querySelectorAll('.periods a').forEach(a=>a.setAttribute('aria-current',a.hash==='#'+id?'true':'false'));
 document.querySelectorAll('.periodpicker select').forEach(s=>s.value=id);
 if(report){document.getElementById('list-title').textContent=types[type];document.getElementById('list-hint').textContent=type==='biweekly'?'按连续两周汇总当期教师反馈':'选择一份报告阅读';document.title=report.querySelector('h1').textContent+' · 郑策成长档案';}
 else document.title='郑策 · AI项目成长档案 | 以明AI研究院';
 window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);route();
if(location.protocol==='file:')document.querySelectorAll('[data-copy]').forEach(b=>b.hidden=true);
document.querySelectorAll('.periodpicker select').forEach(s=>s.addEventListener('change',()=>location.hash=s.value));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
 const url=location.href.split('#')[0]+'#'+b.dataset.copy;const status=b.parentElement.querySelector('.copy-status');
 try{await navigator.clipboard.writeText(url);status.textContent='链接已复制';}catch{window.prompt('复制本报告链接',url);}
}));
document.querySelectorAll('[data-print]').forEach(b=>b.addEventListener('click',()=>{const ds=[...b.closest('article').querySelectorAll('details')],old=ds.map(d=>d.open);ds.forEach(d=>d.open=true);window.print();ds.forEach((d,i)=>d.open=old[i]);}));
const dialog=document.getElementById('image-viewer');let lastImageLink;
document.querySelectorAll('a[data-image]').forEach(a=>a.addEventListener('click',e=>{if(typeof dialog.showModal!=='function')return;e.preventDefault();lastImageLink=a;dialog.querySelector('img').src=a.href;dialog.querySelector('img').alt=a.querySelector('img').alt;dialog.querySelector('p').textContent=a.querySelector('img').alt;dialog.showModal();}));
dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>lastImageLink?.focus());
