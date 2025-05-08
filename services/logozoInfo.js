// services/logozoInfo.js

export const LOGOZO_KEYWORDS = {
    about: [
      "what is logozo", "tell me about logozo", "logozo service", "what do you do", "logozo is", "what's logozo"
    ],
    owner: [
      "who is the owner", "who runs logozo", "owner name", "who is behind logozo"
    ],
    contact: [
      "how can i contact", "logozo contact", "contact details", "email", "phone", "call", "message logozo"
    ],
    social: [
      "facebook", "instagram", "tiktok", "social media", "social links", "social accounts"
    ],
    pricing: [
      "price list", "send price list", "pricing", "how much", "cost", "rate", "charges"
    ]
  };
  
  export function getPredefinedResponse(incomingMsg) {
    const msg = incomingMsg.toLowerCase();
  
    if (LOGOZO_KEYWORDS.about.some(k => msg.includes(k))) {
      return "🎨 *LOGOZO* is a creative graphic design service that brings your ideas to life with professional branding, logos, and design work. Need more info? Just ask! 😊";
    }
  
    if (LOGOZO_KEYWORDS.owner.some(k => msg.includes(k))) {
      return "👨‍💼 The owner of LOGOZO is *Chamith Samarakoon*.";
    }
  
    if (LOGOZO_KEYWORDS.contact.some(k => msg.includes(k))) {
      return "📧 Email: logozo.info@gmail.com\n📱 Phone: +94 740429827\nFeel free to reach out anytime! 💬";
    }
  
    if (LOGOZO_KEYWORDS.social.some(k => msg.includes(k))) {
      return "🌐 *LOGOZO* on Social Media:\n📘 Facebook: https://web.facebook.com/profile.php?id=61571163435711\n📸 Instagram: https://www.instagram.com/_logozo_/\n🎵 TikTok: https://www.tiktok.com/@logozosri";
    }
  
    if (LOGOZO_KEYWORDS.pricing.some(k => msg.includes(k))) {
      return "__PDF__";
    }
  
    return null;
  }
  