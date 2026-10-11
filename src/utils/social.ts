// Alture & Co.'s social accounts. A link is shown only when its address is
// set here, so an account that does not exist yet never produces a dead link.
export const SOCIAL_LINKS: { id: "instagram" | "telegram"; label: string; url: string | null }[] = [
    { id: "instagram", label: "Instagram", url: "https://instagram.com/altureandco" },
    // Add the channel or account address here to show the Telegram link.
    { id: "telegram", label: "Telegram", url: null },
];
