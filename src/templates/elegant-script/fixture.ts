/**
 * Elegant Script — fixture data used for the live demo/preview.
 * Swap any of these values to see the template respond.
 */
import type { InvitationData } from "../types";

export const elegantScriptFixture: InvitationData = {
  templateId: "elegant-script",
  slug: "demo-elegant-script",

  headline: "The Wedding of",
  title: "Aisha & Rizky",
  subtitle: "Together with their families, joyfully invite you to celebrate their wedding day",

  groomName: "Rizky Pratama",
  brideName: "Aisha Nurdiana",

  people: [
    { role: "Father of the Groom", name: "Bpk. Hendra Pratama" },
    { role: "Mother of the Groom", name: "Ibu Sari Pratama" },
    { role: "Father of the Bride", name: "Bpk. Nurdian Sanjaya" },
    { role: "Mother of the Bride", name: "Ibu Dewi Sanjaya" },
  ],

  events: [
    {
      label: "Akad Nikah",
      date: "2025-10-18",
      time: "08:00 WIB",
      endTime: "10:00 WIB",
      venueName: "Masjid Al-Ikhlas",
      venueAddress: "Jl. Raya Kebayoran No. 12, Jakarta Selatan",
      venueMapUrl: "https://maps.google.com",
    },
    {
      label: "Resepsi",
      date: "2025-10-18",
      time: "12:00 WIB",
      endTime: "16:00 WIB",
      venueName: "The Grand Ballroom",
      venueAddress: "Hotel Mulia Senayan, Jakarta",
      venueMapUrl: "https://maps.google.com",
    },
  ],

  coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  portraitImageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80",

  galleryImages: [
    { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80", alt: "Couple 1" },
    { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80", alt: "Couple 2" },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", alt: "Couple 3" },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", alt: "Couple 4" },
    { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", alt: "Couple 5" },
    { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", alt: "Couple 6" },
  ],

  openingMessage:
    "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami.",

  closingMessage:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu. Atas kehadiran dan doa restunya, kami ucapkan terima kasih.",

  rsvpEnabled: true,
  rsvpDeadline: "2025-10-10",
  rsvpWhatsAppNumber: "628123456789",
};
