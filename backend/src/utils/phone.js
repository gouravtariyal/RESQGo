/**
 * Phone number normalization utilities.
 */

/**
 * Normalizes a phone number by stripping whitespace, symbols,
 * and handling common prefix formats (e.g. +91, 91, leading 0 for India).
 *
 * @param {string} phone
 * @returns {string} 10-digit normalized phone number (or cleaned digits)
 */
const normalizePhoneNumber = (phone) => {
  if (!phone) {
    return '';
  }

  let cleaned = String(phone).replace(/\D/g, '');

  // Strip Indian country code (+91 / 91) if followed by 10 digits
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.slice(2);
  }

  // Strip leading 0 if 11 digits
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }

  return cleaned;
};

module.exports = {
  normalizePhoneNumber,
};
