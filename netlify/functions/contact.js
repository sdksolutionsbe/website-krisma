/**
 * Netlify Serverless Function - Contact Form Handler
 * Handles form submission, reCAPTCHA validation, and email sending
 */

const https = require('https');

// Email configuration from environment variables
const EMAIL_TO = process.env.EMAIL_TO || 'stijn.de.ketelaere@pandora.be';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@krisma-bouw.be';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        // Parse form data
        const data = JSON.parse(event.body);
        const { name, email, phone, service, message, 'g-recaptcha-response': recaptchaToken } = data;

        // Validate required fields
        if (!name || !email || !service || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Alle verplichte velden moeten ingevuld zijn.' })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Ongeldig e-mailadres.' })
            };
        }

        // Verify reCAPTCHA
        if (RECAPTCHA_SECRET) {
            const recaptchaValid = await verifyRecaptcha(recaptchaToken);
            if (!recaptchaValid) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Captcha verificatie mislukt. Probeer opnieuw.' })
                };
            }
        }

        // Send email notification
        await sendEmail({
            to: EMAIL_TO,
            from: EMAIL_FROM,
            subject: `Nieuw contactformulier: ${service}`,
            name,
            email,
            phone,
            service,
            message
        });

        // Send confirmation email to user
        await sendConfirmationEmail({
            to: email,
            from: EMAIL_FROM,
            name
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Bericht succesvol verzonden!',
                success: true
            })
        };

    } catch (error) {
        console.error('Contact form error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};

/**
 * Verify reCAPTCHA token with Google
 */
async function verifyRecaptcha(token) {
    return new Promise((resolve) => {
        if (!token || !RECAPTCHA_SECRET) {
            resolve(false);
            return;
        }

        const postData = `secret=${RECAPTCHA_SECRET}&response=${token}`;

        const options = {
            hostname: 'www.google.com',
            port: 443,
            path: '/recaptcha/api/siteverify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result.success === true);
                } catch {
                    resolve(false);
                }
            });
        });

        req.on('error', () => resolve(false));
        req.write(postData);
        req.end();
    });
}

/**
 * Send email notification using SendGrid
 */
async function sendEmail({ to, from, subject, name, email, phone, service, message }) {
    if (!SENDGRID_API_KEY) {
        console.log('SendGrid API key not configured - logging email instead');
        console.log('Email would be sent to:', to);
        console.log('Subject:', subject);
        console.log('From:', name, email);
        return Promise.resolve();
    }

    const serviceLabels = {
        'pleisterwerken': 'Pleisterwerken',
        'gyproc': 'Gyproc',
        'renovaties': 'Renovaties',
        'andere': 'Andere'
    };

    const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a5f7a; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #1a5f7a; }
                .message-box { background: white; padding: 15px; border-left: 4px solid #f5a623; }
                .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Nieuw Contactformulier</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Naam:</span> ${escapeHtml(name)}
                    </div>
                    <div class="field">
                        <span class="label">E-mail:</span> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
                    </div>
                    <div class="field">
                        <span class="label">Telefoon:</span> ${phone ? escapeHtml(phone) : 'Niet opgegeven'}
                    </div>
                    <div class="field">
                        <span class="label">Dienst:</span> ${serviceLabels[service] || escapeHtml(service)}
                    </div>
                    <div class="field">
                        <span class="label">Bericht:</span>
                        <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Dit bericht is verzonden via het contactformulier op krisma-bouw.be</p>
                </div>
            </div>
        </body>
        </html>
    `;

    const textContent = `
Nieuw Contactformulier - Krisma Bouw

Naam: ${name}
E-mail: ${email}
Telefoon: ${phone || 'Niet opgegeven'}
Dienst: ${serviceLabels[service] || service}

Bericht:
${message}

---
Dit bericht is verzonden via het contactformulier op krisma-bouw.be
    `;

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: from, name: 'Krisma Bouw Website' },
            reply_to: { email: email, name: name },
            subject: subject,
            content: [
                { type: 'text/plain', value: textContent },
                { type: 'text/html', value: htmlContent }
            ]
        });

        const options = {
            hostname: 'api.sendgrid.com',
            port: 443,
            path: '/v3/mail/send',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve();
            } else {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    reject(new Error(`SendGrid error: ${res.statusCode} - ${data}`));
                });
            }
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

/**
 * Send confirmation email to the user
 */
async function sendConfirmationEmail({ to, from, name }) {
    if (!SENDGRID_API_KEY) {
        return Promise.resolve();
    }

    const htmlContent = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1a5f7a; color: white; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; }
                .content { padding: 30px; background: #ffffff; }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f5f5f5; }
                .contact-info { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>KRISMA BOUW</h1>
                </div>
                <div class="content">
                    <p>Beste ${escapeHtml(name)},</p>
                    <p>Bedankt voor uw bericht! Wij hebben uw aanvraag goed ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
                    <p>Heeft u dringende vragen? Neem dan gerust telefonisch contact met ons op.</p>
                    <div class="contact-info">
                        <p><strong>Telefoon:</strong> 0473/78 81 72</p>
                        <p><strong>E-mail:</strong> info@krisma-bouw.be</p>
                        <p><strong>Adres:</strong> Bassegemstraat 4, 8572 Kaster</p>
                    </div>
                    <p>Met vriendelijke groeten,<br><strong>Team Krisma Bouw</strong></p>
                </div>
                <div class="footer">
                    <p>Krisma Bouw - Erkend aannemer - Lid Confederatie Bouw</p>
                    <p>Bassegemstraat 4, 8572 Kaster (Anzegem)</p>
                </div>
            </div>
        </body>
        </html>
    `;

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: from, name: 'Krisma Bouw' },
            subject: 'Bevestiging van uw aanvraag - Krisma Bouw',
            content: [
                { type: 'text/html', value: htmlContent }
            ]
        });

        const options = {
            hostname: 'api.sendgrid.com',
            port: 443,
            path: '/v3/mail/send',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve();
            } else {
                // Don't fail if confirmation email fails
                console.error('Confirmation email failed:', res.statusCode);
                resolve();
            }
        });

        req.on('error', () => resolve()); // Don't fail if confirmation email fails
        req.write(postData);
        req.end();
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
