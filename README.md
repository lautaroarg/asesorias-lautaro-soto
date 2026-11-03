# Asesorías · Lautaro Soto

Landing de asesorías con fecha y hora, contacto y seis preguntas de diagnóstico.

- Lunes a viernes, entre 10:30 y 17:00, hora de Argentina.
- Sesiones de 90 minutos; último inicio a las 15:30.
- Al menos 14 horas de anticipación, validado también en el servidor.
- Solicitudes pendientes de confirmación personal.
- Guardado privado en D1 y envío opcional por WhatsApp o email.

## GitHub Pages

La versión pública se sirve desde `/docs` de la rama `main`:
https://lautaroarg.github.io/asesorias-lautaro-soto/

Para actualizarla, con Node 22.13 o posterior:

```sh
npm ci
npm run build:pages
```

Confirmar y subir los cambios de código y `/docs`. GitHub Pages publica esa carpeta.

## Datos del formulario

GitHub Pages sirve el frontend. El guardado usa el servidor de Sites configurado en `lib/booking-config.ts`. La API acepta el origen exacto de GitHub Pages y mantiene las respuestas fuera del repositorio. No se incluyen datos de clientes, bases de datos, tokens ni credenciales en GitHub.

La interfaz compartida está en `app/booking.tsx`, los estilos en `app/globals.css` y las reglas de agenda en `lib/booking-config.ts`. El servidor se publica con el flujo de Sites. Las solicitudes se guardan en la tabla `consultation_requests`; no hay un panel administrativo ni notificaciones automáticas.

Los mensajes de WhatsApp o email los envía la persona desde su aplicación. El formulario no confirma reservas ni sincroniza calendarios externos.
