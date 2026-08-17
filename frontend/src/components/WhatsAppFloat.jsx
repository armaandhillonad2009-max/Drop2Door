import { WA_MESSAGES, waChat } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={waChat(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Drop2Door on WhatsApp"
      data-testid="floating-whatsapp-button"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full bg-[#25D366] p-4 text-slate-950 shadow-[0_8px_32px_rgba(37,211,102,0.4)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(37,211,102,0.6)] sm:bottom-6 sm:right-6"
    >
      <span className="animate-ping-ring absolute inset-0 rounded-full bg-[#25D366]/60" aria-hidden="true" />
      <WhatsAppIcon className="relative h-6 w-6" />
      <span className="relative max-w-0 overflow-hidden text-sm font-bold transition-all duration-500 group-hover:ml-2 group-hover:max-w-[120px]">
        Chat With Us
      </span>
    </a>
  );
}
