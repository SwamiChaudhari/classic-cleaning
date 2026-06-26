/**
 * WhatsApp Business Integration Module
 * 
 * Provides utilities for WhatsApp integration:
 * - WhatsApp click-to-chat links
 * - WhatsApp Business API (Cloud API) for automated messages
 * - Lead notification to admin via WhatsApp
 * - Booking confirmation messages
 * 
 * Setup for WhatsApp Business API:
 * 1. Create a Meta Business account
 * 2. Set up WhatsApp Business API via Meta Cloud
 * 3. Get your Phone Number ID and Access Token
 * 4. Set environment variables:
 *    - WHATSAPP_BUSINESS_PHONE_ID=***
 *    - WHATSAPP_BUSINESS_TOKEN=***
 *    - WHATSAPP_ADMIN_NUMBER=91xxxxxxxxxx
 */

import { business } from "@/config/business";

/**
 * Generate a WhatsApp click-to-chat URL.
 */
export function getWhatsAppLink(message?: string): string {
  const phone = business.whatsapp.replace(/[^0-9]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone}${text}`;
}

/**
 * Generate a pre-filled message for a quote request.
 */
export function generateQuoteMessage(data: {
  name: string;
  service?: string;
  propertyType?: string;
  area?: string;
  message?: string;
}): string {
  let msg = `Hi ${business.name}! 👋\n\n`;
  msg += `I'm interested in your cleaning services.\n\n`;
  msg += `Name: ${data.name}\n`;
  if (data.service) msg += `Service: ${data.service}\n`;
  if (data.propertyType) msg += `Property: ${data.propertyType}\n`;
  if (data.area) msg += `Area: ${data.area}\n`;
  if (data.message) msg += `Message: ${data.message}\n`;
  msg += `\nPlease share the pricing and availability.`;

  return msg;
}

/**
 * Generate a pre-filled message for a booking.
 */
export function generateBookingMessage(data: {
  name: string;
  service: string;
  date: string;
  time: string;
  address: string;
  phone: string;
}): string {
  let msg = `Hi ${business.name}! 📅\n\n`;
  msg += `I'd like to book a cleaning service:\n\n`;
  msg += `Name: ${data.name}\n`;
  msg += `Service: ${data.service}\n`;
  msg += `Date: ${data.date}\n`;
  msg += `Time: ${data.time}\n`;
  msg += `Address: ${data.address}\n`;
  msg += `Phone: ${data.phone}\n`;
  msg += `\nPlease confirm the booking.`;

  return msg;
}

/**
 * Send a lead notification to admin via WhatsApp Business API.
 * Requires WHATSAPP_BUSINESS_TOKEN and WHATSAPP_BUSINESS_PHONE_ID env vars.
 */
export async function sendLeadNotificationToAdmin(lead: {
  name: string;
  phone: string;
  service?: string;
  area?: string;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const token = process.env.WHATSAPP_BUSINESS_TOKEN;
  const phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID;
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER;

  if (!token || !phoneId || !adminNumber) {
    return { success: false, error: "WhatsApp Business API not configured" };
  }

  const message = `🔔 New Lead!\n\n` +
    `Name: ${lead.name}\n` +
    `Phone: ${lead.phone}\n` +
    `${lead.service ? `Service: ${lead.service}\n` : ""}` +
    `${lead.area ? `Area: ${lead.area}\n` : ""}` +
    `Source: ${lead.source}\n` +
    `Time: ${new Date().toLocaleString("en-IN")}`;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: adminNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: JSON.stringify(error) };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a booking confirmation to customer via WhatsApp Business API.
 */
export async function sendBookingConfirmation(to: string, data: {
  service: string;
  date: string;
  time: string;
  bookingId: string;
}): Promise<{ success: boolean; error?: string }> {
  const token = process.env.WHATSAPP_BUSINESS_TOKEN;
  const phoneId = process.env.WHATSAPP_BUSINESS_PHONE_ID;

  if (!token || !phoneId) {
    return { success: false, error: "WhatsApp Business API not configured" };
  }

  const message = `✅ Booking Confirmed!\n\n` +
    `Service: ${data.service}\n` +
    `Date: ${data.date}\n` +
    `Time: ${data.time}\n` +
    `Booking ID: ${data.bookingId}\n\n` +
    `Thank you for choosing ${business.name}!\n` +
    `We'll arrive at your location on time.\n\n` +
    `For any changes, call: ${business.phone}`;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: to,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return { success: false, error: JSON.stringify(error) };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
