/**
 * Local FAQ and support content for Help & Support.
 */

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const DUMMY_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I request roadside help?',
    answer:
      'Open Nearby Services from Home, choose a category, then tap Book Now on a provider card.',
  },
  {
    id: 'faq-2',
    question: 'What happens when I press SOS?',
    answer:
      'Hold the SOS button for 3 seconds to activate an emergency alert and view emergency contacts.',
  },
  {
    id: 'faq-3',
    question: 'Can I track my service request?',
    answer:
      'Yes. Active requests appear under Service History with an In Progress status.',
  },
  {
    id: 'faq-4',
    question: 'How do I add a vehicle?',
    answer:
      'Go to the Vehicles tab and tap Add Vehicle. Fill in the required details and save.',
  },
  {
    id: 'faq-5',
    question: 'Is my location shared automatically?',
    answer:
      'Location sharing is used for nearby help and SOS flows. You can review permission status in Settings.',
  },
];

export const SUPPORT_CHANNELS = [
  {
    id: 'live-chat',
    title: 'Live Chat',
    subtitle: 'Chat with RESQGo support (demo)',
    icon: '💬',
  },
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'support@resqgo.app',
    icon: '✉️',
  },
  {
    id: 'call',
    title: 'Call Support',
    subtitle: '1800-123-RESQ',
    icon: '📞',
  },
] as const;

export const BUSINESS_HOURS = '24x7 Emergency Support · Standard chat 8 AM – 10 PM IST';
