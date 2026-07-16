/**
 * Local emergency contact types, dummy data, and validation helpers.
 */

export type EmergencyContact = {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  isPrimary: boolean;
};

export type EmergencyContactFormValues = Omit<EmergencyContact, 'id'>;

export const RELATIONSHIP_OPTIONS = [
  'Spouse',
  'Parent',
  'Sibling',
  'Friend',
  'Other',
] as const;

export const DUMMY_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Ananya Sharma',
    relationship: 'Spouse',
    phoneNumber: '+91 98111 22334',
    isPrimary: true,
  },
  {
    id: 'ec-2',
    name: 'Rohit Verma',
    relationship: 'Friend',
    phoneNumber: '+91 98222 33445',
    isPrimary: false,
  },
  {
    id: 'ec-3',
    name: 'Meera Kapoor',
    relationship: 'Parent',
    phoneNumber: '+91 98333 44556',
    isPrimary: false,
  },
];

export type ContactFormErrors = Partial<
  Record<'name' | 'relationship' | 'phoneNumber', string>
>;

const PHONE_PATTERN = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const normalizePhone = (value: string) => value.trim();

export const createEmptyContactForm = (): EmergencyContactFormValues => ({
  name: '',
  relationship: 'Friend',
  phoneNumber: '',
  isPrimary: false,
});

export const validateContactForm = (
  values: EmergencyContactFormValues,
): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  const phone = normalizePhone(values.phoneNumber).replace(/[\s-]/g, '');

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.relationship.trim()) {
    errors.relationship = 'Relationship is required.';
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!PHONE_PATTERN.test(phone) && !PHONE_PATTERN.test(values.phoneNumber.trim())) {
    // Accept either +91XXXXXXXXXX or plain 10-digit Indian mobile formats.
    const digitsOnly = values.phoneNumber.replace(/\D/g, '');
    if (!(digitsOnly.length === 10 || (digitsOnly.length === 12 && digitsOnly.startsWith('91')))) {
      errors.phoneNumber = 'Enter a valid mobile number.';
    }
  }

  return errors;
};
