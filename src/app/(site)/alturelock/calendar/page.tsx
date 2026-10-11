import { redirect } from "next/navigation";

// This used to be a page of its own. It now lives inside the cockpit.
export default function Page() {
    redirect("/alturelock/workspace");
}
