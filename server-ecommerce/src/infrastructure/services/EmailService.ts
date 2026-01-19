import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Crear el transporter una sola vez (singleton)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // tu-email@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD, // ⚠️ CONTRASEÑA DE APLICACIÓN, NO TU CONTRASEÑA REAL
    },
});

// Verificar la conexión al iniciar
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error al conectar con Gmail:', error);
    } else {
        console.log('✅ Servidor de email listo para enviar mensajes');
    }
});

export const emailService = {
    sendPasswordResetEmail: async (email: string, otp: string): Promise<void> => {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password`;

        const mailOptions = {
            from: `"ELECOMMERCE" <${process.env.EMAIL_USER}>`,
            to: email, // ✅ Se envía al email del usuario
            subject: '🔐 Recuperación de contraseña - ELECOMMERCE',
            html: `
        <!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Recuperación de Contraseña - ELECOMMERCE</title>
    <style>
        table, td, div, h1, p {font-family: Arial, sans-serif;}
        /* Reset de estilos para clientes de correo */
        body {margin: 0; padding: 0; word-spacing: normal; background-color: #050a19;}
        table {border-collapse: collapse;}
        
        /* Estilos específicos para el brillo y el fondo */
        .otp-box-glow {
            box-shadow: 0 0 15px #00c2e0, inset 0 0 15px #00c2e0; /* Efecto de neón */
        }
        .card-container {
             /* Fondo semi-transparente para el contenedor principal */
            background-color: rgba(13, 27, 62, 0.85);
            border: 1px solid #00a8c6;
            box-shadow: 0 0 10px rgba(0, 168, 198, 0.3);
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050a19;">
    
    <table role="presentation" style="width: 100%; border: 0; border-spacing: 0; background-color: #050a19; background-image: url('https://res.cloudinary.com/dnx4de9yv/image/upload/v1768848969/EleCommerce/s0fpkhhrnbxvolbqrrbe.jpg'); background-size: cover; background-position: center top; background-repeat: no-repeat;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table role="presentation" style="width: 100%; max-width: 600px; border: 0; border-spacing: 0;">
                    
                    <tr>
                        <td align="center" style="padding-bottom: 15px;">
                            <table role="presentation" style="border: 0; border-spacing: 0;">
                                <tr>
                                    <td style="padding-right: 10px;">
                                        <img src="https://res.cloudinary.com/dnx4de9yv/image/upload/v1768848035/EleCommerce/noriwasdzmm9sc6gpic7.png" alt="Logo" width="250" style="display: block; border: 0;">
                                    </td>
                                </tr>
                            </table>
                            <h1 style="margin: 15px 0 0 0; color: #ffffff; font-size: 18px; font-weight: bold;">
                                RECUPERACION DE <span style="color: #00c2e0;">CONTRASEÑA</span>
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td class="card-container" style="background-color: #0d1b3e; /* Fallback color sólido */ background-color: rgba(13, 27, 62, 0.85); border: 1px solid #00a8c6; border-radius: 12px; padding: 40px 30px;">
                            <table role="presentation" style="width: 100%; border: 0; border-spacing: 0;">
                                
                                <tr>
                                    <td align="center" style="color: #b3b9c5; font-size: 16px; padding-bottom: 15px; text-transform: uppercase;">
                                        CÓDIGO DE VERIFICACIÓN (OTP):
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td align="center" style="padding-bottom: 25px;">
                                        <table role="presentation" style="border: 0; border-spacing: 0;">
                                            <tr>
                                                <td class="otp-box-glow" style="border: 3px solid #00c2e0; border-radius: 0px; padding: 10px 40px; background-color: rgba(0, 194, 224, 0.1);">
                                                    <span style="color: #00c2e0; font-size: 36px; font-weight: bold; letter-spacing: 2px; font-family: 'Courier New', monospace;">
                                                        ${otp}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="color: #ffffff; font-size: 14px; line-height: 1.5; padding-bottom: 30px;">
                                        Este código expira en 10 minutos.<br>
                                        Si no solicitaste esto, ignora el mensaje.
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center">
                                        <table role="presentation" style="border: 0; border-spacing: 0;">
                                            <tr>
                                                <td style="background-color: #00c2e0; border-radius: 6px; padding: 14px 30px;">
                                                    <a href="${resetUrl}" target="_blank" style="color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; text-transform: uppercase; display: inline-block;">
                                                        VERIFICAR CÓDIGO
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="padding-top: 40px; color: #b3b9c5; font-size: 12px;">
                            <p style="margin: 0 0 10px 0;">
                                <a href="#" style="color: #fff; text-decoration: underline; margin: 0 10px;">Soporte</a> |
                                <a href="#" style="color: #fff; text-decoration: underline; margin: 0 10px;">Privacidad</a> |
                                <a href="#" style="color: #fff; text-decoration: underline; margin: 0 10px;">Términos</a>
                            </p>
                            <p style="margin: 0; color: #fff">© 2026 ELECOMMERCE. All rights reserved.</p>
                        </td>
                    </tr>

                </table>
                </td>
        </tr>
    </table>
    </body>
</html>

      `,
            text: `
        Recuperación de contraseña - ELECOMMERCE
        
        Haz clic en el siguiente enlace para restablecer tu contraseña:
        ${resetUrl}
        
        Este enlace expirará en 1 hora.
        
        Si no solicitaste esto, ignora este correo.
      `,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('✅ Email enviado:', info.messageId);
        } catch (error) {
            console.error('❌ Error al enviar email:', error);
            throw new Error('No se pudo enviar el email de recuperación');
        }
    },

    sendPasswordChangedConfirmation: async (email: string, userName?: string): Promise<void> => {
        const mailOptions = {
            from: `"ELECOMMERCE" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Tu contraseña ha sido actualizada - ELECOMMERCE',
            html: `
        <!DOCTYPE html>
        <html lang="es">
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0f172a;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #1e293b; border-radius: 16px;">
                    
                    <tr>
                      <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 50px 40px; text-align: center;">
                        <div style="font-size: 64px;">✅</div>
                        <h1 style="margin: 10px 0 0 0; color: #ffffff; font-size: 28px;">
                          Contraseña actualizada
                        </h1>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding: 50px 40px; color: #cbd5e1;">
                        <p style="margin: 0 0 20px 0; font-size: 16px;">
                          Hola${userName ? ` ${userName}` : ''},
                        </p>
                        
                        <p style="margin: 0 0 20px 0; font-size: 16px;">
                          Tu contraseña ha sido <strong style="color: #10b981;">cambiada correctamente</strong>.
                        </p>
                        
                        <table role="presentation" style="width: 100%; margin: 20px 0;">
                          <tr>
                            <td style="background-color: #450a0a; border-left: 4px solid #ef4444; padding: 16px 20px; border-radius: 4px;">
                              <p style="margin: 0; color: #fca5a5; font-size: 14px;">
                                <strong>🔒 ¿No realizaste este cambio?</strong><br>
                                Contacta inmediatamente con soporte.
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                          Fecha: ${new Date().toLocaleString('es-ES')}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="background-color: #0f172a; padding: 30px; text-align: center;">
                        <p style="margin: 0; color: #64748b; font-size: 13px;">
                          © ${new Date().getFullYear()} ELECOMMERCE
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Email de confirmación enviado');
        } catch (error) {
            console.error('❌ Error al enviar confirmación:', error);
            // No lanzar error aquí, solo loguearlo
        }
    },
};