// Keeps a connection's credentials sealed on the server side.
//
// AltureLock has no user accounts or database yet, so a connection is held in
// an encrypted, HttpOnly cookie: the browser stores it but cannot read it,
// page scripts cannot reach it, and only this server holds the key that opens
// it (AES-256-GCM). Removing the cookie removes the credentials.

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
