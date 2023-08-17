import crypto from 'crypto';

export function hashPassword(plain: string, key: string): string {
  const hmac = crypto.createHmac('sha512', key);
  hmac.update(plain);
  return hmac.digest('hex');
}
