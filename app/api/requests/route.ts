import { getDb } from '../../../db';
import { requests } from '../../../db/schema';
import { validDate } from '../../../lib/booking-config';
export async function POST(request: Request) {
 try {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return Response.json({error:'Solicitud no permitida.'},{status:403});
  if (Number(request.headers.get('content-length')||0)>20000) return Response.json({error:'El formulario es demasiado largo.'},{status:413});
  const raw = await request.text();
  if (raw.length>20000) return Response.json({error:'El formulario es demasiado largo.'},{status:413});
  const b = JSON.parse(raw);
  if (b.website) return Response.json({error:'No pudimos procesar la solicitud.'},{status:400});
  const fields = ['id','date','time','name','email','phone','business'];
  if (fields.some(k=>typeof b[k] !== 'string' || !b[k].trim() || b[k].length>250) || !/^[0-9a-f-]{36}$/i.test(b.id) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) || b.name.trim().length<2 || !b.consent || !Array.isArray(b.answers) || b.answers.length!==6 || b.answers.some((v:unknown)=>typeof v!=='string' || v.trim().length<2 || v.length>2000)) return Response.json({error:'Revisá tus datos y completá las seis respuestas.'},{status:400});
  if (!validDate(b.date,b.time)) return Response.json({error:'Ese horario ya no es válido. Elegí otra fecha u hora.'},{status:400});
  await getDb().insert(requests).values({id:b.id,createdAt:new Date().toISOString(),date:b.date,time:b.time,name:b.name.trim(),email:b.email.trim(),phone:b.phone.trim(),business:b.business.trim(),answers:JSON.stringify(b.answers.map((s:string)=>s.trim())),status:'pending'}).onConflictDoNothing();
  return Response.json({id:b.id,status:'pending'},{status:201,headers:{'Cache-Control':'no-store'}});
 } catch { return Response.json({error:'No se pudo guardar tu solicitud. Tus respuestas siguen acá; intentá de nuevo.'},{status:500}); }
}
