export const BUSINESS_NAME = 'Lautaro Soto';
export const CONTACT_EMAIL = 'lautarosotoar@gmail.com';
export const WHATSAPP_NUMBER = '5493513980399';
export const TIMEZONE = 'America/Argentina/Buenos_Aires';
export const MIN_NOTICE_HOURS = 14;
export const WEEKDAYS = [1, 2, 3, 4, 5];
export const TIMES = ['10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'];
export const QUESTIONS = [
 '¿Cuánto estás facturando por mes aproximadamente?',
 '¿Qué objetivo de facturación te gustaría alcanzar?',
 '¿Cuánto estás invirtiendo actualmente en publicidad?',
 '¿Qué resultados te están dando los anuncios? (Consultas, presupuestos y ventas).',
 '¿Cuál sentís que es tu mayor problema hoy para vender más?',
 '¿Qué probaste hasta ahora para mejorar los resultados?',
];
export function todayAR() { return new Intl.DateTimeFormat('sv-SE', {timeZone: TIMEZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()); }
export function validDate(date:string, time:string) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !TIMES.includes(time)) return false;
 const day = new Date(date + 'T12:00:00-03:00');
 if (Number.isNaN(day.getTime()) || new Intl.DateTimeFormat('sv-SE',{timeZone:TIMEZONE}).format(day) !== date) return false;
 const max = new Date(); max.setDate(max.getDate()+90);
 return WEEKDAYS.includes(day.getUTCDay()) && new Date(date+'T'+time+':00-03:00').getTime() >= Date.now() + MIN_NOTICE_HOURS * 60 * 60 * 1000 && day.getTime() <= max.getTime();
}
