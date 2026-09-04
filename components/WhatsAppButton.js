import { company } from "@/lib/siteData";
import { IconWhatsapp } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MopMasters on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105"
    >
      <IconWhatsapp className="h-7 w-7" />
    </a>
  );
}
