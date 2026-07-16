/**
 * Local chat types and dummy starter conversation for the AI Assistant.
 * No backend is connected yet — replies are simulated on the device.
 */

export type MessageSender = 'user' | 'ai';

export type ChatMessage = {
  id: string;
  sender: MessageSender;
  text: string;
  /** ISO timestamp string so the UI can format time consistently. */
  createdAt: string;
};

/** Formats a message timestamp into a short readable time like 4:32 PM. */
export const formatMessageTime = (isoDate: string) => {
  const date = new Date(isoDate);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
};

/**
 * Seed conversation shown when the assistant screen opens.
 * Timestamps are staggered so the thread feels natural.
 */
const now = Date.now();

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: "My car won't start.",
    createdAt: new Date(now - 60_000).toISOString(),
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'Check if the battery terminals are loose. If the problem continues, tap Nearby Services to request a mechanic.',
    createdAt: new Date(now - 45_000).toISOString(),
  },
];

/**
 * Simple local AI reply generator used until a real assistant API is wired in.
 */
export const createLocalAiReply = (userText: string): string => {
  const normalized = userText.toLowerCase();

  if (normalized.includes('battery') || normalized.includes("won't start") || normalized.includes('wont start')) {
    return 'Try checking your battery voltage and terminal connections. If it still will not start, open Nearby Services for a mechanic.';
  }

  if (normalized.includes('tyre') || normalized.includes('tire') || normalized.includes('flat')) {
    return 'Move to a safe spot, switch on hazard lights, and request Flat Tyre help from Nearby Services.';
  }

  if (normalized.includes('fuel') || normalized.includes('petrol') || normalized.includes('diesel')) {
    return 'If you are low on fuel, use Fuel Delivery from Nearby Services. Stay in a well-lit area while you wait.';
  }

  if (normalized.includes('tow') || normalized.includes('breakdown')) {
    return 'I recommend requesting a tow truck from Nearby Services. Share your live location so help can reach you faster.';
  }

  return 'Thanks for the details. I can help guide you step by step. Tell me more about the issue, or open Nearby Services for immediate roadside help.';
};
