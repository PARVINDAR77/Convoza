import assert from 'node:assert';
import crypto from 'node:crypto';

console.log('--- CONVOZA Runtime Verification Suite ---');

// 1. AES-256-GCM Encryption / Decryption Test
console.log('Testing AES-256-GCM Cryptographic Engine...');
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const DEFAULT_KEY = crypto.scryptSync('convoza-super-secret-master-key-32b', 'salt', 32);

function encryptSecret(plainText, customKey) {
  if (!plainText) return '';
  const key = customKey || DEFAULT_KEY;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decryptSecret(cipherText, customKey) {
  if (!cipherText || !cipherText.includes(':')) return cipherText;
  const parts = cipherText.split(':');
  if (parts.length !== 3) return cipherText;
  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = customKey || DEFAULT_KEY;
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const rawMetaToken = 'EAAG_Meta_Super_Secret_Permanent_System_User_Token_2026_XYZ';
const cipherText = encryptSecret(rawMetaToken);
assert.notStrictEqual(cipherText, rawMetaToken, 'Ciphertext should not match plaintext');
assert.strictEqual(cipherText.split(':').length, 3, 'Ciphertext format must be iv:tag:data');
const decrypted = decryptSecret(cipherText);
assert.strictEqual(decrypted, rawMetaToken, 'Decrypted text must match original Meta token exactly');
console.log('✓ AES-256-GCM Token Encryption & Decryption PASSED');

// 2. Meta Webhook Signature Verification Test
console.log('Testing Meta Webhook HMAC-SHA256 Signature Verification...');
function verifyMetaWebhookSignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader) return false;
  const hmac = crypto.createHmac('sha256', appSecret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

const testPayload = JSON.stringify({
  object: 'whatsapp_business_account',
  entry: [{ id: '10982347598', changes: [{ field: 'messages', value: { messaging_product: 'whatsapp' } }] }]
});
const testSecret = 'convoza_production_app_secret_9988';
const expectedSig = 'sha256=' + crypto.createHmac('sha256', testSecret).update(testPayload).digest('hex');

assert.strictEqual(verifyMetaWebhookSignature(testPayload, expectedSig, testSecret), true, 'Valid signature must verify');
assert.strictEqual(verifyMetaWebhookSignature(testPayload, 'sha256=forged_signature_digest', testSecret), false, 'Forged signature must fail');
console.log('✓ Timing-safe Meta Webhook HMAC-SHA256 Verification PASSED');

// 3. E.164 Phone Normalization Test
console.log('Testing E.164 Phone Normalization Engine...');
const E164_PHONE_REGEX = /^\+[1-9]\d{1,14}$/;
function normalizeE164(phone) {
  if (!phone) return { isValid: false, normalized: '', error: 'Phone is required' };
  let clean = phone.replace(/[^\d+]/g, '');
  if (!clean.startsWith('+')) clean = '+' + clean;
  if (!E164_PHONE_REGEX.test(clean)) {
    return { isValid: false, normalized: clean, error: 'Invalid E.164 format' };
  }
  return { isValid: true, normalized: clean };
}

const phoneCases = [
  { in: '+91 98765 43210', out: '+919876543210' },
  { in: '919876543210', out: '+919876543210' },
  { in: '+1 (555) 234-5678', out: '+15552345678' },
  { in: '+44 7911 123456', out: '+447911123456' },
];

for (const tc of phoneCases) {
  const res = normalizeE164(tc.in);
  assert.strictEqual(res.isValid, true, `Phone ${tc.in} should be valid`);
  assert.strictEqual(res.normalized, tc.out, `Phone ${tc.in} normalized incorrectly`);
}
assert.strictEqual(normalizeE164('invalid-phone-string').isValid, false, 'Invalid string should fail');
console.log('✓ E.164 International Phone Normalization PASSED');

// 4. Template Variable Extractor
console.log('Testing WhatsApp Template Variable Extraction...');
function extractTemplateVariables(text) {
  if (!text) return [];
  const matches = text.match(/\{\{(\d+)\}\}/g);
  if (!matches) return [];
  return Array.from(new Set(matches));
}

const templateText = 'Hello {{1}}, your order #{{2}} of total amount {{3}} has been confirmed for delivery on {{4}}!';
const extracted = extractTemplateVariables(templateText);
assert.deepStrictEqual(extracted, ['{{1}}', '{{2}}', '{{3}}', '{{4}}']);
console.log('✓ Template Dynamic Variable Extraction PASSED');

// 5. Template Name Validation
console.log('Testing Meta Template Naming Conventions...');
function validateTemplateName(name) {
  if (!name || name.trim().length === 0) return false;
  const trimmed = name.trim().toLowerCase();
  return /^[a-z0-9_]{1,512}$/.test(trimmed);
}

assert.strictEqual(validateTemplateName('order_dispatch_update_v1'), true);
assert.strictEqual(validateTemplateName('Order Dispatch!'), false);
assert.strictEqual(validateTemplateName('order-dispatch'), false);
console.log('✓ Meta Template Naming Rules PASSED');

console.log('\n=========================================');
console.log('ALL RUNTIME VERIFICATION TESTS PASSED (5/5)');
console.log('=========================================');

