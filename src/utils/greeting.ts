/**
 * Pure utility functions for Diwali greetings and sharing logic
 */

export interface GreetingData {
  senderName: string;
  englishWish: string;
  hindiWish: string;
  whatsappMessage: string;
}

export const FESTIVE_WISHES = [
  {
    id: 'prosperity',
    label: 'Prosperity & Wealth (Lakshmi Blessings)',
    english: 'May Goddess Lakshmi and Lord Ganesha bless your life with boundless joy, glowing health, eternal peace, and sparkling prosperity this Diwali and always!',
    hindi: 'माँ लक्ष्मी और भगवान श्री गणेश आपके जीवन को सुख, समृद्धि, वैभव और आरोग्य से परिपूर्ण करें।'
  },
  {
    id: 'light',
    label: 'Victory of Light & Joy',
    english: 'May the divine light of Diwali spread into your life peace, prosperity, happiness, and good health. Have a luminous and blessed festival of lights!',
    hindi: 'दीपों का यह पावन पर्व आपके जीवन में नव उमंग, नई आशा और अनंत खुशियों का प्रकाश लाए।'
  },
  {
    id: 'success',
    label: 'New Beginnings & Success',
    english: 'Wishing that the sparkle of fireworks and the warmth of diyas bring new opportunities, soaring success, and boundless happiness to you and your loved ones.',
    hindi: 'रोशनी और उमंग के इस महापर्व पर आपके सभी संकल्प सिद्ध हों और सफलता के नए द्वार खुलें।'
  }
];

export function validateName(rawName: string): { isValid: boolean; sanitized: string; error?: string } {
  const trimmed = rawName.trim();
  if (!trimmed) {
    return { isValid: false, sanitized: '', error: 'Please enter your name to generate the wish.' };
  }
  if (trimmed.length > 50) {
    return { isValid: false, sanitized: trimmed.slice(0, 50), error: 'Name should not exceed 50 characters.' };
  }
  // Sanitize potentially unsafe characters
  const sanitized = trimmed.replace(/[<>]/g, '');
  return { isValid: true, sanitized };
}

export function generateGreeting(name: string, wishIndex: number = 0, appUrl: string = ''): GreetingData {
  const cleanName = name.trim() || 'A Well-Wisher';
  const selectedWish = FESTIVE_WISHES[wishIndex % FESTIVE_WISHES.length];

  const englishWish = `${cleanName} wishes you and your family a very happy, prosperous, and joyous Diwali! ${selectedWish.english}`;
  const hindiWish = `${cleanName} की ओर से आपको एवं आपके सपरिवार को दीपावली की हार्दिक एवं मंगलमय शुभकामनाएं! ${selectedWish.hindi}`;

  const shareTargetUrl = appUrl
    ? `${appUrl.replace(/\/$/, '')}?from=${encodeURIComponent(cleanName)}`
    : '';

  const whatsappMessage = 
`✨ *शुभ दीपावली | Shubh Deepawali* ✨

🪔 *${cleanName}* has sent you a special personalized Diwali blessing!

"${englishWish}"

🌸 _${hindiWish}_ 🌸

${shareTargetUrl ? `👉 Open your personalized greeting here:\n${shareTargetUrl}\n\n` : ''}Wishing you an abundance of laughter, golden moments, and festive lights! 🪔✨🎆`;

  return {
    senderName: cleanName,
    englishWish,
    hindiWish,
    whatsappMessage
  };
}

export function formatWhatsAppUrl(whatsappText: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;
}

export function getInitialSenderFromSearch(search: string): string {
  try {
    const params = new URLSearchParams(search);
    const fromParam = params.get('from') || params.get('name') || '';
    return fromParam.trim().slice(0, 50).replace(/[<>]/g, '');
  } catch {
    return '';
  }
}
