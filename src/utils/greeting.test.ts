import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateName,
  generateGreeting,
  formatWhatsAppUrl,
  getInitialSenderFromSearch,
  FESTIVE_WISHES
} from './greeting';

test('validateName validates empty input correctly', () => {
  const result = validateName('   ');
  assert.equal(result.isValid, false);
  assert.equal(result.sanitized, '');
  assert.ok(result.error);
});

test('validateName validates valid name correctly', () => {
  const result = validateName('  Arjun Sharma  ');
  assert.equal(result.isValid, true);
  assert.equal(result.sanitized, 'Arjun Sharma');
  assert.equal(result.error, undefined);
});

test('validateName sanitizes dangerous characters', () => {
  const result = validateName('<script>Arjun</script>');
  assert.equal(result.isValid, true);
  assert.equal(result.sanitized, 'scriptArjun/script');
});

test('generateGreeting includes sender name and selected wish in English and Hindi', () => {
  const greeting = generateGreeting('Pooja Patel', 0, 'https://example.com');
  assert.ok(greeting.englishWish.includes('Pooja Patel wishes you and your family'));
  assert.ok(greeting.hindiWish.includes('Pooja Patel की ओर से आपको एवं आपके सपरिवार को दीपावली की हार्दिक'));
  assert.ok(greeting.whatsappMessage.includes('Pooja Patel'));
  assert.ok(greeting.whatsappMessage.includes('https://example.com?from=Pooja%20Patel'));
});

test('generateGreeting handles wish cycling correctly', () => {
  const greeting0 = generateGreeting('Dev', 0);
  const greeting1 = generateGreeting('Dev', 1);
  assert.notEqual(greeting0.englishWish, greeting1.englishWish);
  assert.ok(greeting1.englishWish.includes(FESTIVE_WISHES[1].english));
});

test('formatWhatsAppUrl returns valid WhatsApp API link', () => {
  const url = formatWhatsAppUrl('Happy Diwali 🪔');
  assert.ok(url.startsWith('https://api.whatsapp.com/send?text='));
  assert.ok(url.includes('Happy%20Diwali'));
});

test('getInitialSenderFromSearch parses from and name params correctly', () => {
  assert.equal(getInitialSenderFromSearch('?from=Aarav'), 'Aarav');
  assert.equal(getInitialSenderFromSearch('?name=Rohan+Verma'), 'Rohan Verma');
  assert.equal(getInitialSenderFromSearch(''), '');
  assert.equal(getInitialSenderFromSearch('?other=123'), '');
});
