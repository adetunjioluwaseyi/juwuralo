import { MessageCircle } from 'lucide-react'

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_OWNER_PHONE || '+2349137688204'
const whatsappText = encodeURIComponent('Hello Juwuralo team, I would like to chat with you about a booking.')
const whatsappLink = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${whatsappText}`

export function WhatsappChatButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Juwuralo on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-[0_24px_60px_rgba(7,53,26,0.25)] transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400"
    >
      <MessageCircle className="size-7" />
    </a>
  )
}
