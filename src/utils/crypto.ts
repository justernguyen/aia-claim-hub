/**
 * Native Web Crypto API utilities for military-grade client-side encryption.
 * Uses AES-GCM 256-bit with PBKDF2 (SHA-256, 100,000 iterations) key derivation.
 * 100% browser-native (zero external dependencies).
 */

export interface EncryptedVaultPayload {
  format: 'AIA_VAULT_AES256_V1';
  salt: string; // Base64 encoded 16-byte salt
  iv: string; // Base64 encoded 12-byte IV
  cipher: string; // Base64 encoded ciphertext with auth tag
  timestamp: string;
  hint?: string;
}

// Helper: Uint8Array to Base64
function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper: Base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Derives a 256-bit AES-GCM key from a user PIN/password and salt using PBKDF2.
 */
async function deriveKeyFromPin(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const pinBytes = encoder.encode(pin);

  // Import raw key material
  const baseKey = await crypto.subtle.importKey(
    'raw',
    pinBytes,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  // Derive AES-GCM 256-bit key
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypts a plain text string with a PIN using AES-GCM 256-bit.
 * Returns a self-contained EncryptedVaultPayload.
 */
export async function encryptDataWithPin(
  plainText: string,
  pin: string,
  hint?: string
): Promise<EncryptedVaultPayload> {
  if (!pin || pin.trim().length === 0) {
    throw new Error('Mã PIN không được để trống.');
  }

  // 1. Generate random salt (16 bytes) and random IV (12 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 2. Derive crypto key
  const key = await deriveKeyFromPin(pin, salt);

  // 3. Encrypt data
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(plainText);

  const cipherBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as BufferSource,
    },
    key,
    encodedText
  );

  return {
    format: 'AIA_VAULT_AES256_V1',
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    cipher: arrayBufferToBase64(cipherBuffer),
    timestamp: new Date().toISOString(),
    hint: hint || undefined,
  };
}

/**
 * Decrypts an EncryptedVaultPayload back to a plain text string using the PIN.
 * Throws a descriptive error if the PIN is incorrect or data is corrupted.
 */
export async function decryptDataWithPin(
  payload: EncryptedVaultPayload,
  pin: string
): Promise<string> {
  if (!payload || payload.format !== 'AIA_VAULT_AES256_V1') {
    throw new Error('Định dạng tệp mã hóa không hợp lệ hoặc không được hỗ trợ.');
  }

  if (!pin || pin.trim().length === 0) {
    throw new Error('Vui lòng nhập mã PIN để giải mã.');
  }

  try {
    const salt = base64ToUint8Array(payload.salt);
    const iv = base64ToUint8Array(payload.iv);
    const cipher = base64ToUint8Array(payload.cipher);

    const key = await deriveKeyFromPin(pin, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as BufferSource,
      },
      key,
      cipher as BufferSource
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    // OperationError in Web Crypto API occurs when AES-GCM authentication tag fails (wrong PIN)
    console.error('Decryption failed:', error);
    throw new Error('Mã PIN không chính xác hoặc dữ liệu đã bị chỉnh sửa.');
  }
}

/**
 * Checks if a parsed JSON or string represents an AIA encrypted vault file.
 */
export function isEncryptedVaultPayload(obj: unknown): obj is EncryptedVaultPayload {
  if (!obj || typeof obj !== 'object') return false;
  const p = obj as Record<string, unknown>;
  return (
    p.format === 'AIA_VAULT_AES256_V1' &&
    typeof p.salt === 'string' &&
    typeof p.iv === 'string' &&
    typeof p.cipher === 'string'
  );
}
