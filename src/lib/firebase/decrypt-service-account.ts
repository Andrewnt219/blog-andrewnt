import { encrypted } from '@root/service-account.enc';
import crypto from 'crypto';
import { ServiceAccount } from 'firebase-admin';

const algorithm = 'aes-128-cbc';
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env['FIRESTORE_SECRET_KEY'] as string,
  process.env['FIRESTORE_SECRET_IV'] as string
);

export const getDecryptedServiceAccount = (): ServiceAccount => {
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');

  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};
