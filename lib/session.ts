import { IAuthUser } from "@/app/providers/authProvider/context";
import { cookies } from "next/headers";

// lib/session.ts

const SESSION_SECRET = process.env.SESSION_SECRET || 'a-very-secret-key-that-should-be-in-env-and-be-long-enough';
const COOKIE_NAME = 'session';

type sessionSchema = {
    token?: string;
    userId: string;
    role: 'admin' | 'user';
}

/**
 * Derives an encryption key from the secret
 */
async function getEncryptionKey() {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(SESSION_SECRET),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: enc.encode('session-salt-standard'),
            iterations: 1000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

/**
 * Encrypts a string using Web Crypto AES-GCM
 */
async function encrypt(text: string) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await getEncryptionKey();
    
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(text)
    );

    const buffer = new Uint8Array(iv.length + encrypted.byteLength);
    buffer.set(iv);
    buffer.set(new Uint8Array(encrypted), iv.length);
    
    // Return base64 encoded string
    return btoa(String.fromCharCode(...buffer));
}

/**
 * Decrypts a string using Web Crypto AES-GCM
 */
async function decrypt(token: string) {
    try {
        const buffer = Uint8Array.from(atob(token), c => c.charCodeAt(0));
        const iv = buffer.slice(0, 12);
        const encrypted = buffer.slice(12);
        const key = await getEncryptionKey();

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encrypted
        );

        return new TextDecoder().decode(decrypted);
    } catch (error) {
        return null;
    }
}

export const createUserSession = async (user: IAuthUser) => {
    const session: sessionSchema = {
        token: user.token,
        userId: user.id,
        role: user.role,
    }

    const encryptedSession = await encrypt(JSON.stringify(session));
    const cookieStore = await cookies();
    
    cookieStore.set({
        name: COOKIE_NAME,
        value: encryptedSession,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        path: '/',
    });
}

export const getUserSession = async (): Promise<sessionSchema | null> => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);
    
    if (!cookie) return null;

    const decrypted = await decrypt(cookie.value);
    if (!decrypted) return null;

    try {
        return JSON.parse(decrypted);
    } catch (e) {
        return null;
    }
}

export const deleteUserSession = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

/**
 * Refreshes the session expiry if it exists
 */
export const updateSession = async () => {
    const session = await getUserSession();
    if (!session) return null;

    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);
    if (!cookie) return null;

    cookieStore.set({
        name: COOKIE_NAME,
        value: cookie.value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
        path: '/',
    });
    
    return session;
}