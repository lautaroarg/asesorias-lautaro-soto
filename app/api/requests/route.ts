import { getDb } from '../../../db';
import { requests } from '../../../db/schema';
import { validDate, PAGES_ORIGIN } from '../../../lib/booking-config';
function allowedOrigin(request: Request) {
 const origin = request.headers.get('origin');
 return !origin || origin === new URL(request.url).origin || origin === PAGES_ORIGIN;
}
function responseHeaders(request: Request, initial?: HeadersInit) {
 const headers = new Headers(initial);
 headers.set('Cache-Control','no-store');
 headers.set('Vary','Origin');
 if (request.headers.get('origin') === PAGES_ORIGIN) headers.set('Access-Control-Allow-Origin',PAGES_ORIGIN);
 return headers;
}
export async function OPTIONS(request: Request) {
 if (!allowedOrigin(request)) return new Response(null,{status:403});
 const headers = responseHeaders(request);
 headers.set('Access-Control-Allow-Methods','POST, OPTIONS');
 headers.set('Access-Control-Allow-Headers','Content-Type');
 headers.set('Access-Control-Max-Age','600');
 return new Response(null,{status:204,headers});
}
export async function POST(request: Request) {
 const respond = (body: unknown, init: ResponseInit = {}) => Response.json(body, {...init,headers:responseHeaders(request,init.headers)});
 try {
  if (!allowedOrigin(request)) return respond({error:'Solicitud no permitida.'},{status:403});
  if (Number(request.headers.get('content-length')||0)>20000) return respond({error:'El formulario es demasiado largo.'},{status:413});
  const raw = await request.text();
  if (raw.length>20000) return respond({error:'El formulario es demasiado largo.'},{status:413});
  const b = JSON.parse(raw);
  if (b.website) return respond({error:'No pudimos procesar la solicitud.'},{status:400});
  const fields = ['id','date','time','name','email','phone','business'];
  if (fields.some(k=>typeof b[k] !== 'string' || !b[k].trim() || b[k].length>250) || !/^[0-9a-f-]{36}$/i.test(b.id) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || b.name.trim().length<2 || !b.consent || !Array.isArray(b.answers) || b.answers.length!==6 || b.answers.some((v:unknown)=>typeof v!=='string' || v.trim().length<2 || v.length>2000)) return respond({error:'Revisá tus datos y completá las seis respuestas.'},{status:400});
  if (!validDate(b.date,b.time)) return respond({error:'Elegí un horario de atención con al menos 14 horas de anticipación.'},{status:400});
  await getDb().insert(requests).values({id:b.id,createdAt:new Date().toISOString(),date:b.date,time:b.time,name:b.name.trim(),email:b.email.trim(),phone:b.phone.trim(),business:b.business.trim(),answers:JSON.stringify(b.answers.map((s:string)=>s.trim())),status:'pending'}).onConflictDoNothing();
  return respond({id:b.id,status:'pending'},{status:201,headers:{'Cache-Control':'no-store'}});
 } catch { return respond({error:'No se pudo guardar tu solicitud. Tus respuestas siguen acá; intentá de nuevo.'},{status:500}); }
}
