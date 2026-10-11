import { BrandMark } from "./brand-marks";
import { SOCIAL_LINKS } from "@/utils/social";

const SocialLinks = ({ className = "" }: { className?: string }) => (
    <ul className={`flex items-center gap-2 ${className}`}>
        {SOCIAL_LINKS.filter((link) => link.url).map((link) => (
            <li key={link.id}>
                <a href={link.url!} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="flex h-9 w-9 items-center justify-center text-white/60 transition-colors hover:text-white">
                    <BrandMark name={link.id} className="h-[18px] w-[18px]" />
                </a>
            </li>
        ))}
    </ul>
);

export default SocialLinks;
