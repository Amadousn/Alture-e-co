// What is open on the site. Both stay closed until the owner opens them:
// the demo while it is being finished, and logging in until access begins.
// To open one, set the variable to "open" (in .env locally, or on the host)
// and restart; nothing else needs to change.
export const DEMO_OPEN = process.env.NEXT_PUBLIC_ALTURELOCK_DEMO === "open";
export const LOGIN_OPEN = process.env.NEXT_PUBLIC_ALTURELOCK_LOGIN === "open";
