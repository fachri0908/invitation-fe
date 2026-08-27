/**
 * Flowering Forest — fixture data used for the live demo/preview.
 * All names, numbers and venues below are synthetic placeholders.
 */
import type { InvitationData } from "../types";

export const floweringForestFixture: InvitationData = {
  templateId: "flowering-forest",
  slug: "demo-flowering-forest",

  headline: "Pernikahan",
  title: "Larasati & Bagas",
  subtitle: "Dengan penuh sukacita kami mengundang Anda untuk hadir di hari bahagia kami.",

  groomName: "Bagas Wirawan",
  brideName: "Larasati Putri",

  people: [
    { role: "Father of the Bride", name: "Bpk. Sutrisno" },
    { role: "Mother of the Bride", name: "Ibu Wulandari" },
    { role: "Father of the Groom", name: "Bpk. Handoko" },
    { role: "Mother of the Groom", name: "Ibu Ratnasari" },
  ],

  events: [
    {
      label: "Akad Nikah",
      date: "2026-09-12",
      time: "08:00 WIB",
      endTime: "10:00 WIB",
      venueName: "Kediaman Mempelai Wanita",
      venueAddress: "Jl. Melati Raya No. 21, Bandung",
      venueMapUrl: "https://maps.google.com",
    },
    {
      label: "Resepsi",
      date: "2026-09-13",
      time: "11:00 WIB",
      endTime: "14:00 WIB",
      venueName: "Kediaman Mempelai Wanita",
      venueAddress: "Jl. Melati Raya No. 21, Bandung",
      venueMapUrl: "https://maps.google.com",
    },
  ],

  openingMessage:
    "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  closingMessage:
    "Merupakan kebahagiaan dan kehormatan bagi kami atas kehadiran serta doa restu yang Anda berikan. Semoga menjadi keluarga yang penuh keberkahan.",

  rsvpEnabled: true,
  rsvpDeadline: "2026-09-05",
  rsvpWhatsAppNumber: "628123456789",

  extras: {
    storyPages: [
      [
        "Perkenalan kami berawal dari pertemuan sederhana yang tidak pernah kami rencanakan. Dari perbincangan singkat, tumbuh kepercayaan yang perlahan menjadi kedekatan.",
        "Melewati berbagai musim, kami belajar memahami satu sama lain — menguatkan di saat rapuh, dan bertumbuh bersama dalam setiap prosesnya.",
      ],
      [
        "Hingga akhirnya kami sampai di titik ini, memilih untuk melangkah bersama dalam ikatan yang lebih erat, dalam suka maupun duka.",
        "Karena bagi kami, rumah bukanlah sebuah tempat, melainkan seseorang yang selalu kita pilih untuk pulang.",
      ],
    ],
    giftAccounts: [
      { owner: "Mempelai Wanita", bank: "Bank Contoh", accountName: "Larasati Putri", accountNumber: "1234567890" },
      { owner: "Mempelai Pria", bank: "Bank Sampel", accountName: "Bagas Wirawan", accountNumber: "0987654321" },
    ],
    giftEwallet: { label: "E-Wallet", name: "Larasati Putri", phone: "081200000000" },
  },
};
