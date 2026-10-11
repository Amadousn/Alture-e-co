import { redirect } from "next/navigation";

// The old overview described features the product no longer has. Exploring
// AltureLock now means the entry page and the demo.
export default function Page() {
    redirect("/alturelock");
}
