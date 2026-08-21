/** The admin's WhatsApp phone number in international format (no + or spaces). */
export const WHATSAPP_PHONE_NUMBER = "628123456789"; // TODO: replace with real number

/**
 * Builds a pre-filled WhatsApp chat URL.
 * @param templateName - the template the guest selected (included in the message)
 */
export function buildWhatsAppUrl(templateName?: string): string {
  const message = templateName
    ? `Hi, I'm interested in the "${templateName}" invitation template. I'd like to discuss further.`
    : "Hi, I'm interested in your online invitation service. I'd like to discuss further.";

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
