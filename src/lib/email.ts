/**
 * Email Notification Module
 * 
 * Supports multiple email providers:
 * - Resend (recommended, free tier: 100 emails/day)
 * - SendGrid
 * - SMTP (any provider)
 * 
 * Setup:
 * 1. Sign up at https://resend.com
 * 2. Get your API key
 * 3. Set environment variables:
 *    - EMAIL_PROVIDER=resend (or sendgrid, smtp)
 *    - EMAIL_API_KEY=***
 *    - EMAIL_FROM=noreply@yourdomain.com
 *    - EMAIL_ADMIN=admin@yourdomain.com
 * 
 * Usage:
 *   await sendLeadAlert({ name: 'John', phone: '9876543210', service: 'Deep Cleaning' });
 *   await sendBookingConfirmation({ to: 'customer@email.com', ... });
 */

export type EmailProvider = "resend" | "sendgrid" | "smtp" | "none";

export interface EmailConfig {
  provider: EmailProvider;
  apiKey: string;
  from: string;
  adminEmail: string;
  enabled: boolean;
}

export function getEmailConfig(): EmailConfig {
  return {
    provider: (process.env.EMAIL_PROVIDER as EmailProvider) || "none",
    apiKey: process.env.EMAIL_API_KEY || "",
    from: process.env.EMAIL_FROM || `noreply@${process.env.VERCEL_URL || "localhost"}`,
    adminEmail: process.env.EMAIL_ADMIN || "",
    enabled: !!(process.env.EMAIL_API_KEY && process.env.EMAIL_FROM),
  };
}

interface EmailData {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using the configured provider.
 */
async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  const config = getEmailConfig();

  if (!config.enabled) {
    return { success: false, error: "Email not configured" };
  }

  switch (config.provider) {
    case "resend":
      return sendViaResend(data, config.apiKey);
    case "sendgrid":
      return sendViaSendGrid(data, config.apiKey);
    default:
      return { success: false, error: "Unsupported email provider" };
  }
}

async function sendViaResend(data: EmailData, apiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: data.from || "Cleaning Services <noreply@resend.dev>",
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: JSON.stringify(error) };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function sendViaSendGrid(data: EmailData, apiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.to }] }],
        from: { email: data.from },
        subject: data.subject,
        content: [
          { type: "text/plain", value: data.text || "" },
          { type: "text/html", value: data.html },
        ],
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// --- Pre-built email templates ---

/**
 * Send a lead notification to admin.
 */
export async function sendLeadAlert(lead: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  area?: string;
  message?: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const config = getEmailConfig();
  if (!config.adminEmail) {
    return { success: false, error: "Admin email not configured" };
  }

  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0B1D3A; color: white; padding: 20px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0;">🔔 New Lead Received!</h2>
      </div>
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6b7280;">Name</td><td style="padding: 8px 0; font-weight: 600;">${lead.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${lead.phone}</td></tr>
          ${lead.email ? `<tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;">${lead.email}</td></tr>` : ""}
          ${lead.service ? `<tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0;">${lead.service}</td></tr>` : ""}
          ${lead.area ? `<tr><td style="padding: 8px 0; color: #6b7280;">Area</td><td style="padding: 8px 0;">${lead.area}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #6b7280;">Source</td><td style="padding: 8px 0;"><span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${lead.source}</span></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Time</td><td style="padding: 8px 0;">${new Date().toLocaleString("en-IN")}</td></tr>
        </table>
        ${lead.message ? `<div style="margin-top: 16px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;"><strong>Message:</strong><br/>${lead.message}</div>` : ""}
      </div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
        <a href="tel:${lead.phone}" style="display: inline-block; background: #059669; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Call Lead Now</a>
      </div>
    </div>
  `;

  return sendEmail({
    to: config.adminEmail,
    subject: `🔔 New Lead: ${lead.name} - ${lead.service || "General Inquiry"}`,
    html,
    text: `New Lead!\nName: ${lead.name}\nPhone: ${lead.phone}\nSource: ${lead.source}`,
  });
}

/**
 * Send booking confirmation to customer.
 */
export async function sendBookingConfirmationEmail(data: {
  to: string;
  name: string;
  service: string;
  date: string;
  time: string;
  bookingId: string;
  businessName: string;
  businessPhone: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0B1D3A; color: white; padding: 20px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0;">✅ Booking Confirmed!</h2>
      </div>
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
        <p>Hi ${data.name},</p>
        <p>Your booking with <strong>${data.businessName}</strong> has been confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0; font-weight: 600;">${data.service}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Date</td><td style="padding: 8px 0; font-weight: 600;">${data.date}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Time</td><td style="padding: 8px 0; font-weight: 600;">${data.time}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Booking ID</td><td style="padding: 8px 0; font-family: monospace;">${data.bookingId}</td></tr>
        </table>
      </div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="margin: 0 0 12px; color: #6b7280;">Questions? Call us:</p>
        <a href="tel:${data.businessPhone}" style="display: inline-block; background: #059669; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${data.businessPhone}</a>
      </div>
    </div>
  `;

  return sendEmail({
    to: data.to,
    subject: `✅ Booking Confirmed - ${data.service} on ${data.date}`,
    html,
    text: `Booking Confirmed!\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}\nBooking ID: ${data.bookingId}`,
  });
}
