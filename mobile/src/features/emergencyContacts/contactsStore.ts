import { useCallback, useEffect, useState } from 'react';

import {
  DUMMY_EMERGENCY_CONTACTS,
  type EmergencyContact,
  type EmergencyContactFormValues,
} from './data';

let contacts: EmergencyContact[] = [...DUMMY_EMERGENCY_CONTACTS];
const listeners = new Set<() => void>();

const notify = () => listeners.forEach(listener => listener());

const createId = () => `ec-${Date.now()}`;

export const getEmergencyContacts = () => contacts;

export const getEmergencyContactById = (id: string) =>
  contacts.find(contact => contact.id === id);

export const addEmergencyContact = (values: EmergencyContactFormValues) => {
  const next: EmergencyContact = { id: createId(), ...values };

  contacts = values.isPrimary
    ? [next, ...contacts.map(contact => ({ ...contact, isPrimary: false }))]
    : [next, ...contacts];

  notify();
  return next;
};

export const updateEmergencyContact = (
  id: string,
  values: EmergencyContactFormValues,
) => {
  contacts = contacts.map(contact => {
    if (contact.id === id) {
      return { ...contact, ...values };
    }

    if (values.isPrimary) {
      return { ...contact, isPrimary: false };
    }

    return contact;
  });

  notify();
};

export const deleteEmergencyContact = (id: string) => {
  contacts = contacts.filter(contact => contact.id !== id);
  notify();
};

export const useEmergencyContacts = () => {
  const [items, setItems] = useState<EmergencyContact[]>(() => getEmergencyContacts());

  useEffect(() => {
    const refresh = () => setItems([...getEmergencyContacts()]);
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, []);

  return {
    contacts: items,
    addContact: useCallback((values: EmergencyContactFormValues) => addEmergencyContact(values), []),
    updateContact: useCallback(
      (id: string, values: EmergencyContactFormValues) => updateEmergencyContact(id, values),
      [],
    ),
    deleteContact: useCallback((id: string) => deleteEmergencyContact(id), []),
  };
};
