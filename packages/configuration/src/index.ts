import * as crypto from 'crypto';

export const APP_CONFIG = {
  NAME: 'CONVOZA',
  TAGLINE: 'Conversations. Connected.',
  DEFAULT_PORT: 4000,
  API_PREFIX: '/api/v1',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  CUSTOMER_SERVICE_WINDOW_HOURS: 24,
  CUSTOMER_SERVICE_WINDOW_MS: 24 * 60 * 60 * 1000,
  E164_PHONE_REGEX: /^\+[1-9]\d{1,14}$/,
};

export const META_CONFIG = {
  GRAPH_API_VERSION: 'v20.0',
  GRAPH_API_BASE: 'https://graph.facebook.com/v20.0',
  OAUTH_ACCESS_TOKEN_URL: 'https://graph.facebook.com/v20.0/oauth/access_token',
  WEBHOOK_VERIFY_TOKEN: process.env.META_WEBHOOK_VERIFY_TOKEN || 'convoza_meta_verify_token_secure_2026',
  APP_SECRET: process.env.META_APP_SECRET || 'convoza_meta_app_secret_placeholder',
  APP_ID: process.env.META_APP_ID || '',
  SYSTEM_USER_ACCESS_TOKEN: process.env.META_SYSTEM_USER_ACCESS_TOKEN || '',
};

export const WORKER_CONFIG = {
  POLL_INTERVAL_MS: 1500,
  BATCH_SIZE: 50,
  MAX_RETRY_ATTEMPTS: 5,
  BASE_BACKOFF_MS: 2000,
  MAX_BACKOFF_MS: 60000,
  LOCK_TIMEOUT_SECONDS: 120,
};

// ==========================================
// Security & Cryptographic Utilities
// ==========================================

const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const DEFAULT_KEY = crypto.scryptSync(process.env.CREDENTIALS_ENCRYPTION_KEY || 'convoza-super-secret-master-key-32b', 'salt', 32);

/**
 * Encrypt sensitive credentials (e.g., Meta access tokens) using AES-256-GCM
 */
export function encryptSecret(plainText: string, customKey?: Buffer): string {
  if (!plainText) return '';
  const key = customKey || DEFAULT_KEY;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Format: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypt sensitive credentials using AES-256-GCM
 */
export function decryptSecret(cipherText: string, customKey?: Buffer): string {
  if (!cipherText || !cipherText.includes(':')) return cipherText;
  try {
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
  } catch (err) {
    console.error('Decryption failed for secret:', err);
    return '';
  }
}

/**
 * Verify Meta Webhook X-Hub-Signature-256
 */
export function verifyMetaWebhookSignature(rawBody: string | Buffer, signatureHeader?: string, appSecret?: string): boolean {
  if (!signatureHeader) return false;
  const secret = appSecret || META_CONFIG.APP_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

/**
 * Verify Razorpay Webhook Signature
 */
export function verifyRazorpaySignature(rawBody: string, signature: string, webhookSecret: string): boolean {
  if (!signature || !webhookSecret) return false;
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
  } catch {
    return false;
  }
}

