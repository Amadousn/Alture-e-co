import { redirect } from "next/navigation";

// The journal page now lives at /journal, beside AltureLock and Indicators in the menu.
export default function OldTradingJournal() {
    redirect("/journal");
}
