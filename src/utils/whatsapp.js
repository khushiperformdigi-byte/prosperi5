import { API_BASE } from '../config/api';

/**
 * Helper function to send enquiry details via WhatsApp & Email
 * Number: 7208095944 (Format: 917208095944)
 */
export const WHATSAPP_NUMBER = "917208095944";

export const sendWhatsAppEnquiry = ({
  formName = "Website Enquiry",
  name = "",
  phone = "",
  email = "",
  city = "",
  service = "",
  message = "",
  extra = {}
}) => {
  const formPath = typeof window !== 'undefined' ? (window.location.pathname + window.location.search) : '/';

  // 1. Trigger backend enquiry recording & email notification asynchronously
  fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formName, formPath, name, phone, email, city, service, message, extra }),
  }).catch((err) => console.warn('Backend enquiry notification error:', err));

  // 2. Format & open WhatsApp link
  let text = `📌 *New Enquiry - PROSPERi5*\n`;
  if (formName) text += `*Source Form:* ${formName}\n`;
  if (name) text += `*Name:* ${name}\n`;
  if (phone) text += `*Phone:* ${phone}\n`;
  if (email) text += `*Email:* ${email}\n`;
  if (city) text += `*City:* ${city}\n`;
  if (service) text += `*Service/Interest:* ${service}\n`;

  if (extra && typeof extra === 'object' && Object.keys(extra).length > 0) {
    Object.entries(extra).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        text += `*${key}:* ${val}\n`;
      }
    });
  }

  if (message) text += `*Details:* ${message}\n`;

  const encodedText = encodeURIComponent(text.trim());
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
};
