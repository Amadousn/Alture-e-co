// Keeps a connection's credentials sealed on the server side.
//
// A connection is sealed here (AES-256-GCM) before it is stored, in the customer's
// account or in an HttpOnly cookie (see connection-store). Only this server holds
// the key that opens it.

const SECRET = () => process.env.ALTURELOCK_VAULT_SECRET ?? "";

export const vaultReady = () => SECRET().length >= 32;

async function key(): Promise<CryptoKey> {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(SECRET()));
    return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}

const toBase64Url = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64url");

export async function seal(value: unknown): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await key(), new TextEncoder().encode(JSON.stringify(value)));
    return `${toBase64Url(iv)}.${toBase64Url(new Uint8Array(cipher))}`;
}

// Null for anything missing, tampered with, or sealed under a different key.
export async function unseal<T>(sealed: string | undefined): Promise<T | null> {
    if (!sealed || !vaultReady()) return null;
    try {
        const [iv, cipher] = sealed.split(".");
        const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(iv, "base64url") }, await key(), Buffer.from(cipher, "base64url"));
        return JSON.parse(new TextDecoder().decode(plain)) as T;
    } catch {
        return null;
    }
}
