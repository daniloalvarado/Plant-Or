const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || '';
const BREVO_SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL || '';
const BREVO_SENDER_NAME = import.meta.env.VITE_BREVO_SENDER_NAME || 'PLANT-OR';

export const sendStatusEmail = async (
  email_destino: string,
  nombre_registrador: string,
  nombre_planta: string,
  estado_nuevo: string,
  motivo_observacion?: string,
  docente_nombre?: string,
  codigo_registro?: string
) => {
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
    console.warn("Faltan configurar las credenciales de Brevo (VITE_BREVO_API_KEY y VITE_BREVO_SENDER_EMAIL) en .env");
    return false;
  }

  let instructions = '';
  let text_color = '#166534';
  let bg_color = '#f0fdf4';
  let border_color = '#1FC451';

  if (estado_nuevo === 'Validado') {
    instructions = `¡Felicidades! Este registro ha sido verificado y aprobado por el docente ${docente_nombre || 'asignado'}.\n\nGracias por tu excelente trabajo. Estás contribuyendo directamente a enriquecer nuestro catálogo botánico. ¡Sigue así!`;
    text_color = '#166534'; // Verde oscuro
    bg_color = '#f0fdf4'; // Verde claro
    border_color = '#1FC451'; // Verde brillante
  } else if (estado_nuevo === 'Observado') {
    instructions = `El docente ${docente_nombre || 'asignado'} ha revisado tu registro y ha dejado una observación que debes corregir.\n\nMotivo/Comentario:\n"${motivo_observacion}"\n\nPor favor, abre la aplicación móvil, dirígete a la pestaña "Historial" y edita el registro para subsanar esta observación.`;
    text_color = '#9A3412'; // Naranja oscuro
    bg_color = '#FFF7ED'; // Naranja claro
    border_color = '#F97316'; // Naranja brillante
  } else if (estado_nuevo === 'Rechazado') {
    instructions = `Lamentablemente, el docente ${docente_nombre || 'asignado'} ha rechazado este registro y ha sido descartado de tu conteo oficial.\n\nMotivo/Comentario:\n"${motivo_observacion}"\n\nRecuerda revisar los criterios de la rúbrica antes de enviar un nuevo registro.`;
    text_color = '#991B1B'; // Rojo oscuro
    bg_color = '#FEF2F2'; // Rojo claro
    border_color = '#EF4444'; // Rojo brillante
  } else {
    instructions = `El estado de tu registro ha cambiado a: ${estado_nuevo}.`;
  }

  const htmlContent = `
<div style="font-family: 'Inter', system-ui, sans-serif, Arial; font-size: 15px; color: #333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <div style="background-color: #0a0a0a; padding: 25px; text-align: center;">
    <h2 style="color: #1FC451; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 1px;">PLANT-OR</h2>
    <p style="color: #a1a1aa; margin: 5px 0 0 0; font-size: 13px;">Sistema de Monitoreo Botánico</p>
  </div>
  <div style="padding: 30px;">
    <p style="margin-top: 0; font-size: 16px;">Hola <strong>${nombre_registrador}</strong>,</p>
    <p style="color: #555; margin-bottom: 25px;">Hay una actualización sobre tu registro botánico de la planta <strong>"${nombre_planta || 'la planta'}"</strong>.</p>
    
    <div style="margin: 25px 0; padding: 18px 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
      <p style="margin: 0 0 8px 0;"><strong>Código de Registro:</strong> <br/><span style="font-family: monospace; background: #e5e7eb; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 5px;">${codigo_registro || 'N/A'}</span></p>
      <p style="margin: 0;"><strong>Estado:</strong> <span style="color: ${text_color}; font-weight: bold; text-transform: uppercase;">${estado_nuevo}</span></p>
    </div>

    <blockquote style="margin: 25px 0; padding: 18px 20px; background-color: ${bg_color}; border-left: 5px solid ${border_color}; color: ${text_color}; font-size: 15px; line-height: 1.5; white-space: pre-line;">
      ${instructions}
    </blockquote>
  </div>
  <div style="background-color: #fafafa; padding: 20px 30px; border-top: 1px solid #eaeaea; text-align: center; font-size: 12px; color: #888;">
    <p style="margin: 0;">Este es un mensaje automático generado por <strong>PLANT-OR</strong>. No respondas a este correo.</p>
  </div>
</div>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL
        },
        to: [
          {
            email: email_destino,
            name: nombre_registrador
          }
        ],
        subject: `Actualización de Registro - PLANT-OR`,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de Brevo API:", errorData);
      return false;
    }

    console.log("Email enviado con éxito al estado:", estado_nuevo);
    return true;
  } catch (error) {
    console.error("Excepción al enviar email de Brevo:", error);
    return false;
  }
};

export const sendSemestralReportEmail = async (
  email_destino: string,
  nombre_registrador: string,
  stats: { validados: number; observados: number; en_revision: number; rechazados: number; total: number }
) => {
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
    return false;
  }

  const htmlContent = `
<div style="font-family: 'Inter', system-ui, sans-serif, Arial; font-size: 15px; color: #333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
  <div style="background-color: #0a0a0a; padding: 25px; text-align: center;">
    <h2 style="color: #1FC451; margin: 0; font-size: 22px; font-weight: 700;">PLANT-OR</h2>
    <p style="color: #a1a1aa; margin: 5px 0 0 0; font-size: 13px;">Reporte Semestral</p>
  </div>
  <div style="padding: 30px;">
    <p style="margin-top: 0; font-size: 16px;">Hola <strong>${nombre_registrador}</strong>,</p>
    <p style="color: #555; margin-bottom: 25px;">Aquí tienes el resumen de tu participación en el proyecto PLANT-OR durante este semestre:</p>
    
    <div style="margin: 25px 0; padding: 18px 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
      <ul style="list-style: none; padding: 0; margin: 0; line-height: 2;">
        <li>🟢 <strong>Validados:</strong> ${stats.validados}</li>
        <li>🟡 <strong>En revisión:</strong> ${stats.en_revision}</li>
        <li>🟠 <strong>Observados:</strong> ${stats.observados}</li>
        <li>🔴 <strong>Rechazados:</strong> ${stats.rechazados}</li>
        <li style="border-top: 1px solid #e5e7eb; margin-top: 10px; padding-top: 10px;"><strong>Total Registrados:</strong> ${stats.total}</li>
      </ul>
    </div>

    <p style="color: #555;">¡Gracias por tu valioso aporte al monitoreo de flora urbana!</p>
  </div>
</div>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: email_destino, name: nombre_registrador }],
        subject: `Tu Reporte Semestral - PLANT-OR`,
        htmlContent: htmlContent
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Error sending semestral email", error);
    return false;
  }
};
