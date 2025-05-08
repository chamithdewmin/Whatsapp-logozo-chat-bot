// services/commonSense.js

export function getCommonSenseResponse(message) {
    const lower = message.toLowerCase().trim();
    const now = new Date();
  
    const fullDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  
    const hour = now.getHours();
  
    const greeting =
      hour < 12 ? "☀️ Good morning!"
      : hour < 18 ? "🌤️ Good afternoon!"
      : "🌙 Good evening!";
  
    // ✅ DATE & TIME
    if (["what is today", "what's today", "today's date", "date today"].some(q => lower.includes(q))) {
      return `📅 Today is *${fullDate}*.`;
    }
  
    if (["what time is it", "current time", "time now"].some(q => lower.includes(q))) {
      return `⏰ The current time is *${time}*.`;
    }
  
    if (["what day is it", "today's day", "which day is today"].some(q => lower.includes(q))) {
      return `📆 Today is *${now.toLocaleDateString('en-US', { weekday: 'long' })}*.`;
    }
  
    // ✅ GREETINGS
    if (["hello", "hi", "hey", "good morning", "good night", "good evening"].some(q => lower.includes(q))) {
      return `${greeting} I'm your friendly LOGOZO bot 🤖. Ask me anything about our services or design needs!`;
    }
  
    // ✅ WHO ARE YOU / IDENTITY
    if (["who are you", "what are you", "what is your name"].some(q => lower.includes(q))) {
      return "🤖 I'm the LOGOZO Assistant, your design-savvy bot here to guide you!";
    }
  
    // ✅ HOW ARE YOU
    if (["how are you", "how do you feel", "are you okay"].some(q => lower.includes(q))) {
      return "😊 I'm just a happy little bot here to help with all your graphic design needs!";
    }
  
    // ✅ WHAT CAN YOU DO
    if (["what can you do", "how can you help", "what do you do"].some(q => lower.includes(q))) {
      return "🛠️ I can tell you about LOGOZO services, send you our price list, connect you with the owner, or even answer your questions with AI!";
    }
  
    // ✅ COUNTDOWN
    if (lower.includes("how many days until")) {
      const match = lower.match(/how many days until (.+)/);
      if (match && match[1]) {
        const targetDate = new Date(match[1] + " " + now.getFullYear());
        if (!isNaN(targetDate.getTime())) {
          const diff = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
          return `📆 There are *${diff} day(s)* until *${match[1]}*.`;
        }
      }
    }
  
    // ✅ MATH EVALUATOR (simple, safe)
    if (lower.match(/^\d+(\s*[\+\-\*\/]\s*\d+)+$/)) {
      try {
        const result = eval(lower);
        return `🧮 The answer is *${result}*.`;
      } catch {
        return "⚠️ I couldn't calculate that.";
      }
    }
  
    return null;
  }
  