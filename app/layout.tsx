import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Asesoría con Lautaro Soto | Tu próximo paso para vender más', description: 'Un espacio de 90 minutos para analizar tu negocio, revisar tus anuncios y definir los próximos pasos. Elegí un horario y contame dónde estás hoy.' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="es-AR"><body>{children}</body></html>; }
